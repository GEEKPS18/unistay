const ratingService = require('../services/ratingService');
const db = require('../models');

/**
 * @desc    Get all ratings for a residence
 * @route   GET /residence/:residenceId/Ratings
 * @access  Public
 */
const getRatings = async (req, res, next) => {
  try {
    const residence = await db.Residence.findByPk(req.params.residenceId);

    if (!residence) {
      return res.status(404).json({
        success: false,
        message: 'Residence not found',
      });
    }

    const ratings = await ratingService.getRatings(req.params.residenceId);

    return res.status(200).json({
      success: true,
      ratings,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Post a new rating for a residence
 * @route   POST /residence/:residenceId/Ratings/student/:studentId
 * @access  Protected (student)
 */
const postRating = async (req, res, next) => {
  try {
    const residence = await db.Residence.findByPk(req.params.residenceId);

    if (!residence) {
      return res.status(404).json({
        success: false,
        message: 'Residence not found',
      });
    }

    const student = await db.Student.findByPk(req.params.studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    const rating = await ratingService.postRating({
      user_id: req.params.studentId,
      res_id: req.params.residenceId,
      star_count: req.body.star_count,
      comment: req.body.comment,
      issues: req.body.issues,
    });

    return res.status(201).json({
      success: true,
      message: 'Rating posted successfully',
      rating,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a rating
 * @route   PUT /residence/:residenceId/Ratings/:id
 * @access  Protected (student)
 */
const updateRating = async (req, res, next) => {
  try {
    const residence = await db.Residence.findByPk(req.params.residenceId);

    if (!residence) {
      return res.status(404).json({
        success: false,
        message: 'Residence not found',
      });
    }

    const updated = await ratingService.updateRating(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Rating updated successfully',
      rating: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a rating
 * @route   DELETE /residence/:residenceId/Ratings/:id/student/:studentId
 * @access  Protected (student)
 */
const deleteRating = async (req, res, next) => {
  try {
    const deleted = await ratingService.deleteRating(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Rating deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear the comment field on a rating
 * @route   DELETE /residence/:residenceId/Ratings/:id/student/:studentId/comment
 * @access  Protected (student)
 */
const deleteComment = async (req, res, next) => {
  try {
    const result = await ratingService.deleteComment(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear the issues field on a rating
 * @route   DELETE /residence/:residenceId/Ratings/:id/student/:studentId/issue
 * @access  Protected (student)
 */
const deleteIssue = async (req, res, next) => {
  try {
    const result = await ratingService.deleteIssue(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Issue deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRatings,
  postRating,
  updateRating,
  deleteRating,
  deleteComment,
  deleteIssue,
};
