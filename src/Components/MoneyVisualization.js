import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap';

class MoneyVisualization extends Component {

  render() {
    let money = this.props.money;
    let totalAccount = money.terroristsAccount + money.ctAccount;
    let totalEquipment = money.terroristsEquipment + money.ctEquipment;

    return (
      <div id="money">
        <span className="left-float">${money.terroristsAccount}</span><span className="right-float">${money.ctAccount}</span><br />
        <ProgressBar>
          <ProgressBar bsStyle="warning" now={money.terroristsAccount/totalAccount*100} key={1} />
          <ProgressBar bsStyle="info" now={money.ctAccount/totalAccount*100} key={2} />
        </ProgressBar>
        <br />
        <ProgressBar>
          <ProgressBar bsStyle="warning" now={money.terroristsEquipment/totalEquipment*100} key={3} />
          <ProgressBar bsStyle="info" now={money.ctEquipment/totalEquipment*100} key={4} />
        </ProgressBar>
        <span className="left-float">${money.terroristsEquipment}</span><span className="right-float">${money.ctEquipment}</span><br />
      </div>
    );
  }

}

export default MoneyVisualization;
