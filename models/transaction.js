const User = require('./user')
module.exports = (sequelize, DataTypes) => {
    var Transaction = sequelize.define("Transactions", {
        transaction_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
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
        Transaction.belongsTo(models.User {
            foreignKey: "userId"
        });
    }
    return Transaction;
}