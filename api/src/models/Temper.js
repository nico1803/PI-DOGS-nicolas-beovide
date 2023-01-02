const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('temper', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}