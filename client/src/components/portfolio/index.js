import React from 'react';
import './index.css'
import DonutGraph from '../donutGraph/index'


class Portfolio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            portfolio: {}
        }
    }
    componentDidMount(){
        this.timer = setInterval(() =>{
            if(this.props.portfolio){
                clearInterval(this.timer)
                this.timer=null
                this.setState({portfolio: this.props.portfolio}) 
                this.setState({loading:false})
            }
        },75)
    }

    render(){
        //change integers into money format
        const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
        });

        const portfolio = this.state.portfolio

        let balance;
        if(this.state.loading){
            balance = <h1 className='loading'>Loading...</h1>
         } else {
              balance = <h1>Portfolio Balance: {formatter.format(portfolio.balance.usd)}</h1>
         }

        return(
            <div>
                {/* {
                Object.keys(this.props.portfolio).map(function(key,index) {
                    return <div> Key: {key} Value: {this.props.portfolio[key]}</div>
                }, this)
                } */}
                {balance}
                <DonutGraph
                    data={portfolio}
                />
            </div>
        )
    }
}

export default Portfolio;