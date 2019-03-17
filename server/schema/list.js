/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'list',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      content: {
        type: DataTypes.CHAR(255),
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      }
    },
    {
      tableName: 'list',
      timestamps: false // sequelize默认会自动为其添加 createdAt 和updatedAt字段，所以设为false
    }
  )
}
