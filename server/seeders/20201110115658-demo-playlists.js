'use strict';
const playlists = require('./seedFiles/playlists')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('playlists', playlists , {});

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('playlists', playlists , {});

  }
};
