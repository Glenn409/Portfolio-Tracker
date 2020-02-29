import React from 'react'
import {Line} from 'react-chartjs-2'
import './index.css'
import moment from 'moment'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import CircularProgress from '@material-ui/core/CircularProgress';
import { sort } from '@amcharts/amcharts4/.internal/core/utils/Iterator';
am4core.useTheme(am4themes_animated);

class performanceGraph extends React.Component {
    constructor(){
        super()
        this.state = {
            loading:true,
            portfolio: {},
            dailyPortfolio: [],
            graphData: {
              labels: [],
              datasets: [
                {
                  data: []
              }
            ]
            }
        }
    }

    componentDidMount(){
      this.timer = setInterval(() =>{
        if(this.props.portfolio.transactions !== {} && this.props.historicalData !== {}){
          clearInterval(this.timer)
          this.timer = null
          this.setState({portfolio: this.props.portfolio})
          const transactions = this.state.portfolio.transactions

          this.createOverallBalance()
          
          let chart = am4core.create("chartdiv", am4charts.XYChart);  
          chart.paddingRight = 10;

          let data = [];
          //sets up porfolio balance in main graph
          // console.log(this.state)
          let arrayOfDailyBalance = []
          for(let i = 0; i < this.state.dailyPortfolio.length ; i++){
            const userCoins = Object.keys(this.state.dailyPortfolio[i].portfolio)
            let balance = 0;

            for(let x = 0; x < userCoins.length; x++){
              balance += this.state.dailyPortfolio[i].portfolio[`${userCoins[x]}`].balance
            }
            arrayOfDailyBalance.push(balance)
          }
          arrayOfDailyBalance.push(this.state.portfolio.balance.usd)

          // console.log(this.state.graphData.labels)
          for (let i = 0; i < this.state.graphData.labels.length; i++) {
            data.push({ date: this.state.graphData.labels[i], value: this.state.graphData.datasets[0].data[i].toFixed(0),value2: arrayOfDailyBalance[i].toFixed(2)})
          }
          chart.data = data;
          let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
          dateAxis.renderer.grid.template.location = 0;
          dateAxis.renderer.grid.template.disabled = true;
          dateAxis.minZoomCount = 5;
          
        
          dateAxis.groupData = true;
          dateAxis.groupCount = 500;
          
          let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.paddingRight = 10
          valueAxis.fill= '#344052'
          let series = chart.series.push(new am4charts.LineSeries());
          series.dataFields.dateX = "date";
          series.dataFields.valueY = "value";
          series.tooltipText = "Cost Basis: ${valueY}";
          series.strokeWidth = 3;
          series.stroke='#FEBA4F'
          series.strokeDasharray = '4'
          series.tooltip.autoTextColor = false;
          series.tooltip.label.fill = am4core.color("#000000");
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

          chart.cursor = new am4charts.XYCursor();
          chart.cursor.xAxis = dateAxis;        

          chart.logo.height = -5000;
          this.chart = chart;
          
        }
      },200)
    }
    componentWillUnmount(){
      if (this.chart) {
        this.chart.dispose();
      }
    }

    createOverallBalance() {

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
      let newTimeFrame = []
      timeFrame.map(time =>{
        newTimeFrame.push(moment(time))
      })
      let sortedArray = newTimeFrame.sort((a, b) => a.valueOf() - b.valueOf())
       timeFrame = []
      sortedArray.map(time =>{
        timeFrame.push(moment(time).format('MM/DD/YYYY'))
      })
      let costBasis = 0;
      let quantity = {}
      //generates our costbasic and portfoli quantities before we enter our graph timeframe

      for(let i = 0; i < transactions.length; i++){
        if(!timeFrame.includes(moment.unix(transactions[i].purchaseDate).format('MM/DD/YYYY'))){
          let coin = transactions[i].coin.toUpperCase()
          for(let x = 0; x< this.props.historicalData[coin].length;x++){
            if(moment.unix(this.props.historicalData[coin][x].time).format('MM/DD/YYYY') === moment.unix(transactions[i].purchaseDate).format('MM/DD/YYYY')){
              let avg = (this.props.historicalData[coin][x].high + this.props.historicalData[coin][x].low) / 2
              costBasis += ( avg * parseInt(transactions[i].quantity))
              if(!quantity[`${transactions[i].coin}`]){
                quantity[`${transactions[i].coin}`] = 0
              }
              quantity[`${transactions[i].coin}`] += parseFloat(transactions[i].quantity)
            }
          }
        }
      }

      let balances = {}
      for(let i = 0; i < timeFrame.length; i++){
        let dataObj = {}
        let newObj = {}
        for(let y = 0; y < transactions.length; y++){
          if(timeFrame[i] === moment.unix(transactions[y].purchaseDate).format('MM/DD/YYYY') ||timeFrame[i] === moment.unix(transactions[y].sellDate).format('MM/DD/YYYY')){
            let coin = transactions[y].coin.toUpperCase()
            for(let x = 0; x < this.props.historicalData[coin].length;x++){
              if(moment.unix(this.props.historicalData[coin][x].time).format('MM/DD/YYYY') === moment.unix(transactions[y].purchaseDate).format('MM/DD/YYYY') || moment.unix(this.props.historicalData[coin][x].time).format('MM/DD/YYYY') === moment.unix(transactions[y].sellDate).format('MM/DD/YYYY') ){
                let avg = (this.props.historicalData[coin][x].high + this.props.historicalData[coin][x].low) / 2
                costBasis += (avg * transactions[y].quantity)

                if(!quantity[`${transactions[y].coin}`]){
                  quantity[`${transactions[y].coin}`] = 0
                  
                }
                if(!balances[`${transactions[y].coin}`]){
                  balances [`${transactions[y].coin}`] = 0
                }
            
                balances[`${transactions[y].coin}`] += parseFloat(avg * transactions[y].quantity)
                quantity[`${transactions[y].coin}`] += parseFloat(transactions[y].quantity)
             } 
            }
          }
           else {
            let coin = transactions[y].coin.toUpperCase()
            for(let x = 0; x< this.props.historicalData[coin].length;x++){
              if(moment.unix(this.props.historicalData[coin][x].time).format('MM/DD/YYYY') === timeFrame[i]){
                if(!balances[`${transactions[y].coin}`]){
                  balances [`${transactions[y].coin}`] = 0
                }

                let avg = (this.props.historicalData[coin][x].high + this.props.historicalData[coin][x].low) / 2
                balances[`${transactions[y].coin}`] = avg * quantity[`${transactions[y].coin}`]
              }
            }
          }

        }
                for (let [key, value] of Object.entries(quantity)) {
          newObj[`${key}`] = {
            quantity: value,
            balance: balances[`${key}`]
          }
        }
        
        dataObj.costBasis = costBasis
        dataObj.portfolio = newObj
        dataObj.date = timeFrame[i]
        data.push(dataObj)
      }

      this.setState({dailyPortfolio: data})
      data.map(data =>{
        this.state.graphData.labels.push(data.date)
        this.state.graphData.datasets[0].data.push(data.costBasis)
      })
      this.setState({loading:false})
    }

    render() {
      return (
        <div>
          {this.state.loading ? (
              <div className='loading-circle'>
                <CircularProgress loadsize={100} />
              </div>
          ): (
            <div className='performgraph'>
              <div id='chartdiv'></div>
            </div>
          )}
        </div>

      );
    }
  }
export default performanceGraph