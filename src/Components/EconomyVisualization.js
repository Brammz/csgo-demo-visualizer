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
    let economy = this.props.economy;
    let terroristsAccountData = [];
    let terroristsSpendData = [];
    let ctsAccountData = [];
    let ctsSpendData = [];

    for (let i = 0; i < 30; i++) {
      if (economy.length > i) {
        terroristsAccountData.push(economy[i].terroristsRoundStartAccount);
        terroristsSpendData.push(economy[i].terroristsRoundSpendValue);
        ctsAccountData.push(economy[i].ctRoundStartAccount);
        ctsSpendData.push(economy[i].ctRoundSpendValue);
      } else {
        terroristsAccountData.push(null);
        terroristsSpendData.push(null);
        ctsAccountData.push(null);
        ctsSpendData.push(null);
      }
    }

    let config = {
      credits: {
          enabled: false
      },
      chart: {
        type: 'line',
        height: '37%',
        backgroundColor: null
      },
      title: {
        text: 'Economy',
        style: {
          color: 'rgba(255, 255, 255, 1)',
          font: '16px'
        },
      },
      xAxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        lineColor: '#FFFFFF',
        tickColor: '#FFFFFF',
        labels: {
          style : {
            color: 'rgba(255, 255, 255, 1)',
            font: 'sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Money ($)',
          style: {
            color: '#FFFFFF',
            font: '14px'
          }
        },
        labels: {
          style: {
            color: '#FFFFFF'
          }
        },
        lineColor: '#FFFFFF',
        tickColor: '#FFFFFF',
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: '#FFFFFF'
        }
      },
      plotOptions: {
        line: {
          animation: false,
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        name: 'Start value (T)',
        data: terroristsAccountData,
        color: '#F0C557',
        marker: {
          symbol: 'circle'
        }
      }, {
        name: 'Spend value (T)',
        data: terroristsSpendData,
        color: '#F9E3AD',
        visible: false,
        marker: {
          symbol: 'triangle-down'
        }
      }, {
        name: 'Start value (CT)',
        data: ctsAccountData,
        color: '#88C3F3',
        marker: {
          symbol: 'circle'
        }
      }, {
        name: 'Spend value (CT)',
        data: ctsSpendData,
        color: '#C3E3FD',
        visible: false,
        marker: {
          symbol: 'triangle-down'
        }
      }]
    }

    return (
      <div id="economy">
        <button key="economy" id="economyBtn" onClick={this.toggleEconomy}>
          <img src={economyImg} alt="economy" className="image" />
        </button>
        {!this.state.economyHidden && (
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
