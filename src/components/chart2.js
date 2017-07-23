import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import moment from 'moment';


class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterRange: {
        from: new Date("2015-01-10"),//2017/6/02
        to: new Date()
      }
    };
  }

  changeRange(from){
    console.log(from)
    this.setState({filterRange:{from:new Date(from)}})
  }

  render(){
    console.log(this.props.chartData);
    let lines = [];
    this.props.selectedCoins.forEach((coin, i)=>{ //for each selected coin
      lines[i] = this.props.data[coin].filter((coinInfo)=>{  //save filtered arrays
        if (this.state.filterRange.from < new Date(coinInfo.date)){ //filter by date range that is selected
          return true;
        } else {
          return false;
        }
      });
    });
    // let arrayDates = [[],[]]
    // let arrayValues = [[],[]]
    let days = [],days1 = []
    lines[0] = lines[0].map((el)=>{
      days.push(Date(el.date))
      return {x: new Date(el.date), y:el.btc}
    })
    lines[1] = lines[1].map((el)=>{
      days1.push(Date(el.date))
      return {x: new Date(el.date), y:el.eth}
    })
    // lines.forEach((line,i)=>{
    //   line = line.map((el)=>{
    //     return {x: el.date, y:el.usd}
    //     // arrayDates[i].push(new Date(el.date))
    //     // arrayValues[i].push(el.usd)
    //   })
    // })

    while (lines[1].length <=lines[0].length)lines[1].unshift({x:null,y:0})


    // console.log(lines)
    let chartData = {
          // labels: arrayOfLabels,
          labels: days1,
          datasets: [{
              label: 'BTC',
              data: lines[0],
              fill:false,
              backgroundColor: '#d44d30',
              borderColor: '#d44d30',
              pointRadius: 0,
          },
          {
              label: 'ETH',
              type: 'line',
              fill: false,
              data: lines[1],
              backgroundColor: '#3170fc',
              borderColor: '#3170fc',
              borderWidth: 0,
              pointRadius: 0,
              pointHover: 0,

          }
        ]
    }

    return(
      <div>
        <button onClick={()=>this.changeRange("2017-06-01")}>MONTH</button>
        <button onClick={()=>this.changeRange("2017-01-01")}>2017</button>
        <button onClick={()=>this.changeRange("2010-01-01")}>ALL</button>

        <Line
          data={chartData}
          options={{
            responsive: true,
            title:{
                display:true,
                text:'Coindapt'
            },
            tooltips: {
                mode: 'nearest',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: false
            },
            scales: {
              xAxes: [{
    						type: "time",
    						time: {
    							format: 'MM/DD/YYYY HH:mm',
    							// round: 'day'
    							tooltipFormat: 'll HH:mm'
    						},
    					}
             ]
            }
          }}
        />
      </div>
    )
  }
}
export default Chart;
