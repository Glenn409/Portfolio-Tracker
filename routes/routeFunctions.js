//file to help keep api router code clean and easy to look at.
const db = require('../models/')

module.exports = {

     signUp: function(newUser){
       db.User.findOne({
           where: { email: newUser.email}
       }).then(user =>{
           if(user){
               res.json({error: "Email is already in use!"})
           } else {
               db.User.create(newUser).then(db =>{
                   res.json({success: 'created account'})
               })
           }
       })
    },

    login: function(user){
        db.User.findOne({
            where: {email: user.email}
        }).then(user =>{
            if(!user){
                console.log('failed')
                return ({error: 'Invalid Username'})
            } else {
                console.log('success')
            }
        })
    }
    

}