const wishlistService = require('../services/wishListService');
const db = require('../models');

/**
 * @desc    Get all wishlist entries for a student
 * @route   GET /residence/:residenceId/wishlist
 * @access  Protected (student)
 */
const getAllWishedList = async (req, res, next) => {
  try {
    const student = await db.Student.findByPk(req.params.studentId);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const wish = await wishlistService.getWishedList(req.params.studentId);

    return res.status(200).json({ success: true, wishlist: wish });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a residence to a student's wishlist
 * @route   POST /residence/:residenceId/wishlist/student/:studentId
 * @access  Protected (student)
 */
const addToWishlist = async (req, res, next) => {
  try {
    const student = await db.Student.findByPk(req.params.studentId);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const residence = await db.Residence.findByPk(req.params.residenceId);

    if (!residence) {
      return res.status(404).json({ success: false, message: 'Residence not found' });
    }

    await wishlistService.addToWishList({
      user_id: req.params.studentId,
      res_id: req.params.residenceId,
    });

    return res.status(201).json({ success: true, message: 'Residence added to wishlist' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove a residence from a student's wishlist
 * @route   DELETE /residence/:residenceId/wishlist/student/:studentId
 * @access  Protected (student)
 */
const removeFromWishlist = async (req, res, next) => {
  try {
    const result = await wishlistService.removeFromWishList({
      studentId: req.params.studentId,
      residenceId: req.params.residenceId,
    });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Wishlist entry not found' });
    }

    return res.status(200).json({ success: true, message: 'Residence removed from wishlist' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getAllWishedList,
};
