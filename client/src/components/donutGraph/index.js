import React from 'react'
import {Pie} from 'react-chartjs-2';
import './index.css'
import 'chart.piecelabel.js';

let TestbackgroundColors = ['#F2626B','#FEBA4F','#FFEA7F', '#89E077','#83C3FF','#C381FD']
let testHoverColors = ['#E30022','#FF8B00','#FEE72F','#03C03C','#1F75FE','#662B7E']
let backgroundColors = []
let hoverBackgroundColors = []
for(let i = 0; i < (TestbackgroundColors.length)*5; i++){
    backgroundColors.push(TestbackgroundColors[i])
}
for(let i = 0; i < (testHoverColors.length)*5; i++){
    hoverBackgroundColors.push(testHoverColors[i])
}

class donutGraph extends React.Component{
    constructor(){
        super();
        this.state = {
            loading:true,
            portfolio: {},
            graphData: {
                labels: [],
                datasets: []
            }
    }
}
    componentDidMount(){
        this.timer = setInterval(() =>{
            if(this.props.data !== {}){

                clearInterval(this.timer)
                this.timer = null
                this.setState({portfolio: this.props.data}) 
                this.setState({loading:false})

                const portfolio = this.state.portfolio
                const graphData = this.state.graphData
                let data = []
                // let labels = []
                let obj = {}


                for(let i = 0; i < portfolio.coinInfo.length; i++){
                    graphData.labels.push(portfolio.coinInfo[i][`name`])
                    let num = (portfolio.coinInfo[i][`coinUSDBalance`].toFixed(2))
                    data.push(num)
                }
                obj.label = 'Portfolio'
                obj.backgroundColor = backgroundColors
                obj.hoverBackgroundColor = hoverBackgroundColors
                obj.data = data
                graphData.datasets.push(obj)
                this.setState({loading:false})

            }
        },100)

    }

    render(){
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
    });
        return(
            <div className={'portfolio-card'}>
                <Pie
                    data={this.state.graphData}
                    options={{
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem,data){
                                    let value = data.datasets[0].data[tooltipItem.index]
                                    return data.labels[tooltipItem.index] + ": " + formatter.format(value)
                                },
                            }
                        },
                        responsive:true,
                        maintainAspectRatio: false,
                        slices:{
                            2: {offsets:0.9}
                        },
                        title:{
                            display:true,
                            text:'Portfolio Breakdown',
                            fontSize:25,
                            fontColor: '#333'
                        },
                        legend: {
                            display:true,
                            position:'right',
                            fontSize:18,
                            labels: {
                                fontSize:18,
                                fontFamily:'Source Sans Pro',
                            }
                        },
                        pieceLabel: {
                            render: 'percentage',
                            position: 'outside',
                            fontSize: 18,
                            showActualPercentages: true,
                            fontFamily:'Source Sans Pro',
                            textMargin:8,
                            segment:true,
                         },
                    }}
                />

            </div>
        )
    }
}
export default donutGraph;