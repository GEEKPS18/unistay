const db = require('../models');

/**
 * Returns all ratings for a specific residence.
 * Filtered by res_id so students only see reviews for the property they are viewing.
 */
const getRatings = async (residenceId) => {
  return db.Rating.findAll({ where: { res_id: residenceId } });
};

/**
 * Creates a new rating entry.
 * The controller passes validated data — no extra checks needed here.
 */
const postRating = async (data) => {
  return db.Rating.create({
    user_id: data.user_id,
    res_id: data.res_id,
    rateDate: new Date(),
    starCount: data.starCount || null,
    comment: data.comment || null,
    issues: data.issues || null,
  });
};

/**
 * Deletes a rating by its primary key.
 * Returns null when the rating does not exist so the controller can send a 404.
 */
const deleteRating = async (ratingId) => {
  const rating = await db.Rating.findByPk(ratingId);
  if (!rating) return null;
  await rating.destroy();
  return true;
};

/**
 * Clears the comment field on a rating (sets it to null).
 * Returns null when the rating does not exist.
 */
const deleteComment = async (ratingId) => {
  const rating = await db.Rating.findByPk(ratingId);
  if (!rating) return null;
  await rating.update({ comment: null });
  return true;
};

/**
 * Clears the issues field on a rating (sets it to null).
 * Returns null when the rating does not exist.
 */
const deleteIssue = async (ratingId) => {
  const rating = await db.Rating.findByPk(ratingId);
  if (!rating) return null;
  await rating.update({ issues: null });
  return true;
};

/**
 * Updates allowed fields on a rating (starCount, comment, issues).
 * Returns null when the rating does not exist.
 */
const updateRating = async (ratingId, data) => {
  const rating = await db.Rating.findByPk(ratingId);
  if (!rating) return null;
  await rating.update(data);
  return rating;
};

module.exports = {
  getRatings,
  postRating,
  deleteRating,
  deleteComment,
  deleteIssue,
  updateRating,
};
