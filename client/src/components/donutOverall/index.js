import React from 'react'
import {Pie, Doughnut} from 'react-chartjs-2';
import {fetchPrices} from '../fetchFunctions'


class donutOverall extends React.Component{
    constructor(){
        super();
        this.state = {
            loading:false,
            graphInfo:{},
            labels: [],
            datasets: []
    }
}
    componentDidMount(){
        this.timer = setInterval(() =>{
            if(this.props.data !== {}){
                clearInterval(this.timer)
                this.timer = null
                fetchPrices(this.props.data).then(res =>{
                    const data = res.prices.dataArray
                    console.log(data)
                    let stateObj = {
                        Label: 'Coins',
                        backgroundColor:['#29AB47','#F48024','#3C4146'],
                        data: []
                    }
                    for(let i = 0; i < data.length; i++){
                        this.state.labels.push(data[i].symbol)
                        stateObj.data.push(parseInt(data[i].usdprice))
                    }
                    this.setState({datasets: [stateObj]})
                })
            }
        },1000)

    }
    updateGraphData(){

    }
    render(){
        console.log(this.state.datasets)
        const graphData = {
            labels: this.state.labels,
            datasets: this.state.datasets
        }
        console.log(graphData)
        return(
            <div>
                <Pie 
                    data={graphData}
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
                
                {/* <Doughnut 
                    data={testData}
                    options={{
                        title:{
                            display:true,
                            text:'TESTING TEXT TITLE',
                            fontSize:20
                        },
                        legend: {
                            display:true,
                            position:'right'
                        }
                    }}
                /> */}
            </div>
        )
    }
}
export default donutOverall;