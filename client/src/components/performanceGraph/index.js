import React from 'react'
import {Line} from 'react-chartjs-2'
import './index.css'
import moment from 'moment'

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
              labels: ['test'],
              datasets: [
                      {
                label: 'label',
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
              }
            ]
            }
        }
    }

    componentDidMount(){
      this.timer = setInterval(() =>{
        if(this.props.portfolio !== {} && this.props.historicalData !== {}){
          clearInterval(this.timer)
          this.timer = null
          this.setState({portfolio: this.props.portfolio})
          const transactions = this.state.portfolio.transactions
          // console.log(transactions)
          this.createOverallBalance()
          
          // for(let i = 0; i < historicalData.length; i++){
          //   console.log(historicalData[i])
          // }

          
        }
      },100)
    }
    //returns earliest date so we  can set up labels
    createOverallBalance() {

      let labels = []
      let data = []
      const transactions = this.state.portfolio.transactions
      let dates = transactions.map(time => moment(time.purchaseDate))
      let farthestDate = moment.unix(moment.min(dates))
      let day = moment().diff(farthestDate,'days')
      let startingDate;
    
      if(day > 365){
        startingDate = moment().subtract(1 ,'years')
      } else {
        startingDate = farthestDate
      }
      let count = 0;
      let timeFrame = []

      const coinList = Object.keys(this.props.historicalData)


      for(let i = 0; i < coinList.length; i++){
        for(let x = 0; x < this.props.historicalData[coinList[i]].length;x++){
          let historyTime = moment.unix(this.props.historicalData[coinList[i]][x].time)
          if(!historyTime.isBefore(startingDate)){
            if(timeFrame.includes(historyTime.format('MM/DD/YYYY')) === false){

              timeFrame.push(historyTime.format('MM/DD/YYYY'))
            }
          }
        }
      }

      let costBasis = 0;
      let quantity = {}
      //generates our costbasic and portfoli quantities before we enter our graph timeframe
      for(let i = 0; i < transactions.length; i++){
        if(!timeFrame.includes(moment.unix(transactions[i].purchaseDate).format('MM/DD/YYYY'))){
          let coin = transactions[i].coin.toUpperCase()
          for(let x = 0; x< this.props.historicalData[coin].length;x++){
            if(moment.unix(this.props.historicalData[coin][x].time).format('MM/DD/YYYY') === moment.unix(transactions[i].purchaseDate).format('MM/DD/YYYY')){
              let avg = (this.props.historicalData[coin][i].high + this.props.historicalData[coin][i].low) / 2
              
              costBasis += ( avg * transactions[i].quantity)
              if(!quantity[`${transactions[i].coin}`]){
                quantity[`${transactions[i].coin}`] = 0
              }
              quantity[`${transactions[i].coin}`] += parseFloat(transactions[i].quantity)
            }
          }
        }
      }

      let balances = {}
      timeFrame.map(time =>{
        let dataObj = {}
        let newObj = {}
        let newBalance = {}
        transactions.map(transaction =>{
          if(time === moment.unix(transaction.purchaseDate).format('MM/DD/YYYY')){
            let coin = transaction.coin.toUpperCase()
            for(let x = 0; x< this.props.historicalData[coin].length;x++){
              if(moment.unix(this.props.historicalData[coin][x].time).format('MM/DD/YYYY') === moment.unix(transaction.purchaseDate).format('MM/DD/YYYY')){
                let avg = (this.props.historicalData[coin][x].high + this.props.historicalData[coin][x].low) / 2
                costBasis += (avg * transaction.quantity)

                if(!quantity[`${transaction.coin}`]){
                  quantity[`${transaction.coin}`] = 0
                  
                }
                if(!balances[`${transaction.coin}`]){
                  balances [`${transaction.coin}`] = 0
                }
                balances[`${transaction.coin}`] += parseFloat(avg * transaction.quantity)
                quantity[`${transaction.coin}`] += parseFloat(transaction.quantity)
             } 
            }
          } else {
            let coin = transaction.coin.toUpperCase()
            for(let x = 0; x< this.props.historicalData[coin].length;x++){
              if(moment.unix(this.props.historicalData[coin][x].time).format('MM/DD/YYYY') === time){
                if(!balances[`${transaction.coin}`]){
                  balances [`${transaction.coin}`] = 0
                }
                let avg = (this.props.historicalData[coin][x].high + this.props.historicalData[coin][x].low) / 2
                balances[`${transaction.coin}`] = avg * quantity[`${transaction.coin}`]
              }
            }
          }

        })
        // for (let [key,value] of Object.entries(balances)){
        //   console.log(`${key}: ${value}`)
        // }
        for (let [key, value] of Object.entries(quantity)) {
          newObj[`${key}`] = {
            quantity: value,
            balance: balances[`${key}`]
          }
        }
        
        dataObj.costBasis = costBasis
        dataObj.portfolio = newObj
        dataObj.date = time

        data.push(dataObj)
      })
      console.log(data)
      let currentDate = moment().format('MM-DD-YYYY')
      labels.push(currentDate)

    }

    render() {
      // console.log(this.state)
      // console.log(this.props)
      // console.log('-------')
      return (
        <div className='performgraph'>
          <Line
            data={this.state.graphData}
            options={{
                
              title:{
                display:true,
                text:'Portfolio performance',
                fontSize:30,
                fontColor: 'black'
              },
              scales:{
                xAxes: [{
                  ticks: {
                    fontColor:'Black'
                  }
                }],
                yAxes: [{
                  ticks:{
                    fontColor:'Black'
                  }
                }]
              },
              legend:{
                display:false,
                position:'right'
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