import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Chart from './components/chart';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: [],
      dateRange: [],
    };
  }

  componentDidMount(){
    let startDate = new Date(2017,1,1);
    let endDate = new Date(2017,6,15);
    this.setDateRangeState(startDate, endDate);
  }

  fetchHistorical(){
    const baseUrl = 'https://min-api.cryptocompare.com/data/pricehistorical';
    let from = 'BTC';
    let to = 'USD';
    
    this.state.dateRange.forEach((ts)=>{
      let queryTs = ts/1000;
      let queryString = `?fsym=${from}&tsyms=${to}&ts=${queryTs}&extraParams=coindapt`;
      $.ajax({
        url: baseUrl + queryString,
        async: true,
        success: (data) =>{
          let newPrice = {
            date: new Date(ts).toISOString().substr(0,10)
          };
          if(data[from]){
            newPrice[from] = data[from][to];
          }else{
            return console.log(data)
          }
          this.setState({chartData: [...this.state.chartData, newPrice]});
        }
      });


    });
  }

  setDateRangeState (startDate, endDate){
    let dateRange = [];
    for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dateRange.push(d.getTime());
    }
    this.setState({dateRange: dateRange});
  }

  render() {
    return (
      <div className="App">
        <button onClick={()=>this.fetchHistorical()}>Click to fetch</button>
        <Chart data={this.state.chartData} />
      </div>
    );
  }
}

export default App;
