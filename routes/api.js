const db = require('../models/')
const routeTools = require('./routeFunctions')
const jwt = require("jsonwebtoken")

module.exports = app => {
    //used to show the current express-session, helps with debugging passport
    // app.use((req,res,next)=>{
    //     console.log('req.session: ',req.session)
    //     return next()
    // })

    app.post("/api/login", (req,res)=>{
        let user = {
            email:req.body.email,
            password: req.body.password
        }
        routeTools.login(user, function(data){
            res.send(data)
        })
    })  

    app.post("/api/signup",(req,res) =>{
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        routeTools.signUp(newUser, function(data){
            console.log(data)
        })
    })

    app.post('/api/getPortfolio',(req,res) =>{
        routeTools.getPortfolio(req.body.userPortfolio, function(data){
            res.send(data)
        })
    })

    app.post('/api/getPrices',(req,res)=>{
        routeTools.getPriceValues(req.body.userPortfolio, function(data){
            res.send(data)
        })
    })

}   