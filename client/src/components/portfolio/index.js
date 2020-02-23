import React from 'react';
import './index.css'
import DonutGraph from '../donutGraph/index'
import PerformanceGraph from '../performanceGraph/index'
import Coinlist from '../coinlist/index'
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
            <div className='portfolio-container'>
                {/* {balance} */}
                <div className='card'>
                    <PerformanceGraph 
                        portfolio={portfolio}
                        historicalData={this.props.historicalData}
                    />
                </div>

                <div class='second-row'>
                    <div className='card stats'>
                        <h1>Stats Card</h1>
                    </div>
                    <div className='donut-graph-container card'>
                        <DonutGraph
                            data={portfolio}
                        />
                    </div>
                </div>

                <div className='third-row card'>
                    <Coinlist 
                        portfoio={portfolio}
                    />
                    {/* <div className='coinList-container'>
                        <div className='coinList-headers'>
                            <p className='name'>Name</p>
                            <p className='price'>Price</p>
                        </div>
                    <Collapsible trigger="Start here">
                        <p>This is the collapsible content. It can be any element or React component you like.</p>
                        <p>It can even be another Collapsible component. Check out the next section!</p>
                    </Collapsible>

                    </div> */}
                </div>
            </div>
        )
    }
}

export default Portfolio;