const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models');

/**
 * @desc    Register a new owner account
 * @route   POST /owner/register
 * @access  Public
 */
const registerOwner = async (req, res, next) => {
  // A transaction ensures User + Owner are created atomically.
  // If the Owner insert fails, the User row is rolled back too.
  const transaction = await db.sequelize.transaction();

  try {
    const { first_name, last_name, email, password, phone_num } = req.body;

    const existingUser = await db.User.findOne({ where: { email } });

    if (existingUser) {
      await transaction.rollback();
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create(
      { first_name, last_name, email, password: hashedPassword, role: 'owner' },
      { transaction }
    );

    await db.Owner.create(
      { user_id: newUser.user_id, phone_num, verification: false },
      { transaction }
    );

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: 'Owner registered successfully',
      user: {
        id: newUser.user_id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

/**
 * @desc    Login an owner and return a JWT token
 * @route   POST /owner/login
 * @access  Public
 */
const loginOwner = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email } });

    // Return the same generic message for wrong email or wrong password.
    // This prevents revealing whether an email exists in the system.
    if (!user || user.role !== 'owner') {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Owner logged in successfully',
      token,
      user: {
        id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get the profile of the logged-in owner
 * @route   GET /owner/profile
 * @access  Protected (owner)
 */
const getOwnerProfile = async (req, res, next) => {
  try {
    const owner = await db.Owner.findOne({
      where: { user_id: req.user.id },
      include: [{
        model: db.User,
        // Never expose the hashed password in a response
        attributes: ['user_id', 'first_name', 'last_name', 'email', 'role'],
      }],
    });

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: 'Owner not found',
      });
    }

    return res.status(200).json({ success: true, owner });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update the logged-in owner's profile
 * @route   PUT /owner/profile
 * @access  Protected (owner)
 */
const updateOwnerProfile = async (req, res, next) => {
  try {
    const { first_name, last_name, phone_num } = req.body;

    const user = await db.User.findByPk(req.user.id);
    const owner = await db.Owner.findOne({ where: { user_id: req.user.id } });

    if (!user || !owner) {
      return res.status(404).json({
        success: false,
        message: 'Owner not found',
      });
    }

    await user.update({
      first_name: first_name || user.first_name,
      last_name: last_name || user.last_name,
    });

    await owner.update({ phone_num: phone_num || owner.phone_num });

    return res.status(200).json({
      success: true,
      message: 'Owner profile updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete the logged-in owner's account
 * @route   DELETE /owner/profile
 * @access  Protected (owner)
 */
const deleteOwnerProfile = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Owner not found',
      });
    }

    // Deleting the User cascades to the Owner profile automatically
    await user.destroy();

    return res.status(200).json({
      success: true,
      message: 'Owner account deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerOwner,
  loginOwner,
  getOwnerProfile,
  updateOwnerProfile,
  deleteOwnerProfile,
};
