import React, { Component } from 'react';
import Scoreboard from './Scoreboard';
import MoneyVisualization from './MoneyVisualization';
import DamageVisualization from './DamageVisualization';

class Sidebar extends Component {

  render() {
    return (
      <div id="sidebar">
        <Scoreboard scores={this.props.scores} />
        <MoneyVisualization money={this.props.money} />
        <DamageVisualization damage={this.props.damage} />
      </div>
    );
  }

}

export default Sidebar;
