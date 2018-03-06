import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import economyImg from '../images/economy.png';

class EconomyVisualization extends Component {

  constructor() {
    super();
    this.state = {
      economyHidden: true
    }
    this.toggleEconomy = this.toggleEconomy.bind(this);
  }

  toggleEconomy() {
    const { economyHidden } = this.state;
    this.setState({
      economyHidden: !economyHidden
    });
  }

  render() {
    const { economyHidden } = this.state;
    let economy = this.props.economy;
    let terroristData = [];
    let ctData = [];

    for (let i = 0; i < 30; i++) {
      if (economy.length > i) {
        terroristData.push(economy[i].terroristsRoundStartAccount);
        ctData.push(economy[i].ctRoundStartAccount);
      } else {
        terroristData.push(null);
        ctData.push(null);
      }
    }
    console.log(terroristData);
    console.log(ctData);

    let config = {
      chart: {
        type: 'line',
        height: '37%',
        backgroundColor: null
      },
      title: {
        text: 'Economy'
      },
      xAxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
      },
      yAxis: {
        title: {
          text: 'Money ($)'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        name: 'terrorists',
        data: terroristData,
        color: '#88C3F3'
      }, {
        name: 'cts',
        data: ctData,
        color: '#F0C557'
      }]
    }

    return (
      <div id="economy">
        <button key="economy" id="economyBtn" onClick={this.toggleEconomy}>
          <img src={economyImg} alt="economy" className="image" />
        </button>
        {!economyHidden && (
          <div id="economyVisual">
            <button type="button" className="close" onClick={this.toggleEconomy}>
              <span>&times;</span>
            </button>
            <ReactHighcharts config={config}></ReactHighcharts>
          </div>
        )}
      </div>
    );
  }

}

export default EconomyVisualization;
