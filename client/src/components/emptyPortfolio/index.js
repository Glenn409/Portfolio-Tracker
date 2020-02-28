import React from 'react'
import './index.css'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class EmptyPortfolio extends React.Component{
    constructor(){
        super()
        this.state = {

        }
        this.redirect = this.redirect.bind(this)
        this.updateIndex = this.updateIndex.bind(this)
    }
    redirect(){
        this.props.history.push('/dashboard/transactions')
    }
    updateIndex(){
        this.props.changeIndex(1)
    }
    render(){
        return(
            <div className='empty-container'>
                <div className='start-portfolio card'>
                    <p className='start-title'>Create a Portfolio</p>
                    <div>
                        <p>Your Portfolio Page looks a little empty, no worries!</p>
                        <p className='empty-third'>Create a transaction to generate a Portfolio!</p>
                        <Button component={Link} to='/dashboard/transactions' onClick={this.updateIndex} variant="contained" className='start-button' color="primary">Create a Transaction</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmptyPortfolio