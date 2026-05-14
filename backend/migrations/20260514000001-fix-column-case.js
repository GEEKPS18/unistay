'use strict';

// MySQL is case-insensitive for column names; PostgreSQL is not.
// The Ratings migration created "user_Id" (capital I) but the model
// and service both reference "user_id" (lowercase) — rename to match.
module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('Ratings', 'user_Id', 'user_id');
  },
  async down(queryInterface) {
    await queryInterface.renameColumn('Ratings', 'user_id', 'user_Id');
  },
};
