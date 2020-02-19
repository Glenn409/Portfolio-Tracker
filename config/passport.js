
// require('dotenv').config();
// const bcrypt = require('bcrypt')
// const db = require('../models/')
// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt


// passport.use('local-login', new LocalStrategy(
//     {
//         usernameField: 'username',
//         passwordField: 'password'
//     },(username,password,done) =>{
//         console.log(email)
//         db.User.findOne({   
//             where: {email: username}
//         }).then(user => {
//             if(user === null){
//                 return done(null,false,{message: 'Username already exists!'})
//             } else {
//                 bcrypt.compareSync(user.password, password).then(response =>{
//                     if( response === true){
//                         return done(null, user)
//                     } else {
//                         return done(null, false, {message:'Password does not match!'})
//                     }
//                 })
//             }
//         }) 
//     }
// ))


// // var opts = {}
// // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// // opts.secretOrKey = 'secret';

// // passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done){
// //     db.User.findOne({
// //         where: {
// //             id: jwt_payload.id
// //         }
// //     }).then(user =>{
// //         if(user){
// //             console.log('user found in db in passport')
// //             done(null,user)
// //         } else {
// //             console.log('user not found in db')
// //             done(null,false)
// //         }
// //     })
// // }))

// module.exports = passport;

const db = require("../models");

module.exports = function(passport)  {
  const LocalStrategy = require("passport-local").Strategy;

  passport.use('local-login',new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      db.User.findOne({
        where: {
          email: email
        }
      }).then(dbUser => {
        if (!dbUser) {
          return done(null, false, { message: 'Incorrect username.' });
        } else if (dbUser.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
         return done(null, dbUser);
      });
    }
  )
)

  passport.use('local-signup',new LocalStrategy(
    
    {
      usernameField: 'username'
    },(username,password,done) => {
      db.User.findOne({
        where: {
          username: username
        }
        }).then(dbUser =>{
          if(dbUser){
            done(null,false, {message: "Email already taken."})
          } else {
            let newUser = {
              username: username,
              password: password
            }
            db.User.create(newUser).then(function(newUser){
              if(!newUser){
                return done(null,false)
              }
              if(newUser){
                return done(null,newUser)
              }
            })
          }
        })
      }
    ))

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  }) 

  passport.deserializeUser(function(user, done) { 
    done(null, user); 
  });
}