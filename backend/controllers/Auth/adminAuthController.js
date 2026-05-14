const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models');

/**
 * @desc    Login as admin and receive a JWT token
 * @route   POST /admin/login
 * @access  Public
 */
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email } });

    if (!user || user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    );

    return res.status(200).json({
      success: true,
      message: 'Admin logged in successfully',
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
 * @desc    Get all students (admin only)
 * @route   GET /admin/students
 * @access  Protected (admin)
 */
const getAllStudents = async (req, res, next) => {
  try {
    const students = await db.Student.findAll({
      include: [{
        model: db.User,
        attributes: ['user_id', 'first_name', 'last_name', 'email', 'role', 'createdAt'],
      }],
    });
    return res.status(200).json({ success: true, students });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all owners (admin only)
 * @route   GET /admin/owners
 * @access  Protected (admin)
 */
const getAllOwners = async (req, res, next) => {
  try {
    const owners = await db.Owner.findAll({
      include: [{
        model: db.User,
        attributes: ['user_id', 'first_name', 'last_name', 'email', 'role', 'createdAt'],
      }],
    });
    return res.status(200).json({ success: true, owners });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete any user by ID (admin only)
 * @route   DELETE /admin/users/:id
 * @access  Protected (admin)
 */
const deleteUser = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ success: false, message: 'Cannot delete another admin' });
    }

    await user.destroy();

    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get dashboard stats (admin only)
 * @route   GET /admin/stats
 * @access  Protected (admin)
 */
const getStats = async (req, res, next) => {
  try {
    const [studentCount, ownerCount, residenceCount, ratingCount] = await Promise.all([
      db.Student.count(),
      db.Owner.count(),
      db.Residence.count(),
      db.Rating.count(),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        students: studentCount,
        owners: ownerCount,
        residences: residenceCount,
        ratings: ratingCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginAdmin, getAllStudents, getAllOwners, deleteUser, getStats };
