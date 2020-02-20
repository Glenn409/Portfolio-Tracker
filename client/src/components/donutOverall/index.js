import React from 'react'
import {Pie, Doughnut} from 'react-chartjs-2';
import axios from 'axios';

const testData = {
    labels: ['test','teatsdf'],
    datasets: [{
        label:'Overall Coins',
        backgroundColor:['#c9de00'],
        data: [30,30]
    },
]
}

class donutOverall extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }
    componentWillMount(){
        axios.post(`/api/getUSD`,
        {
            userPortfolio: this.props.data
        }).then(res =>{
            console.log(res)
        })
    }
    
    render(){
        console.log(this.props.data)
        return(
            <div>
                <div>
                {
                Object.keys(this.props.data).map(function(key,index) {
                    return <div key={index}> Key: {key} Value: {this.props.data[key]}</div>
                }, this)
                }
                </div>
                <Pie 
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
                />
                
                <Doughnut 
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
                />
            </div>
        )
    }
}
export default donutOverall;