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
        console.log(req.body)
        const newUser = {
            name:req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        routeTools.signUp(newUser, function(data){
            if(data.error){
                res.send({res: data})
            } else {
                routeTools.login(newUser,function(data){
                    res.send({success:data})
                })
            }
        })
    })
    //a route to retrieve the users portfolio/data
    app.post('/api/getPortfolio',(req,res) =>{
        routeTools.getPortfolio(req.body.userPortfolio, function(data){
            if(data.portfolio === false){
                res.json({portfolio:false})
            } else {
                routeTools.getHistoricalData(data, function(historicalData){
                        res.send({data:data})
                    })
                }
            })
        })
    //post to update database coin prices
    app.post('/api/getPrices',(req,res)=>{
        routeTools.getPriceValues(req.body.userPortfolio, function(data){
                res.send(data)
            })

        })
    app.get('/api/getCoins',(req,res) =>{
        routeTools.getCoins(function(data){
            res.send(data)
        })
    })
    app.post('/api/createNewTransaction',(req,res) =>{
        routeTools.createNewTransaction(req.body, function(data){
            res.send(data)
        })
    })

    app.delete('/api/deleteTransaction',(req,res) =>{
        routeTools.deleteTransaction(req.body.id, function(data){
            res.send(data)
        })
    })
    app.post('/api/getAccountInfo',(req,res) =>{
        routeTools.getAccountInfo(req.body, function(data){
            res.send(data)
        })
    })
    app.put('/api/updateEmail', (req,res) =>{
        routeTools.updateEmail(req.body,function(data){
            res.send(data)
        })
    })
    app.put('/api/updatePW',(req,res) => {
        routeTools.updatePW(req.body,function(data){
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