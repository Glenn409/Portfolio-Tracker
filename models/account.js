'use strict';

module.exports = (sequelize,DataTypes) => {
    const Account = sequelize.define('account', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    },
    {
        timestamps: false
    })
    return Account;
}
