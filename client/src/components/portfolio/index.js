import React from 'react';
import './index.css'
import DonutGraph from '../donutGraph/index'
import PerformanceGraph from '../performanceGraph/index'
import Coinlist from '../coinlist/index'
import StatsCard from '../statsCard/index'
class Portfolio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            portfolio: {},
            graphIndex:0,
            graphData: [],
            coinlist: []
        }
        this.handleGraph = this.handleGraph.bind(this)
    }
    componentDidMount(){
        this.timer = setInterval(() =>{
            if(this.props.portfolio){
                clearInterval(this.timer)
                this.timer=null
                this.setState({portfolio: this.props.portfolio}) 
                this.setState({graphData: this.props.thirtyDayGraphData})
                this.setState({coinlist:  Object.keys(this.state.graphData)})
                this.setState({loading:false})
            }
        },75)
    }

    handleGraph(direction){
        // console.log(this.state.coinlist)

        if(direction === 'left'){
            if(this.state.graphIndex !== 0){
                this.setState({graphIndex: this.state.graphIndex - 1})
            }
        } else if(direction ==='right'){
            if(this.state.graphIndex !== this.state.coinlist.length -1){
                this.setState({graphIndex: this.state.graphIndex + 1}) 
         }
        }
    }
    render(){
        //change integers into money format
        const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
        });
        // console.log(this.props)
        const portfolio = this.state.portfolio
        let balance;
        if(this.state.loading){
            balance = <h1 className='loading'>Loading...</h1>
         } else {
              balance = <h1>Portfolio Balance: {formatter.format(portfolio.balance.usd)}</h1>
         }
        return(
            <div className='test-container'>
            <div className='portfolio-container'>
                <div className='card'>
                    <div className='header'>
                        <p className='title'>Portfolio Performance </p>
                        <p className='title-sub'>Balance:  {formatter.format(this.props.portfolio.balance.usd)}</p>

                    </div>
                    <PerformanceGraph 
                        portfolio={portfolio}
                        historicalData={this.props.historicalData}
                    />
                </div>

                <div className='second-row'>
                    <div className='card stats'>
                        <p className='title stats-title'> 
                            <div className='fixme'>
                                <i className="material-icons stats-icon" onClick={e=> { e.preventDefault(); this.handleGraph('left')}}>arrow_back</i>{this.state.coinlist[this.state.graphIndex]}<i class="material-icons stats-icon" onClick={e=> { e.preventDefault();this.handleGraph('right')}}>arrow_forward</i>
                            </div>
                            <p className='small-title'>Monthly Market Value</p>
                        </p>
                        <StatsCard 
                            index={this.state.graphIndex}
                            portfolio={portfolio}
                            coin={this.state.coinlist[this.state.graphIndex]}
                            graphData={this.props.thirtyDayGraphData}

                        />
                    </div>
                    <div className='donut-graph-container card'>
                        <p className='title donut-title'>Portfolio Breakdown</p>
                        <DonutGraph
                            data={portfolio}
                        />
                    </div>
                </div>

                <div className='third-row card'>
                    <Coinlist 
                        portfolio={portfolio}
                        historicalData={this.props.historicalData}
                    />
                    {/* 
                    <Collapsible trigger="Start here">
                        <p>This is the collapsible content. It can be any element or React component you like.</p>
                        <p>It can even be another Collapsible component. Check out the next section!</p>
                    </Collapsible> */}
                </div>
            </div>
        </div>
        )
    }
}

export default Portfolio;

