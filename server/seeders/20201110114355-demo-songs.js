'use strict';
const songs = require('./seedFiles/songs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('songs', songs , {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('songs', songs , {});

  }
};
