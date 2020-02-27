import React from 'react'
import './index.css'
import {deleteTransaction} from '../fetchFunctions'

class TransactionTable extends React.Component{
    constructor(){
        super()
        this.state = {
            loading:true,
            transactions: [],
            recentTransactions: [],
            update: false
        }
        this.handleTransaction = this.handleTransaction.bind(this)
    }
    componentDidMount(){
    this.timer = setInterval(() =>{
        if(this.props.transactions){
            clearInterval(this.timer)
            this.timer=null
            this.props.transactions.map(coin =>{  
                this.state.transactions.push(coin)
            })
            this.setState({loading:false})
        }
    },75)
    }

    handleTransaction(id,userId){
        deleteTransaction(id).then(res =>{
            this.props.deleteRecord(userId)
            this.setState({update: true})
        })
    }

    render(){
        function timeConverter(coin){
            let decider;
            if(coin.sellDate === null){
                decider = coin.purchaseDate
            } else decider = coin.sellDate
            var a = new Date(decider * 1000);
            var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var time = month + '/' + date + '/' + year 
            return time;
          }
         
        return(
            <div className='coinList-container trans-table card'>
                <p className='header y'>Transactions List</p>
                <div className='coin-headers'>
                    <p className='header subheader coin'>Coin</p>
                    <p className='header subheader type'>Type</p>
                    <p className='header subheader date'>Date</p>
                    <p className='header subheader quantity'>Quantity</p>
                    <p className='header subheader delete-record'></p>
                </div>

                <div className='coinList-data'>
                    {this.props.transactions.map(coin =>{
                        return this.state.transactions.length === 0 ? 
                            <p className='data-row' p>Currently no Transactions!</p>
                            :
                            <div className='data-row'>
                                <p className='coin'><img className={'coin-img'} src={require(`../../../node_modules/cryptocurrency-icons/32/color/${coin.coin}.png`)} />{coin.name}</p>
                                <p className='type'>{coin.transaction_type.toUpperCase()}</p>
                                <p className='date'>{timeConverter(coin)}</p>
                                <p className='row-quantity'>{coin.quantity}</p>
                                <p className='delete-record delete-header'><i className="material-icons"  style={{color:'red'}} onClick={() => this.handleTransaction(coin.id,coin.UserId)}>close</i></p>
                            </div>
                    })}

                </div>
            </div>
        )
    }
}
export default TransactionTable