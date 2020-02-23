//file to help keep api router code clean and easy to look at.
require('dotenv').config()
const db = require('../models/')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const axios = require('axios')
const moment = require('moment')
module.exports = {

    //sign up function
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

    //login function
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
    
    //returns  all transactions and the totals of those transactions
    transactionsAndQuantity: function(userID, cb){
        db.transaction.findAll({ 
            where: { UserId : userID} 
        }).then(res =>{
            if(res === {}){
                cb({data: false})
            } else {
                let returnObj = {
                    quantityOfEachCoin: {},
                    transactionList: []
                }
                for(let i = 0; i < res.length; i++){
                    if(!returnObj.quantityOfEachCoin[`${res[i].dataValues.coin}`]){
                        returnObj.quantityOfEachCoin[`${res[i].dataValues.coin}`] = 0;
                    }
                    returnObj.quantityOfEachCoin[`${res[i].dataValues.coin}`] += parseFloat(res[i].dataValues.quantity)
                    console.log(returnObj.transactionList)
                    returnObj.transactionList.push(res[i].dataValues)
                }
                cb({data:returnObj})

            }
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

    },
    //puts together the portfolio for react to access and display
    getPortfolio: function(id,cb){
        let coinInfo = []
        let coins = {}
        let transactionList = []
        let dis = this //cant call getPriceValues unless giving this a variable
        let usdValue = 0
        let btcValue = 0

        dis.transactionsAndQuantity(id, function(data){
            coins.quantity = data.data.quantityOfEachCoin
            transactionList = data.data.transactionList
            dis.getPriceValues(coins.quantity,function(data){
                coinInfo = data.dataArray
                coins.coinInfo = coinInfo
                coins.transactions = transactionList

                const coinKeys = Object.keys(coins.quantity)
                const quantity = Object.values(coins.quantity)
                for(let i = 0; i < coinKeys.length;i++){
                    for(let x = 0; x < coinInfo.length;x++){
                        Object.keys(coinInfo[x]).map(function(key,index){
                            if(coinKeys[i].toUpperCase() === coinInfo[x][key]){
                                coinInfo[x].quantity = quantity[i]
                                coinInfo[x].coinUSDBalance = quantity[i] * coinInfo[x][`usdprice`]
                                usdValue += coinInfo[x].coinUSDBalance
                                coinInfo[x].coinBTCBalance = quantity[i] * coinInfo[x][`btcprice`]
                                btcValue += coinInfo[x].coinBTCBalance
                            }
                        })
                    }
                }
                coins.balance = {
                    usd: parseFloat(usdValue.toFixed(2)),
                    btc: parseFloat(btcValue.toFixed(8))
                }
                cb({portfolio: coins})
            })
        })
        
    },

    async getHistoricalData(obj,cb){
        let url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym='
        let coin = ''
        let params1 =`&tsym=USD&limit=`
        let params2 = `&api_key=${process.env.CRYPTO_APIKEY}`
        let returnObj = obj
        let coinList = []
        let queryList = []
        returnObj.historicalData = {}

        const userCoins = Object.keys(obj.portfolio.quantity)
        for(let i = 0; i < userCoins.length; i++){
            coin = userCoins[i].toUpperCase()
            coinList.push(coin)
        }
        
        for(let x = 0; x < coinList.length; x++){
            let transactionList = []
            for (let i = 0; i < obj.portfolio.transactions.length; i++){
                if(coinList[x].toUpperCase() === obj.portfolio.transactions[i].coin.toUpperCase()){
                    if (obj.portfolio.transactions[i].purchaseDate === null){
                        transactionList.push(moment(obj.portfolio.transactions[i].sellDate, 'X'))
                    } else {
                        transactionList.push(moment(obj.portfolio.transactions[i].purchaseDate, 'X'))
                    }

                }
            }
            let farthestDate = moment.min(transactionList)
            let day = moment().diff(farthestDate,'days')
            console.log(day)
            let query = url+coin+params1+day+params2
            console.log(query)
            queryList.push(query)
        }
        let dataArray = []
        for(let i = 0; i < queryList.length;i++){
            dataArray.push(this.getData(queryList[i]))
        }

        Promise.all(dataArray).then(() =>{
            for(let i = 0; i < dataArray.length; i++){
                returnObj.historicalData[coinList[i]] = []
                Promise.resolve(dataArray[i]).then(res =>{
                    returnObj.historicalData[coinList[i]] = res
                })
            }
    
        })
        .then(() =>{
            cb({data: returnObj})
        })
    
    },
    
    getData(url){
        return new Promise ((resolve, reject) => {
            axios.get(url).then(res =>{
                resolve(res.data.Data.Data)
            })
        })
    }
}


// for (let i = 0; i < obj.portfolio.transactions.length; i++){
//     if (obj.portfolio.transactions[i].purchaseDate === null){
//         transactionList.push(moment(obj.portfolio.transactions[i].sellDate, 'X'))
//     } else {
//         transactionList.push(moment(obj.portfolio.transactions[i].purchaseDate, 'X'))
//     }
// }

// let farthestDate = moment.min(transactionList)
// let days = moment().diff(farthestDate,'days')