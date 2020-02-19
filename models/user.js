'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }   
    })

    User.beforeCreate((user) => {user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)})
    
    
    // User.associate = (models) =>{
    //     User.hasOne(models.Transaction, {
    //         as:'userAccount',
    //         foreignKey: 'userId'
    //     })
    // }
    return User; 
}
