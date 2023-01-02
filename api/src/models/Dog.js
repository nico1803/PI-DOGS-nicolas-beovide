const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('dog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    height: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    image: {
        type: DataTypes.STRING,
    }
  });
};