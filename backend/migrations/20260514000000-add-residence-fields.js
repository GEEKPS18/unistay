'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Residence', 'title', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn('Residence', 'housing_type', {
      type: Sequelize.STRING(50),
      allowNull: true,
    });
    await queryInterface.addColumn('Residence', 'available_for', {
      type: Sequelize.STRING(50),
      allowNull: true,
    });
    await queryInterface.addColumn('Residence', 'neighborhood', {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
    await queryInterface.addColumn('Residence', 'distance_from_university', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Residence', 'capacity', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Residence', 'rooms', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Residence', 'bathrooms', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Residence', 'wifi', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn('Residence', 'parking', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn('Residence', 'security', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface) {
    const cols = [
      'title', 'housing_type', 'available_for', 'neighborhood',
      'distance_from_university', 'capacity', 'rooms', 'bathrooms',
      'wifi', 'parking', 'security',
    ];
    for (const col of cols) {
      await queryInterface.removeColumn('Residence', col);
    }
  },
};
