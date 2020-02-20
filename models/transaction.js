const User = require('./user')
module.exports = (sequelize, DataTypes) => {
    var Transaction = sequelize.define("Transactions", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true, 
        },
        transaction_type: {
            type: DataTypes.STRING,
        },
        coin:{
            type:DataTypes.STRING
        },
        quantity: {
            type: DataTypes.DECIMAL(10, 2)
        }

    }, {
        underscore: true
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, {
            foreignKey: "userId"
        });
    }
    return Transaction;
}