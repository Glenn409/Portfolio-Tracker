const db = require('../models/')
const routeTools = require('./routeFunctions')
const jwt = require("jsonwebtoken")

module.exports = app => {
    //login
    app.post("/api/login", (req,res)=>{
        let user = {
            email:req.body.email,
            password: req.body.password
        }
        routeTools.login(user, function(data){
            res.send(data)
        })
    })  
    //signup
    app.post("/api/signup",(req,res) =>{
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        routeTools.signUp(newUser, function(data){
            console.log(data)
        })
    })
    //a route to retrieve the users portfolio/data
    app.post('/api/getPortfolio',(req,res) =>{
        routeTools.getPortfolio(req.body.userPortfolio, function(data){
            routeTools.getHistoricalData(data, function(historicalData){
            res.send(data)
            })
             // ({portfolioData:data,
        })
    })
    //post to update database coin prices
    app.post('/api/getPrices',(req,res)=>{
        routeTools.getPriceValues(req.body.userPortfolio, function(data){
                res.send(data)
            })

        })
    //post get historicalData of each Coin for  (req,res) =>    graph display
        // app.post('/api/getHistoricalData', (req,res) => {   routeTools.getH
        //     routeTools.getHistoricalData(req.body.id, function(data){
        //         console.log(data)
        //     })
        // })
    

}  