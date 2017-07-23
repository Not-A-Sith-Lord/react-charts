import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Chart from './components/chart.js';
import Chart2 from './components/chart2.js';

import BTCdata from './coinData/btc';
import ETHdata from './coinData/eth';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      coinList: ['BTC', 'ETH'],
      selectedCoins: ['BTC', 'ETH'],
      chartData: {
        BTC: BTCdata,
        ETH: ETHdata
      },
    };
  }

  componentDidMount(){

  }

  // fetchHistorical(){
  //   const baseUrl = 'https://min-api.cryptocompare.com/data/pricehistorical';
  //   let from = 'BTC';
  //   let to = 'USD';
  //
  //   this.state.dateRange.forEach((ts)=>{
  //     let queryTs = ts/1000;
  //     let queryString = `?fsym=${from}&tsyms=${to}&ts=${queryTs}&extraParams=coindapt`;
  //     $.ajax({
  //       url: baseUrl + queryString,
  //       async: true,
  //       success: (data) =>{
  //         let newPrice = {
  //           date: new Date(ts).toISOString().substr(0,10)
  //         };
  //         if(data[from]){
  //           newPrice[from] = data[from][to];
  //         }else{
  //           return console.log(data)
  //         }
  //         this.setState({chartData: [...this.state.chartData, newPrice]});
  //       }
  //     });
  //
  //
  //   });
  // }

  // setDateRangeState (startDate, endDate){
  //   let dateRange = [];
  //   for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
  //     dateRange.push(d.getTime());
  //   }
  //   this.setState({dateRange: dateRange});
  // }

  render() {
    return (
      <div className="App">
        <Chart data={this.state.chartData} selectedCoins={this.state.selectedCoins}/>
        <Chart2 data={this.state.chartData} selectedCoins={this.state.selectedCoins}/>
      </div>
    );
  }
}

export default App;
