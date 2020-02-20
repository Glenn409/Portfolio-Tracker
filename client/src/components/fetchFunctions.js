import axios from 'axios'

export const getPortfolio = (userID) => {
     axios.get(`/api/getPortfolio/${userID}`).then(res =>{
        //  consolef.log(res.data.data)
        // return (res.data.data)
    })
}