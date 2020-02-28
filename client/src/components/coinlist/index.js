import React from 'react'
import './index.css'

class Coinlist extends React.Component{
    constructor(){
        super()
        this.state = {
            coinlist: [],
            loading: true
        }
    }
    componentDidMount(){
        this.timer = setInterval(() =>{
            if(this.props.portfolio.coinInfo){
                clearInterval(this.timer)
                this.timer=null
                this.props.portfolio.coinInfo.map(coin =>{  
                    this.state.coinlist.push(coin)
                })
                this.setState({loading:false})
            }
        },75)
    }
    getDailyTickers(coin){
            if(this.props.historicalData){
                let previousNum =(this.props.historicalData[`${coin.symbol}`][this.props.historicalData[`${coin.symbol}`].length -2].close)
                if(previousNum < coin.usdprice){
                        let increase = coin.usdprice - previousNum 
                        increase = (increase/previousNum) * 100
                    return <p className='positive daily'>{`+ ${increase.toFixed(2)}%`}<i className="material-icons">arrow_drop_up</i></p>
                } else {
                    let decrease = previousNum - coin.usdprice
                    decrease = (decrease/previousNum) * 100
                    return <p className='negative daily' >{`- ${decrease.toFixed(2)}%`}<i className="material-icons">arrow_drop_down</i></p>
                }
            }
    }
    getWeekyTickers(coin){
        if(this.props.historicalData){
            let previousNum =(this.props.historicalData[`${coin.symbol}`][this.props.historicalData[`${coin.symbol}`].length - 8].close)
            if(previousNum < coin.usdprice){
                    let increase = coin.usdprice - previousNum 
                    increase = (increase/previousNum) * 100
                return <p className='positive weekly'>{`+ ${increase.toFixed(2)}%`}<i className="material-icons">arrow_drop_up</i></p>
            } else {
                let decrease = previousNum - coin.usdprice
                decrease = (decrease/previousNum) * 100
                return <p className='negative weekly' >{`- ${decrease.toFixed(2)}%`}<i className="material-icons">arrow_drop_down</i></p>
            }
        }
    }

    render(){
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
    });
        let coinlist = this.state.coinlist

        return (
            <div className='coinList-container'>
                <div className='coinList-headers'>
                    <p className='header name'>Name</p>
                    <p className='header quantity'>Quantity</p>
                    <p className='header price'>Price</p>
                    <p className='header coin-value'>Market Value</p>
                    <p className='header daily'>Change (24h)</p>
                    <p className='header weekly'>Change (7d)</p>
                </div>
                <div className='coinList-data'>
                    {coinlist.map(coin =>{
                       return  <div className='data-row'>
                                 <p className='name'><img src={require(`../../../node_modules/cryptocurrency-icons/32/color/${coin.symbol.toLowerCase()}.png`)} />{coin.name}</p>
                                 <p className='quantity'>{this.props.portfolio.quantity[`${coin.symbol.toLowerCase()}`]}</p>
                                 <p className='price'>{formatter.format(coin.usdprice)}</p>
                                 <p className='coin-value'>{formatter.format(coin.usdprice * this.props.portfolio.quantity[`${coin.symbol.toLowerCase()}`])}</p>
                                      {this.getDailyTickers(coin)}
                                      {this.getWeekyTickers(coin)}
                                </div>
                    })}
                    
                </div>
            </div>
        )
    }
}
export default Coinlist