const sequelize = require('./db')
const {DataTypes} = require('sequelize')

const Product = sequelize.define('products', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    qty: {type: DataTypes.INET, defaultValue: 0},
    image: {type: DataTypes.STRING, allowNull: true},
}, {timestamps: false});

module.exports = Product;