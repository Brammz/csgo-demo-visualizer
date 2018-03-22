import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap';

class MoneyVisualization extends Component {

  render() {
    let money = this.props.money;
    let totalAccount = money.terroristsAccount + money.ctAccount;
    let totalEquipment = money.terroristsEquipment + money.ctEquipment;

    return (
      <div id="money">
        <div className="left-block">${money.terroristsAccount}</div>
        <div className="middle-block">Account</div>
        <div className="right-block">${money.ctAccount}</div>
        <ProgressBar>
          <ProgressBar bsStyle="warning" now={money.terroristsAccount/totalAccount*100} key={1} />
          <ProgressBar bsStyle="info" now={money.ctAccount/totalAccount*100} key={2} />
        </ProgressBar>
        <div style={{height:'0px'}}></div>
        <ProgressBar>
          <ProgressBar bsStyle="warning" now={money.terroristsEquipment/totalEquipment*100} key={3} />
          <ProgressBar bsStyle="info" now={money.ctEquipment/totalEquipment*100} key={4} />
        </ProgressBar>
        <div className="left-block">${money.terroristsEquipment}</div>
        <div className="middle-block">Equipment</div>
        <div className="right-block">${money.ctEquipment}</div>
      </div>
    );
  }

}

export default MoneyVisualization;
