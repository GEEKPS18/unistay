'use strict';

// Aligns the database schema to match the ERD exactly:
//   1. Residence:  owner_id      → user_id
//   2. Ratings:    rateDate      → rate_date
//   3. Ratings:    starCount     → star_count
//   4. WishLists:  id            → wish_id
//   5. Create Admin table (user_id FK, permissions)

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Residence: owner_id → user_id
    await queryInterface.renameColumn('Residence', 'owner_id', 'user_id');

    // 2 & 3. Ratings column renames
    await queryInterface.renameColumn('Ratings', 'rateDate', 'rate_date');
    await queryInterface.renameColumn('Ratings', 'starCount', 'star_count');

    // 4. WishLists PK rename
    await queryInterface.renameColumn('WishLists', 'id', 'wish_id');

    // 5. Admin table
    await queryInterface.createTable('Admins', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: 'Users', key: 'user_id' },
        onDelete: 'CASCADE',
      },
      permissions: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: 'all',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('Residence', 'user_id', 'owner_id');
    await queryInterface.renameColumn('Ratings', 'rate_date', 'rateDate');
    await queryInterface.renameColumn('Ratings', 'star_count', 'starCount');
    await queryInterface.renameColumn('WishLists', 'wish_id', 'id');
    await queryInterface.dropTable('Admins');
  },
};
