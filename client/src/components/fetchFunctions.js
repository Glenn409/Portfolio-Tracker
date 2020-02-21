import axios from 'axios'

export const fetchPortfolio = (obj) => {
     return axios.post(`/api/getPortfolio`,{
        userPortfolio: obj
    }).then(res =>{
        // console.log(res.data)
        return ({data:res.data})
    })
}
