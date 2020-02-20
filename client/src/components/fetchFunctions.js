import axios from 'axios'

export const fetchPortfolio = (obj) => {
     return axios.post(`/api/getPortfolio`,{
        userPortfolio: obj
    }).then(res =>{
        return ({data:res.data})
    })
}