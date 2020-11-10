'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Playlist, { foreignKey: 'playlistId' });
      this.belongsTo(models.Song, { foreignKey: 'songId' });
    }
  };
  PlaylistSong.init({
    playlistId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlaylistSong',
    tableName: 'playlistSongs',
    paranoid: true,
  });
  return PlaylistSong;
};