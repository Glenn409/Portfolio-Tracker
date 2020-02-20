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

    app.get('/api/getPortfolio/:id',(req,res) =>{
        routeTools.getPortfolio(req.params.id, function(data){
            console.log(data)
            res.send(data)
        })
    })

    app.post('/api/getUSD',(req,res)=>{
        console.log(req.body.data)
    })

}   