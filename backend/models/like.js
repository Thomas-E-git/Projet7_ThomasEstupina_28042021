'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Like.init({
    topicId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Topic',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    isLike: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  Like.associate = function(models) {

    models.User.belongsToMany(models.Topic, {
      through: models.Like,
      foreignKey: 'userId',
      otherKey: 'topicId',
    });

    models.Topic.belongsToMany(models.User, {
      through: models.Like,
      foreignKey: 'topicId',
      otherKey: 'userId',
    });

    models.Like.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    models.Like.belongsTo(models.Topic, {
      foreignKey: 'topicId',
      as: 'topic',
    });
  };
  return Like;
};