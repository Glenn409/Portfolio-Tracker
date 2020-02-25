import React from 'react'
import './index.css'
// import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Transactiontable from '../transactiontable'

class Transactions extends React.Component{
    constructor(){
        super()
        this.state = {
            toggle:false,
            date: new Date()
        }
        this.toggleState = this.toggleState.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    toggleState() {
		this.setState({toggle: !this.state.toggle})
    }
    handleChange = date => {
        this.setState({date: date})
      }

    render(){
        console.log(this.props)
        return(
            <div className='test-container'>
                <div className='transactions-container'>
                    
                    <div className='form-container card'>
                    <p className='header title'>Create a Transaction</p>  
                        <div className='creation'>
                             <div className='first-row'>

                                <div>
                                    <p className='sub-title'>Coin</p>
                                    <input placeholder='Coin'></input>
                                    <p className='sub-title'>Amount</p>
                                    <input placeholder='Amount'></input>
                                </div>
                                <div>
                                    <p className='sub-title'>Select a date</p>
                                    <DatePicker 
                                        className='calender'
                                        selected={this.state.date}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>                       

                            <div className='radioButtons switch-field'>
                                <div className="sub-title x">Transaction Type</div>
                                    <input
                                        type="radio"
                                        id="switch_left"
                                        name="switchToggle"
                                        value='buy'
                                        onChange={this.toggleState}
                                        checked={!this.state.toggle}
                                    />
                                    <label htmlFor="switch_left">Buy</label>

                                    <input
                                        type="radio"
                                        id="switch_right"
                                        name="switchToggle"
                                        value='sell'
                                        onChange={this.toggleState}
                                        checked={this.state.toggle}
                                    />
                                    <label htmlFor="switch_right">Sell</label>
                            </div>
                        </div>

                    </div>

                    <Transactiontable
                        transactions={this.props.portfolio.transactions}
                    />

                </div>
            </div>
        )
    }
}

export default Transactions