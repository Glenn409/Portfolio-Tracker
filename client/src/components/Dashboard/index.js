import React from 'react'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import './index.css'

import NavBar from '../navBar'
import Portfolio from '../portfolio'
import Settings from '../Settings'

function Dashboard(){
        return(
            <Router>
                <div className='container'>
                    <NavBar />
                    <Switch>
                        <Route path='/dashboard/portfolio'>
                            <Portfolio />
                        </Route>
                        <Route path='/dashboard/settings'>    
                            <Settings />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
}

export default Dashboard