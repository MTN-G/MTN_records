'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('playlistSongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playlistId: {
        type: Sequelize.INTEGER
      },
      songId: {
        type: Sequelize.INTEGER
      }
  })},
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('playlistSongs');
  }
};