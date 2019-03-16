/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_name: {
        type: DataTypes.CHAR(50),
        allowNull: false
      },
      password: {
        type: DataTypes.CHAR(128),
        allowNull: false
      }
    },
    {
      tableName: 'user',
      timestamps: false // sequelize默认会自动为其添加 createdAt 和updatedAt字段，所以设为false
    }
  )
}
