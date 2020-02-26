import React from 'react'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import './index.css'
import jwtDecode from 'jwt-decode'
import NavBar from '../navBar'
import Portfolio from '../portfolio'
import Settings from '../Settings'
import Transactions from '../transactions'
import App from '../../App'
import {fetchPortfolio} from '../fetchFunctions'

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            userId: '',
            portfolio: {},
            historicalData: {}
        }
        this.onTransactionChange = this.onTransactionChange.bind(this)
    }
    UNSAFE_componentWillMount(){
        const token = localStorage.userToken
        const decoded = jwtDecode(token)
        this.setState({userId: decoded.userID})

    }
    componentDidMount(){
        fetchPortfolio(this.state.userId).then(res =>{
            this.setState({portfolio: res.data.data.portfolio})
            this.setState({historicalData: res.data.data.historicalData})
        })
    }
    onTransactionChange(id){
        fetchPortfolio(id).then(res =>{
            this.setState({portfolio: res.data.data.portfolio})
            this.setState({historicalData: res.data.data.historicalData})
        })
    }

    render(){
        let havePortfolio = <p></p>;
        if(!Object.keys(this.state.portfolio).length){
            havePortfolio = <h2>NO CONTENTS IN PORTFOLIO</h2>
        } else {
            havePortfolio =<Router>
                            <div className='container'>
                                <NavBar />
                                <Switch>
                                    <Route path='/dashboard/portfolio'>
                                        <Portfolio 
                                            portfolio={this.state.portfolio}
                                            historicalData={this.state.historicalData}
                                        />
                                    </Route>
                                    <Route path='/dashboard/settings'>    
                                        <Settings />
                                    </Route>
                                    <Route path='/dashboard/transactions'>    
                                        <Transactions transactionChange = {this.onTransactionChange}
                                            userId={this.state.userId}
                                            portfolio={this.state.portfolio}
                                        />
                                    </Route>
                                    <Route path=''>
                                        <App />
                                    </Route>
                                </Switch>
                            </div>
                        </Router>
        }
        return(
            <div>
                {havePortfolio}
            </div>
        )
    }
}

export default Dashboard