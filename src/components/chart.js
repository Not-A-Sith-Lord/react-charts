import React, {Component} from 'react';
import { LineChart, Line ,Tooltip, XAxis, YAxis, CartesianGrid} from 'recharts';
import _ from 'lodash';

class Chart extends Component {
  constructor(props){
    super(props);

    this.state = {
      filterRange: {
        from: new Date("2015-01-02"),//2017/6/02
        to: new Date()
      }
    };
  }

  renderLines(lines){
    const colors = ['red', 'blue']
    let linesArray = [];
    lines.forEach((line,i)=>{
      linesArray.push(
        <Line className='animate-snake'
        key={line.toLowerCase()}
        type='monotone'
        dataKey = {line.toLowerCase()}
        stroke = {colors[i]}
        dot={''}
        strokeWidth={2}
        activeDot={{ r: 6 }}
        // strokeDasharray="20 2"
         />);
    });
    return linesArray;
  }

  changeRange(from){
    console.log(from)
    this.setState({filterRange:{from:new Date(from)}})
  }


  render(){
    let lines = {};
    let chartData = [];

    var btc = this.props.data.BTC.filter(el=> new Date(el.date) > this.state.filterRange.from);
    var eth = this.props.data.ETH.filter(el=> new Date(el.date) > this.state.filterRange.from);
    console.log(btc,eth)
    chartData = btc.map( b =>{
      var e = eth.find( e => e.date === b.date)
      return Object.assign({},b,e)
    })

    var prevVal = null;
    chartData.forEach(el=> (!el.eth) ? el.eth = prevVal : prevVal = el.eth)

    return(
      <div>
        <button onClick={()=>this.changeRange("2017-06-01")}>MONTH</button>
        <button onClick={()=>this.changeRange("2017-01-01")}>2017</button>
        <button onClick={()=>this.changeRange("2010-01-01")}>ALL</button>
        <LineChart width={1000} height={600} data={chartData}>
          {this.renderLines(this.props.selectedCoins)}
          <Tooltip />
          <XAxis dataKey='date' tickFormatter={formatTick} minTickGapNumber={30}/>
          <YAxis />
          <CartesianGrid strokeDasharray="2 3"/>

        </LineChart>
      </div>
    );
  }
}

export default Chart;


function formatTick(str){
  var d = new Date(str);
  var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
  return str.substring(2,4) + '-' + monthNames[d.getMonth()];
}
