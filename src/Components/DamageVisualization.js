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
    let data = [];

    for (let t of damage['terrorists']['players']) {
      xAxis.push(t.name);
      data.push({
        y: (Math.round(t.adr * 100) / 100),
        damage: t.damage,
        color: '#F0C557'
      });
    }

    for (let ct of damage['cts']['players']) {
      xAxis.push(ct.name);
      data.push({
        y: (Math.round(ct.adr * 100) / 100),
        damage: ct.damage,
        color: '#88C3F3'
      });
    }

    let config = {
      credits: {
          enabled: false
      },
      chart: {
        type: 'column',
        height: '55%',
        backgroundColor: null
      },
      title: null,
      /*
      title: {
        text: 'Average Damage per Round',
        style: {
          color: 'rgba(255, 255, 255, 1)',
          font: '16px'
        },
        margin: 0
      },
      */
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
        formatter: function() {
          return '<b>' + this.point.key + '</b>' + '<br />' +
                 'ADR: ' + this.point.y + '<br />' +
                 'Damage: ' + this.point.damage;
        }
      },
      series: [{
        data: data
      }]
    };

    return (
      <div id="damage">
        <div id="damageGraph">
          <ReactHighcharts config={config}></ReactHighcharts>
        </div>
      </div>
    );
  }

}

export default DamageVisualization;
