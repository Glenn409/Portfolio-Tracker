import React from 'react'
import {Line} from 'react-chartjs-2'
import './index.css'
import moment from 'moment'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
// const state = {
//     labels: ['January', 'February', 'March',
//              'April', 'May'],
//     datasets: [
//       {
//         label: 'label',
//         fill: false,
//         lineTension: 0.5,
//         backgroundColor: 'rgba(75,192,192,1)',
//         borderColor: 'rgba(0,0,0,1)',
//         borderWidth: 2,
//         data: [65, 59, 80, 81, 56]
//       }
//     ]
//   }
  
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
              labels: [],
              datasets: [
                {
                  label: 'Cost Basis',
                  fill: false,
                  lineTension: 1,
                  borderDash: [10,10],
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'black',
                  borderWidth: 2,
                  data: []
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
          
          let chart = am4core.create("chartdiv", am4charts.XYChart);  
          chart.paddingRight = 10;

          let data = [];
          let test = 0;
          for (let i = 0; i < this.state.graphData.labels.length; i++) {
            test = Math.floor((Math.random() * 1000)+ 10000) 
            data.push({ date: this.state.graphData.labels[i], value: this.state.graphData.datasets[0].data[i].toFixed(0),value2:test});
          }
          
          chart.data = data;
          
          let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
          dateAxis.renderer.grid.template.location = 0;
          dateAxis.renderer.grid.template.disabled = true;
          dateAxis.minZoomCount = 5;
          
          
          
          // this makes the data to be grouped
          dateAxis.groupData = true;
          dateAxis.groupCount = 500;
          
          let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.paddingRight = 10
          valueAxis.fill= '#344052'
          let series = chart.series.push(new am4charts.LineSeries());
          series.dataFields.dateX = "date";
          series.dataFields.valueY = "value";
          series.tooltipText = "Cost Basis: ${valueY}";
          series.strokeWidth = 2;
          series.stroke='#FEBA4F'
          series.strokeDasharray = '4'
          series.tooltip.pointerOrientation = "vertical"
          series.tooltip.getFillFromObject = false;
          series.tooltip.background.fill= '#FEBA4F'
          series.tooltip.background.fillOpacity = 1;
          
          let series2 = chart.series.push(new am4charts.LineSeries())
          series2.dataFields.dateX = "date";
          series2.dataFields.valueY = "value2";
          series2.tooltipText = "Portfolio Balance: ${valueY}";
          series2.tooltip.pointerOrientation = "vertical";
          series2.tooltip.background.fillOpacity = 1;
          series2.strokeWidth = 2;
          series2.fillOpacity = 0.3;

          // series2.axisFIll.fill = '#344052'

          chart.cursor = new am4charts.XYCursor();
          chart.cursor.xAxis = dateAxis;
        
          

          chart.logo.height = -15;
          this.chart = chart;
          // for(let i = 0; i < historicalData.length; i++){
          //   console.log(historicalData[i])
          // }

          
        }
      },100)
    }
    componentWillUnmount(){
      if (this.chart) {
        this.chart.dispose();
      }
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
      // consokle.log(data)
      data.map(data =>{
        // console.log(data)
        this.state.graphData.labels.push(data.date)
        this.state.graphData.datasets[0].data.push(data.costBasis)
      })
      this.setState({loading:false})
      console.log(this.state)
      let currentDate = moment().format('MM-DD-YYYY')
      labels.push(currentDate)

    }

    render() {
      // console.log(this.state)
      // console.log(this.props)
      // console.log('-------')
      return (
        <div className='performgraph'>
          <div id='chartdiv'></div>
          {/* <Line className ='test'
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
          /> */}
        </div>
      );
    }
  }
export default performanceGraph