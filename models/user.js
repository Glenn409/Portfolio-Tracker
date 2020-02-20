'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true, 
          },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING  
        }   
    })

    User.beforeCreate((user) => {user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)})
    return User; 
}
