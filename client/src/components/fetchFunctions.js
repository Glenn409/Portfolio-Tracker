import axios from 'axios'

export const fetchPrices = (obj) => {
     return axios.post(`/api/getPrices/`,{
        userPortfolio: obj
    }).then(res =>{
        return ({prices:res.data})
    })
}