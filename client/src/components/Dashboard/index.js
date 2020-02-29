import React from 'react'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import './index.css'
import jwtDecode from 'jwt-decode'
import NavBar from '../navBar'
import Portfolio from '../portfolio'
import Settings from '../Settings'
import Transactions from '../transactions'
import EmptyPortfolio from'../emptyPortfolio'
import App from '../../App'
import {fetchPortfolio} from '../fetchFunctions'
import CircularProgress from '@material-ui/core/CircularProgress';


class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            loaded:false,
            userId: '',
            portfolio: {},
            historicalData: {},
            thirtyDayGraphData: {},
            index: 0
        }
        this.onTransactionChange = this.onTransactionChange.bind(this)
        this.changeIndex = this.changeIndex.bind(this)
    }
    UNSAFE_componentWillMount(){
        const token = localStorage.userToken
        const decoded = jwtDecode(token)
        this.setState({userId: decoded.userID})

    }
    componentDidMount(){
        fetchPortfolio(this.state.userId).then(res =>{
            if(res.data.portfolio === false){
                this.setState({portfolio:{}})
                this.setState({loaded:true})
            } else {
                this.setState({portfolio: res.data.data.portfolio})
                this.setState({historicalData: res.data.data.historicalData})
                this.setState({graphData: res.data.data.thirtyDayGraphData})
                this.setState({loaded:true})

            }
        })
    }
    onTransactionChange(id){
        fetchPortfolio(id).then(res =>{
            if(res.data.portfolio === false){
                this.setState({portfolio:{}})
            } else {
                this.setState({portfolio: res.data.data.portfolio})
                this.setState({historicalData: res.data.data.historicalData})
                this.setState({graphData: res.data.data.thirtyDayGraphData})
            }
        })
    }
    changeIndex(num){
        this.setState({index: num})
    }
    render(){   
        let havePortfolio = <p></p>;
        if(!this.state.loaded){
            havePortfolio = <div className='container'>
                                <NavBar />
                                <div className='loading-circle'>
                                    <p className='title'>Generating Portfolio</p>
                                    <CircularProgress loadsize={100} />
                                </div>
                            </div>
        } else if(!this.state.portfolio.transactions){
            havePortfolio = <div className='container'>
                                <NavBar 
                                    changeIndex={this.state.index}
                                    newIndex={this.changeIndex}
                                />
                                <Switch>
                                    <Route path='/dashboard/portfolio'>
                                        <EmptyPortfolio 
                                            changeIndex={this.changeIndex}
                                        />
                                    </Route>
                                    <Route path='/dashboard/settings'>    
                                        <Settings 
                                            userId={this.state.userId}
                                        />
                                    </Route>
                                    <Route path='/dashboard/transactions'>    
                                        <Transactions 
                                            transactionChange = {this.onTransactionChange}
                                            userId={this.state.userId}
                                            // portfolio={this.state.portfolio}
                                        />
                                    </Route>
                                </Switch>
                            </div>
        } else {
            havePortfolio =<Router>
                            <div className='container'>
                                <NavBar 
                                    changeIndex={this.state.index}
                                    newIndex={this.changeIndex}
                                />
                                <Switch>
                                    <Route path='/dashboard/portfolio'>
                                        <Portfolio 
                                            portfolio={this.state.portfolio}
                                            historicalData={this.state.historicalData}
                                            thirtyDayGraphData={this.state.graphData}
                                        />
                                    </Route>
                                    <Route path='/dashboard/settings'>    
                                        <Settings 
                                         userId={this.state.userId}
                                        />
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