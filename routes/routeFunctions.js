//file to help keep api router code clean and easy to look at.
require('dotenv').config()
const db = require('../models/')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

module.exports = {

     signUp: function(newUser, cb){
       db.User.findOne({
           where: { email: newUser.email}
       }).then(user =>{
           if(user){
               cb({error: "Email is already in use!"})
           } else {
               db.User.create(newUser).then(db =>{
                    cb({success: 'created account'})
               })
           }
       })
    },

    login: function(currentUser, cb){
        db.User.findOne({
            where: {email: currentUser.email}
        }).then(user =>{
            console.log(user)
            if(user === null){
                cb({error: 'Invalid Username'})
             } else {
                if(bcrypt.compareSync(currentUser.password, user.dataValues.password)){
                    const accessToken = jwt.sign(
                        {email: user.email},
                        process.env.ACCESS_TOKEN_SECRET
                        // ,{expiresIn: 900}
                        ) 
                    cb({accessToken: accessToken})
                } else {
                    cb({error: 'Invalid Password'})
                }
            }
        })
    }
    
    

}