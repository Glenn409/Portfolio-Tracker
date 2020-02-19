const db = require('../models/')
const routeTools = require('./routeFunctions')
const jwt = require("jsonwebtoken")
// const passport = require('passport')
module.exports = app => {
    //used to show the current express-session, helps with debugging passport
    // app.use((req,res,next)=>{
    //     console.log('req.session: ',req.session)
    //     return next()
    // })
      
    app.get("/",(req,res) =>{
        res.send('hellllooooo')
    }) 
    app.get('/dashbard',(req,res) =>{
        console.log('here') 
    })
    app.post("/api/login", (req,res)=>{
        let user = {
            email:req.body.email,
            password: req.body.password
        }
        routeTools.login(user, function(data){
            res.send(data)
        })
    })  
    // app.post("/api/login", (req,res,next) =>{
    //     console.log(req.body)
    //     passport.authenticate('local-login',function(error,user,info){
    //         if(error){
    //             res.json({error: 'errrorr'})
    //         }
    //         res.json({   
    //             error:error,
    //             user: user,
    //             info:info
    //         })

    //     })(req,res,next)
    // })

    // app.post('/login', passport.authenticate ('login',
    //  {
    //      failureRedirect: '/login',
    //       failureFlash: true
    //      }), (req, res, next) => {
    //      console.log('i did it')
        // passport.authenticate('local', (err,user,info) =>{
        //     console.log('auth completed')
        //     if(err) console.log(err)
        //     if(info){
        //         console.log(info)
        //     } else {
        //         req.logIn(user, err => {
        //             db.User.findOne({
        //                 where: {email: user.email}
        //             }).then(user =>{
        //                 const token = jwt.sign({ id: user.email}, process.env.ACCESS_TOKEN_SECRET)
        //                 console.log('user logged in ')
        //                 res.status(200).send({
        //                     auth:true,
        //                     token:token,
        //                     message:'user found and logged in'
        //                 })
        //             })
        //         })(req, res, next);
        //     }

        // })
        // const user = {
        //     email: req.body.email,
        //     password: req.body.password
        // }
        // routeTools.login(user, function(data){
        //     console.log(data)
        // })
    // })

    app.post("/api/signup",(req,res) =>{
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        routeTools.signUp(newUser, function(data){
            console.log(data)
        })
    })



}   