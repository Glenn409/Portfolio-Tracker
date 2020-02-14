'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize,DataTypes) => {
    let User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
           
    },
    {
        timestamps: false
    })

    // User.beforeCreate((user) => {
    //     user.password = bcrypt.hashSync(
    //       user.password,
    //       bcrypt.genSaltSync(10),
    //       null
    //     );
    //   });
    
    //   User.prototype.validPassword = function(password) {
    //     return bcrypt.compareSync(this.password, password);
    //   };

    User.associate = (models) =>{
        User.hasOne(models.Account, {
            as:'userAccount',
            foreignKey: 'userId'
        })
    }
    return User; 
}
