import React from 'react'
import {Pie} from 'react-chartjs-2';
import './index.css'


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
                console.log('---')
                console.log(this.props.data)
                clearInterval(this.timer)
                this.timer = null
                this.setState({portfolio: this.props.data}) 
                this.setState({loading:false})

                const portfolio = this.state.portfolio
                const graphData = this.state.graphData
                let data = []
                let labels = []
                let obj = {}
                for(let i = 0; i < portfolio.coinInfo.length; i++){
                    graphData.labels.push(portfolio.coinInfo[i][`name`])
                    let num = parseFloat(portfolio.coinInfo[i][`coinUSDBalance`].toFixed(2))
                    data.push(num)
                }
                obj.label = 'Portfolio'
                obj.backgroundColor = [
                    '#B21F00',
                    '#C9DE00'
                ]
                obj.data = data
                graphData.datasets.push(obj)
                this.setState({loading:false})

            }
        },100)

    }

    render(){
        
        return(
            <div className={'portfolio-card'}>
                <Pie 
                    data={this.state.graphData}
                    options={{
                        title:{
                            display:true,
                            text:'Portfolio Breakdown',
                            fontSize:25
                        },
                        legend: {
                            display:true,
                            position:'right'
                        }
                    }}
                />

            </div>
        )
    }
}
export default donutGraph;