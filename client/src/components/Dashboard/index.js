import React from 'react'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import './index.css'
import jwtDecode from 'jwt-decode'
import NavBar from '../navBar'
import Portfolio from '../portfolio'
import Settings from '../Settings'
import App from '../../App'
import axios from 'axios'

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            userID: '',
            portfolio: {},
            transactions: []
        }
    }
    UNSAFE_componentWillMount(){
        const token = localStorage.userToken
        const decoded = jwtDecode(token)
        this.setState({userID: decoded.userID})

    }
    componentDidMount(){
        axios.get(`/api/getPortfolio/${this.state.userID}`).then(res =>{
            this.setState({transactions: res.data.data.transactionList})
            this.setState({portfolio: res.data.data.quantityOfEachCoin})
        })
        
    }
    render(){
        
        return(
            <Router>
                <div className='container'>
                    <NavBar />
                    <Switch>
                        <Route path='/dashboard/portfolio'>
                            <Portfolio 
                                transactions={this.state.transactions}
                                userId={this.state.userID}
                                portfolio={this.state.portfolio}
                            />
                        </Route>
                        <Route path='/dashboard/settings'>    
                            <Settings />
                        </Route>
                        <Route path=''>
                            <App />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Dashboard