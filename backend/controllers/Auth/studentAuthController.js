const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models');

const { User, Student } = db;

/**
 * @desc    Register a new student account
 * @route   POST /student/register
 * @access  Public
 */
const registerStudent = async (req, res, next) => {
  // A transaction ensures User + Student are created atomically.
  // If the Student insert fails, the User row is rolled back too.
  const transaction = await db.sequelize.transaction();

  try {
    const { first_name, last_name, email, password, major, year_of_study, gender } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      await transaction.rollback();
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create(
      { first_name, last_name, email, password: hashedPassword, role: 'student' },
      { transaction }
    );

    await Student.create(
      {
        user_id: newUser.user_id,
        major: major || null,
        year_of_study: year_of_study || null,
        gender: gender || null,
      },
      { transaction }
    );

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: 'Student registered successfully',
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
 * @desc    Login a student and return a JWT token
 * @route   POST /student/login
 * @access  Public
 */
const loginStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // Return the same generic message for wrong email or wrong password.
    // This prevents revealing whether an email exists in the system.
    if (!user || user.role !== 'student') {
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
      message: 'Student logged in successfully',
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
 * @desc    Get the profile of the logged-in student
 * @route   GET /student/profile
 * @access  Protected (student)
 */
const getStudentProfile = async (req, res, next) => {
  try {
    const student = await Student.findOne({
      where: { user_id: req.user.id },
      include: [{
        model: User,
        // Never expose the hashed password in a response
        attributes: ['user_id', 'first_name', 'last_name', 'email', 'role'],
      }],
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    return res.status(200).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update the logged-in student's profile
 * @route   PUT /student/profile
 * @access  Protected (student)
 */
const updateStudentProfile = async (req, res, next) => {
  try {
    const { first_name, last_name, major, year_of_study, gender } = req.body;

    const user = await User.findByPk(req.user.id);
    const student = await Student.findOne({ where: { user_id: req.user.id } });

    if (!user || !student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    await user.update({
      first_name: first_name || user.first_name,
      last_name: last_name || user.last_name,
    });

    await student.update({
      major: major || student.major,
      year_of_study: year_of_study || student.year_of_study,
      gender: gender || student.gender,
    });

    return res.status(200).json({
      success: true,
      message: 'Student profile updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete the logged-in student's account
 * @route   DELETE /student/profile
 * @access  Protected (student)
 */
const deleteStudentProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Deleting the User cascades to the Student profile automatically
    await user.destroy();

    return res.status(200).json({
      success: true,
      message: 'Student account deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  getStudentProfile,
  updateStudentProfile,
  deleteStudentProfile,
};
