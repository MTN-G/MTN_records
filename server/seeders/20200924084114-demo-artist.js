'use strict';

const artists = require('./seedFiles/artists')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('artists', artists, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('artists', artists, {});
  }
};
