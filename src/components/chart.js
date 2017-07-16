import React, {Component} from 'react';
import { LineChart, Line ,Tooltip, XAxis, YAxis, CartesianGrid} from 'recharts';

class Chart extends Component {
  constructor(props){
    super(props);
  }

  render(){
    if(!this.props.data){
      return <div> loading... </div>;
    }
    return(
      <div>
        <LineChart width={1300} height={600} data={this.props.data}>
            <Line className='anim'
              type='monotone'
              dataKey='BTC'
              stroke='blue'
              dot={''}
              strokeWidth={2}
              activeDot={{ r: 6 }}
              strokeDasharray="20 5"
               />
          <Tooltip />
          <XAxis dataKey='date' tickFormatter={formatTick} interval={30} minTickGapNumber={30}/>
          <YAxis ticks={[500,1000, 1500, 2000, 2500, 3000]}/>
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
