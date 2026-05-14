const db = require('../models');

/**
 * Returns all wishlist entries for a specific student.
 */
const getWishedList = async (studentId) => {
  return db.WishList.findAll({ where: { user_id: studentId } });
};

/**
 * Adds a residence to a student's wishlist.
 */
const addToWishList = async ({ user_id, res_id }) => {
  return db.WishList.create({ user_id, res_id, liked: true });
};

/**
 * Removes a wishlist entry by student + residence combination.
 * Returns null when no matching entry exists.
 */
const removeFromWishList = async ({ studentId, residenceId }) => {
  const wish = await db.WishList.findOne({
    where: { user_id: studentId, res_id: residenceId },
  });
  if (!wish) return null;
  await wish.destroy();
  return true;
};

module.exports = {
  getWishedList,
  addToWishList,
  removeFromWishList,
};
