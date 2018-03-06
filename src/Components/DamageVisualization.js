import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

class DamageVisualization extends Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    let damage = this.props.damage;
    let xAxis = [];
    let damageData = [];
    let adrData = [];

    for (let t of damage['terrorists']['players']) {
      xAxis.push(t.name);
      damageData.push({
        y: t.damage,
        color: '#F0C557'
      });
      adrData.push({
        y: (Math.round(t.adr * 100) / 100),
        color: '#F0C557'
      });
    }

    for (let ct of damage['cts']['players']) {
      xAxis.push(ct.name);
      damageData.push({
        y: ct.damage,
        color: '#88C3F3'
      });
      adrData.push({
        y: (Math.round(ct.adr * 100) / 100),
        color: '#88C3F3'
      });
    }

    let damageConfig = {
      credits: {
          enabled: false
      },
      chart: {
        type: 'column',
        height: '40%',
        backgroundColor: null
      },
      title: {
        text: 'Damage Dealt',
        style: {
          color: 'rgba(255, 255, 255, 1)',
          font: '16px'
        },
        margin: 0
      },
      xAxis: {
        categories: xAxis,
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
        title: null,
        /*
        title: {
          text: 'Damage dealt',
          style : {
            color: 'rgba(255, 255, 255, 1)',
            font: '16px sans-serif'
          }
        },
        */
        labels: {
          style: {
            color: '#FFFFFF'
          }
        },
        lineColor: '#FFFFFF',
        tickColor: '#FFFFFF',
      },
      legend: {
        enabled: false
      },
      tooltip: {
        headerFormat: '<span style="font-size: 14px;font-weight: bold">{point.key}</span><br/>',
        pointFormat: '{point.y}'
      },
      series: [{
        data: damageData
      }]
    };
    let adrConfig = {
      credits: {
          enabled: false
      },
      chart: {
        type: 'column',
        height: '40%',
        backgroundColor: null
      },
      title: {
        text: 'Average Damage per Round',
        style: {
          color: 'rgba(255, 255, 255, 1)',
          font: '16px'
        },
        margin: 0
      },
      xAxis: {
        categories: xAxis,
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
        title: null,
        /*
        title: {
          text: 'Average Damage per Round',
          style : {
            color: 'rgba(255, 255, 255, 1)',
            font: '16px sans-serif'
          }
        },
        */
        labels: {
          style: {
            color: '#FFFFFF'
          }
        },
        lineColor: '#FFFFFF',
        tickColor: '#FFFFFF',
      },
      legend: {
        enabled: false
      },
      tooltip: {
        headerFormat: '<span style="font-size: 14px;font-weight: bold">{point.key}</span><br/>',
        pointFormat: '{point.y}'
      },
      series: [{
        data: adrData
      }]
    };

    return (
      <div id="damageVisualization">
        <div id="damage">
          <div id="damageGraph">
            <ReactHighcharts config={damageConfig}></ReactHighcharts>
          </div>
        </div>
        <div id="adrGraph">
          <ReactHighcharts config={adrConfig}></ReactHighcharts>
        </div>
      </div>
    );
  }

}

export default DamageVisualization;
