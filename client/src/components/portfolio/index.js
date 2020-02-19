import React from 'react';
import './index.css'
import jwtDecode from 'jwt-decode'

class Portfolio extends React.Component{
    constructor(){
        super();
        this.state = {
            email: ''
        }
    }

    componentDidMount(){
        const token = localStorage.userToken
        const decoded = jwtDecode(token)
        console.log(decoded)
        this.setState({
            email:decoded.email
        })
    }
    render(){
        return(
            <div>

                <h1>this is portfolio</h1>
                <h1>Email: {this.state.email}</h1>
            </div>
        )
    }
}

export default Portfolio;