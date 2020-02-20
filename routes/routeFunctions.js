//file to help keep api router code clean and easy to look at.
require('dotenv').config()
const db = require('../models/')
const Transaction = require('../models/transaction')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const axios = require('axios')
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
            if(user === null){
                cb({error: 'Invalid Username'})
             } else {
                if(bcrypt.compareSync(currentUser.password, user.dataValues.password)){
                    const accessToken = jwt.sign(
                        {userID: user.id},
                        process.env.ACCESS_TOKEN_SECRET
                        // ,{expiresIn: 900}
                        ) 
                    cb({accessToken: accessToken})
                } else {
                    cb({error: 'Invalid Password'})
                }
            }
        })
    },
    
    //returns a Users Portfolio, all transactions and the totals of those transactions
    getPortfolio: function(userID, cb){
        db.transaction.findAll({ 
            where: { UserId : userID} 
        }).then(res =>{
            let returnObj = {
                quantityOfEachCoin: {},
                transactionList: []
            }
            for(let i = 0; i < res.length; i++){
                if(!returnObj.quantityOfEachCoin[`${res[i].dataValues.coin}`]){
                    returnObj.quantityOfEachCoin[`${res[i].dataValues.coin}`] = 0;
                }
                returnObj.quantityOfEachCoin[`${res[i].dataValues.coin}`] += parseInt(res[i].dataValues.quantity)
                
                returnObj.transactionList.push(res[i].dataValues)
            }
            cb({data:returnObj})
        })
    },

    //updates all PRICES of the coins table for tracking in react
    updatePrices: function(){
        let symbolArray = []
        db.coin.findAll().then(res =>{
            for(let i = 0; i < res.length;i++){
                symbolArray.push(res[i].dataValues.symbol)
            }
            let url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=`
            for(let i = 0; i < symbolArray.length; i++){
                url += symbolArray[i]
                url +=','
            }
            url.substring(0,url.length-1)
            url += '&tsyms=USD,BTC'
            url += `&api_key=${process.env.CRYPTO_APIKEY}`

            axios.get(url).then(res =>{
                if(res.data){
                    for(let prop in res.data){
                        const location = {where: {symbol: prop}}
                        let updatedInfo = {
                            btcprice: res.data[prop].BTC,
                            usdprice: res.data[prop].USD
                         }
                        db.coin.update(updatedInfo,location).then()
                         
                    }
                }
            })
            
        })
    },

    getPriceValues: function(obj,cb){
        let returnArray = []
        for(let prop in obj){
            db.coin.findOne({
                where: {symbol: prop.toUpperCase()}
            }).then(res =>{
                let priceData = {
                    symbol: res.dataValues.symbol,
                    name: res.dataValues.name,
                    btcprice: res.dataValues.btcprice,
                    usdprice: res.dataValues.usdprice,
                    lastUpdate: res.dataValues.updatedAt
                }
                returnArray.push(priceData)
                if(returnArray.length === Object.keys(obj).length){
                    cb({dataArray: returnArray})
                }
            })
        }

    }

  

}