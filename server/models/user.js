'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bycript');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      allowNull:false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "username is required"
        },
        notNull: {
          msg: "username is required"
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email must be unique"
      },
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        notNull: {
          msg: "Email is required"
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "password is required"
        },
        notNull: {
          msg: "password is required"
        }
      }
    }, 
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      },
    },
  });
  return User;
};