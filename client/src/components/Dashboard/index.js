import React from 'react'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import './index.css'
import jwtDecode from 'jwt-decode'
import NavBar from '../navBar'
import Portfolio from '../portfolio'
import Settings from '../Settings'
import App from '../../App'
import {fetchPortfolio} from '../fetchFunctions'

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            userId: '',
            portfolio: {}
        }
    }
    UNSAFE_componentWillMount(){
        const token = localStorage.userToken
        const decoded = jwtDecode(token)
        this.setState({userId: decoded.userID})

    }
    componentDidMount(){
        fetchPortfolio(this.state.userId).then(res =>{
            this.setState({portfolio: res.data.portfolio})
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