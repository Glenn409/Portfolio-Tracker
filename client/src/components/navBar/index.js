import React from 'react';
import './index.css'
import {Link, withRouter} from 'react-router-dom'


class NavBar extends React.Component{
    constructor(){
        super();
        this.state = {
            activeIndex: 0
        }
        this.logOut = this.logOut.bind(this)
        this.changeActive = this.changeActive.bind(this)
    }
    logOut(e){
        e.preventDefault()
        localStorage.removeItem('userToken')
        this.props.history.push('')
    }
    changeActive(index){
        this.setState({
            activeIndex:index
        })
    }
    render(){
  
        return(
            <div className='nav-container'>
                <div className='title-box'>
                    <i className="fa fa-pie-chart icon"></i>
                    <p className= 'nav-title'>CryptoTracking</p>
                </div>
                <Link className='text-link' to='/dashboard/portfolio'>
                    <div className={this.state.activeIndex === 0 ? 'nav-box active' : 'nav-box'}  onClick={() => this.changeActive(0)}>
                        <i className="fa fa-bar-chart-o icon"></i>
                        <p>Portfolio</p>
                    </div>
                </Link>

                <Link className='text-link' to='/dashboard/transactions'>
                    <div className={this.state.activeIndex === 1 ? 'nav-box active' : 'nav-box'}  onClick={() => this.changeActive(1)}>
                    <i className="fa fa-tasks icon"></i>
                        <p>Transactions</p>
                    </div>
                </Link>

                <Link className='text-link' to='/dashboard/settings'>
                    <div className={this.state.activeIndex === 2 ? 'nav-box active' : 'nav-box'}  onClick={() => this.changeActive(2)}>
                        <i className="fa fa-cog icon"></i>
                        <p>Settings</p>
                    </div>
                </Link>

{/* 
                <Link className='text-link' to=''>
                    <div className='nav-box'>
                        <p>box4</p>
                    </div>
                </Link> */}

                <Link className='text-link' to=''>
                    <div className='nav-box' onClick={this.logOut}>
                     <i className="fa fa-sign-out icon"></i>
                        <p>Logout</p>
                    </div>
                </Link>
            </div>
        )
    }
}

export default withRouter(NavBar);