import axios from 'axios'

export const fetchPortfolio = (obj) => {
     return axios.post(`/api/getPortfolio`,{
        userPortfolio: obj
    }).then(res =>{
        // console.log(res.data)
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
