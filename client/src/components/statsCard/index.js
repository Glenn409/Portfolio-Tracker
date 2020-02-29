import React from 'react'
import './index.css'
import moment from 'moment'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import CircularProgress from '@material-ui/core/CircularProgress';

am4core.useTheme(am4themes_animated);

class StatsCard extends React.Component{
    constructor(){
        super()
        this.state ={
            coin: '',
            index:0,
            loading:true,
            return: 0,
            graphData: [],
        }
    }
    componentDidMount(){
        this.timer = setInterval(() =>{
            if(this.props.coin !== undefined || this.props.coin !==''){
                clearInterval(this.timer)
                this.timer=null
                this.setState({graphData: this.props.graphData})
                this.setState({coin: this.props.coin})
                this.setState({index: this.props.index})
                this.createGraph()
            }
        },100)
    }
    componentWillReceiveProps(prop){

        if(prop.coin === undefined || prop.coin ===""){
        }else {
            this.setState({graphData: prop.graphData})
            this.setState({coin: prop.coin},()=>{
                this.createGraph()
                this.setState({loading:false})
            })
        }

    }
    createGraph(){
        let chart = am4core.create("chartdiv2", am4charts.XYChart);
        let graphData = this.state.graphData
        let data =[]

        for(let i = 0; i < graphData[`${this.state.coin}`].length; i++){
            let close = graphData[`${this.state.coin}`][i].close
            let time = (moment.unix(graphData[`${this.state.coin}`][i].time).format("MM-DD-YYYY"))
            let obj ={
                'date': time,
                'value': close
            } 
            data.push(obj)
        }

        chart.data = data

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        
   
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = `${this.state.coin} `+'${value}'
        series.strokeWidth = 2;
        series.minBulletDistance = 15;
        valueAxis.paddingRight = 10
        valueAxis.fill= '#344052'
        series.fillOpacity = 0.3;
 
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";
        series.tooltip.background.fillOpacity = 1;
        

        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 3;
        
        let bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;
        
        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;
        
        chart.logo.height = -5000;
        this.chart=chart;
    }
    componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
    render(){
        // console.log(this.props)
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
    });
        // console.log(this.state)
        return(
            <div className='statsCard-content'>
                <div id='chartdiv2'></div>
            </div>
        )
    }
}

export default StatsCard