import React from 'react'
import {Line} from 'react-chartjs-2'
import './index.css'



const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'label',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }
  
  //we will go through each transaction a user has
  //we will get the coin, quantity of the coin, and the date and the price at that date
  //retrieve monthly prices of that coin store then send it to dashboard and pass it down for use
class performanceGraph extends React.Component {
    constructor(){
        super()
        this.state = {
            loading:true,
            portfolio: {},
            graphData: {

            }
        }
    }

    componentDidMount(){
      this.timer = setInterval(() =>{
        if(this.props.portfolio !== {} && this.props.historicalData !== {}){
          clearInterval(this.timer)
          this.timer = null
          this.setState({portfolio: this.props.portfolio})
          const transactions = this.state.portfolio 
          console.log(transactions.transactions)

          // for(let i = 0; i < historicalData.length; i++){
          //   console.log(historicalData[i])
          // }

          
        }
      },100)
    }

    render() {
      console.log(this.state)
      return (
        <div className='performgraph'>
          <Line
            data={state}
            options={{
                
              title:{
                display:true,
                text:'Portfolio performance',
                fontSize:30,
                fontColor: 'black'
              },
              legend:{
                display:true,
                position:'right',
              }, 
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      );
    }
  }
export default performanceGraph