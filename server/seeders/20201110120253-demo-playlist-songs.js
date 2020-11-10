'use strict';
const playlistSongs = require('./seedFiles/playlistSongs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('playlistSongs', playlistSongs , {});

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('playlistSongs', playlistSongs , {});

  }
};
