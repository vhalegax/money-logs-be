'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MoneyLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.MoneyLog.belongsTo(models.User, {
        foreignKey: 'user_id',
        sourceKey: 'id'
      })

      models.MoneyLog.belongsTo(models.User, {
        foreignKey: 'user_id',
        sourceKey: 'id'
      })
    }
  }
  MoneyLog.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.ENUM('income', 'outcome'),
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      category_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'MoneyLog',
      tableName: 'money_logs',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return MoneyLog
}
