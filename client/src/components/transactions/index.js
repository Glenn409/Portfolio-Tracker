import React from 'react'
import './index.css'
// import axios from 'axios'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Transactiontable from '../transactiontable'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {fetchCoins, createNewTransaction} from '../fetchFunctions'

class Transactions extends React.Component{
    constructor(){
        super()
        this.state = {
            toggle:false,
            date: new Date(),
            tags: [],
            searchList: [],
            amount: ' ',
            amountError: '',
            submitError: '',
            success: false,
        }
        this.toggleState = this.toggleState.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onTagsChange = this.onTagsChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onAmountChange = this.onAmountChange.bind(this)
    }
    componentDidMount(){
        fetchCoins().then(res =>{
            this.setState({searchList: res.data.data})
        })
    }
    toggleState(newValue) {
		this.setState({toggle: !this.state.toggle})
    }
    handleChange = date => {
        this.setState({date: date})
      }
    onTagsChange = (e,values) =>{
        this.setState({tags: values})
    }
    onAmountChange(e){
        if(e.target.value ==='' || isNaN(e.target.value) === true){
            this.setState({amountError: 'error'})
        } else {
            this.setState({amountError:''})
        }
        
        this.setState({amount:e.target.value})
    }

    handleSubmit = async() =>{
        let type
        let purchaseDate
        let sellDate
        let newDate = moment(this.state.date).format('X')
        newDate = parseInt(newDate)

        if (this.state.toggle === false){
            type = 'buy'
            purchaseDate =  newDate
            sellDate = null
        } else{
            type = 'sell'
            sellDate= newDate
            purchaseDate = null
        } 
        if(this.state.tags.length = 0 || this.state.amount === ' '){
            this.setState({submitError: 'Please fill in all forms!'})
        } else {
            this.setState({submitError:''})
            let newTransaction = {
                transaction_type: type,
                coin: this.state.tags.symbol.toLowerCase(),
                name: this.state.tags.name,
                quantity: this.state.amount,
                purchaseDate: purchaseDate,
                sellDate: sellDate,
                UserId: this.props.userId
            }
           let result = await createNewTransaction(newTransaction)
           this.props.transactionChange(this.props.userId)
            
         }
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
                                    <p className='form-sub-title'>Coin</p>
                                    <Autocomplete
                                        freeSolo={false}
                                        id='autocomplete-coin'
                                        options={this.state.searchList}
                                        getOptionLabel={option => `${option.name} (${option.symbol})`}
                                        onChange={this.onTagsChange}
                                        openText={''}
                                        renderInput={params => (
                                            <TextField
                                            {...params}
                                            placeholder="Coin Name"
                                            />
                                        )}
                                    />
                                    <p className='form-sub-title'>Amount</p>
                                    <TextField
                                        error={this.state.amountError}
                                        placeholder="123"
                                        onChange={this.onAmountChange}
                                        helperText={this.state.amountError ==='error'? 'Please input a Number!' : ''}
                                    />
                                </div>
                                <div>
                                    <p className='form-sub-title'>Select a date</p>
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
                            <Button variant="contained" onClick={this.handleSubmit} color="primary">submit</Button>

                            <div>
                                {this.state.success ?(
                                    <p className='form-success'>Transaction Created!</p>
                                ): (
                                    <p className='form-error'>{this.state.submitError}</p>

                                )}
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