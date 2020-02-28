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
import {getHistoricalPrice} from '../fetchFunctions'

class Transactions extends React.Component{
    constructor(){
        super()
        this.state = {
            toggle:false,
            date: new Date(),
            choseDate: false,
            displayDate: '',
            tags: {},
            searchList: [],
            amount: 0,
            amountError: false,
            submitError: '',
            success: '',
            successMsg: '',
            recentTransaction: {},
            displayValue: 0,
            test: false
        }
        this.toggleState = this.toggleState.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onTagsChange = this.onTagsChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onAmountChange = this.onAmountChange.bind(this)
        this.deleteRecord = this.deleteRecord.bind(this)
    }
    componentDidMount(){
        fetchCoins().then(res =>{
            this.setState({searchList: res.data.data})
        })
    }
    toggleState() {
		this.setState({toggle: !this.state.toggle})
    }
    handleChange = date => {
        this.setState({date: date})
        this.setState({displayDate: moment(date).format('MM/DD/YYYY')})
        this.setState({choseDate: true}, () =>{
            if(this.state.choseDate === true && (Object.keys(this.state.tags)).length > 0){
                getHistoricalPrice(this.state.date, this.state.tags.symbol).then(res =>{
                    this.setState({displayValue: res.data[`${this.state.tags.symbol}`].USD})
                })
            }
        })
      }
    onTagsChange = (e,values) =>{
        if(values === null){
            this.setState({tags: {}})
        } else {
            this.setState({tags: values}, () => {
            if(this.state.choseDate === true && (Object.keys(this.state.tags)).length > 0){
                getHistoricalPrice(this.state.date, this.state.tags.symbol).then(res =>{

                    this.setState({displayValue: res.data[`${this.state.tags.symbol}`].USD})
                    })
                }
            })
        }

    }
    
    onAmountChange(e){
        if(isNaN(e.target.value) === true){
            this.setState({amountError: true})
            this.setState({amount: 0})
        } else {
            this.setState({amountError:false})
            this.setState({amount:e.target.value})
        }
    }
    deleteRecord(id){
        this.props.transactionChange(id)
        this.setState({test: !this.state.test})
    }
    handleSubmit = async(e) =>{
        e.preventDefault()
        if(this.state.amount === '' || this.state.tags.name === undefined){
            this.setState({success:'false'})
            this.setState({submitError: '* Please fill in all forms *'})
        } else {
            this.setState({submitError: ''})
            let type
            let purchaseDate
            let sellDate
            let newDate = moment(this.state.date).format('X')
            let negNum
            newDate = parseInt(newDate)
    
            if (this.state.toggle === false){
                type = 'buy'
                purchaseDate =  newDate
                sellDate = null
                negNum = parseFloat(this.state.amount)
            } else{
                type = 'sell'
                sellDate= newDate
                purchaseDate = null
                negNum = parseFloat(this.state.amount) * -1
            } 
            if((Object.keys(this.state.tags)).length === 0 || this.state.amount === ' '){
                this.setState({submitError: '* Please fill in all forms! *'})
            } else {
                this.setState({submitError:''})
                let newTransaction = {
                    transaction_type: type,
                    coin: this.state.tags.symbol.toLowerCase(),
                    name: this.state.tags.name,
                    quantity: negNum,
                    purchaseDate: purchaseDate,
                    sellDate: sellDate,
                    UserId: this.props.userId
                }
                this.setState({success:'true'})
                this.setState({successMsg: 'Transaction Created!'})
               createNewTransaction(newTransaction).then(res =>{
                   newTransaction.id = res.data.id
                   this.props.transactionChange(this.props.userId)
                   this.setState({recentTransaction: newTransaction})
                  
               })
    
    
                
             }
            }
        }
    
    render(){
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        let checkReponse
        if(this.state.success === 'true'){
           checkReponse = <div class="form-success">
                            <i class="material-icons transaction-icon">done</i>
                            <p>{this.state.successMsg}</p>
                       </div>
        } else if(this.state.success === 'false'){
          checkReponse =   <div className='form-error'>
                                <i class="material-icons transaction-icon">error_outline</i>
                                <p>{this.state.submitError}</p>
                            </div>

         } else {
             checkReponse = <p></p>
         }
        return(
            <div className='test-container'>
                <div className='transactions-container'>
                    
                    <div className='form-container card'>
                    <p className='header title'>Create a Transaction</p>  
                        <div className='creation'>
                            <div className='row-container'>
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
                                            selected={this.state.choseDate ? this.state.date : null}
                                        />
                                    </div>
                                    <div className='radioButtons switch-field'>
                                        <div className=" form-sub-title x">Transaction Type</div>
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
                                <div className='transactions-second-row'>
                                    <div className='display-container'>
                                        {(Object.keys(this.state.tags)).length === 0 || this.state.tags === null? (
                                            <div>
                                                <div className='display-title'>
                                                  <p className='form-sub-title display-name'>Please select a Coin!</p>
                                                </div>
                                                <p className='display-label'><strong>Symbol:</strong> {this.state.tags.symbol}</p>
                                                <p className='display-label'><strong>Quantity:</strong> {numberWithCommas(this.state.amount)}</p>
                                                <p className='display-label'><strong>Date:</strong> {this.state.displayDate}</p>
                                                <p className='display-label'><strong>Value on this date:</strong> {formatter.format(this.state.displayValue)}</p>
                                                <p className='display-label underline-value'><strong>Total Transaction Value:</strong> </p>
                                                <p className='display-total'>{formatter.format(this.state.amount * this.state.displayValue)}</p>
                                            </div>
                                        ): (
                                            <div>
                                                <div className='display-title'>
                                                    <img className='display-img' src={require(`../../../node_modules/cryptocurrency-icons/32/color/${this.state.tags.symbol.toLowerCase()}.png`)} />
                                                    <p className='form-sub-title display-name'>{this.state.tags.name}</p>   
                                                </div>
                                                <p className='display-label'><strong>Symbol:</strong> {this.state.tags.symbol}</p>
                                                <p className='display-label'><strong>Quantity:</strong> {numberWithCommas(this.state.amount)}</p>
                                                <p className='display-label'><strong>Date:</strong> {this.state.displayDate}</p>
                                                <p className='display-label'><strong>Value on this date:</strong> {formatter.format(this.state.displayValue)}</p>
                                                <p className='display-label underline-value'><strong>Total Transaction Value:</strong> </p>
                                                <p className='display-total'>{formatter.format(this.state.amount * this.state.displayValue)}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='Button-container'>
                                <Button variant="contained" className='display-button' onClick={this.handleSubmit} color="primary">submit</Button>
                            </div>

                            <div>
                                {checkReponse}
  
                            </div>
                        </div>

                    </div>
                    {this.props.portfolio === undefined ? (
                        <Transactiontable
                            userId={this.props.userId}
                            deleteRecord={this.deleteRecord} />
                    ):(
                        <Transactiontable
                            userId={this.props.userId}
                            deleteRecord={this.deleteRecord}
                            transactions={this.props.portfolio.transactions}
                            newTransaction={this.state.recentTransaction}
                        />

                    )}
                </div>
            </div>
        )
    }
}

export default Transactions