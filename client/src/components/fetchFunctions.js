import axios from 'axios'
import  moment from 'moment'
require('dotenv').config()

export const fetchPortfolio = (obj) => {
     return axios.post(`/api/getPortfolio`,{
        userPortfolio: obj
    }).then(res =>{
        return ({data:res.data})
    })
}

export const fetchCoins = () =>{
    return axios.get(`/api/getCoins`).then(res => {
        return({data:res.data})
    })
}
export const createNewTransaction = (obj)=>{
    return axios.post(`/api/createNewTransaction`,{
        transaction: obj
    }).then(res =>{
        return({data:res.data})
    })
}

export const getHistoricalPrice = (date,coin) =>{
    let ts = moment(date).format('X')
    return axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${coin.toUpperCase()}&tsyms=USD&ts=${ts}&limit=1&APIKEY=${process.env.CRYPTO_APIKEY}`)
        .then(res =>{
            return res
        })
}

export const deleteTransaction = (id) =>{
    return axios.delete(`/api/deleteTransaction`, { 
        data: { id:id }
    }).then(res =>{
        return ({response: res.data})
    })
}