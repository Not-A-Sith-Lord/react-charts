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

  componentDidUpdate () {
    console.log("COMPONENT UPDATED")
    console.log(this.state)
  }

  componentDidMount(){

    //months start from 0!
    let startDate = new Date(2017,0,1);
    // console.log("ancient stardate", startDate)
    let endDate = new Date(2017,6,20);
    // console.log("ancient endate", endDate)
    this.setDateRangeState(startDate, endDate);
  }

  fetchHistorical(ticker){
    const baseUrl = 'https://min-api.cryptocompare.com/data/pricehistorical';
    let from = ticker;
    let to = 'USD';
    let graphdata = []

    this.state.dateRange.forEach((ts)=>{
      //clear up state
      // this.setState({chartData: [] });
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

          graphdata.push(newPrice)
          // this.setState({chartData: [...this.state.chartData, newPrice]});
        }
      });

    }); //finish timestamp loop

    console.log("PRE:",graphdata)
    graphdata.sort(function(a,b) {return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);} );
    console.log("POST:",graphdata)
  }

  //FEDE FX CODE
  //ge tthe history from json file
  fetchHistory(ticker) {

    let stateNow = this.state

    if (stateNow[ticker] === false) {
      console.log("noupdate")
      let newlines = this.state.lines
      let index = newlines.indexOf(ticker)
      if (index > -1) {
        newlines.splice(index, 1);
      }
      this.setState({lines: newlines})
      return "no update"
    }

    //making new date range
    let offlineDates = this.state.dateRange

    let linesFinal = this.state.lines
    linesFinal.push(ticker)
    // console.log("TICKER", ticker) //debug
    let history = require('./histories/' + ticker + '.json');

    // console.log("histo",history); // date and USD
    // console.log("chartdata", this.state.chartData); // date and BTC

    let startDate = new Date(this.state.dateRange[0]).toISOString().slice(0, 10)
    let endDate = new Date(this.state.dateRange[this.state.dateRange.length - 1]).toISOString().slice(0, 10)

    function finddate(dd) {
      return dd.date === startDate
    }

    let startIndex = history.indexOf(history.find(finddate));

    // console.log("SD",startDate)  //DEBUG
    // console.log("SI",startIndex) //DEBUG

    //pre-loop vars
    let finalData = []
    let indexer = startIndex
    //l00p
    offlineDates.forEach((ts) => {
      let dataobj = {
        date: new Date(ts).toISOString().slice(0, 10),
      }
      if ( history[indexer] === undefined || dataobj.date === endDate ) {
        // do nothing
        console.log("skipped loop iteration")

      }
      else {
        dataobj[ticker] = history[indexer].USD
        // console.log("entry:: ", dataobj)
        indexer = indexer + 1;

        finalData.push(dataobj)
        // console.log("chartData= ",this.state.chartData)
      }
    });

    startDate = new Date(2017,6,4);
    endDate = new Date(2017,6,21);
    this.setDateRangeState(startDate, endDate, () => {
      this.setState({
        chartData: finalData,
        lines: linesFinal
      }, () => {
        this.fetchHistorical(ticker)
      });
    })

  }

  setDateRangeState (startDate, endDate, callback){
    let dateRange = [];
    for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dateRange.push(d.getTime());
    }
    //added callback
    this.setState({dateRange: dateRange}, () => {
      if (callback) callback();
    });
  }

  // to handle checkbox change
  handleCheckboxChange(event) {
    // console.log(event.target.checked, event.target.name) //debug shit
    let ticker = event.target.name
    let checked = event.target.checked
    let newstate = this.state
    newstate[ticker] = checked
    this.setState( newstate )
    // console.log(this.state, newstate) //debug
    this.fetchHistory(ticker)
  }


  render() {
    return (
      <div className="App">
      {/*}
        <button onClick={()=>this.fetchHistorical()}>Click to fetch ONLINE</button>
        <button onClick={()=>this.fetchHistory("BTC")}>Click to fetch OFFLINE</button>
      {*/}
        BTC<input
          name="BTC"
          type="checkbox"
          checked={this.state.BTC}
          onChange={(e) => this.handleCheckboxChange(e)}
          />
        <Chart data={this.state.chartData} lines={this.state.lines} />

      </div>
    );
  }
}

export default App;
