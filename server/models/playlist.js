'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Song, { through: 'PlaylistSong', foreignKey: 'playlistId'});
    }
  };
  Playlist.init({
    name: DataTypes.STRING,
    coverImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
    tableName: 'playlists',
    paranoid: true
  });
  return Playlist;
};