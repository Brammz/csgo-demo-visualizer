import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import '../css/circular-progressbar.css';

class Scoreboard extends Component {

  render() {
    let terrorists = this.props.scores['terrorists'];
    let cts = this.props.scores['cts'];
    let terroristScores = [];
    let ctScores = [];

    for (let t of terrorists.players) {
      terroristScores.push(
        <div key={t.name} className="player">
          <div className="TC1 left-text">
            <br />
            ${t.account}
          </div>
          <div className="TC2 middle-text">
            <strong>{t.name}</strong><br/>
            {t.kills} / {t.assists} / {t.deaths}
          </div>
          <div className="TC3">
            <div className="right-float" style={{width: '40%'}}>
              <CircularProgressbar percentage={t.accuracy} strokeWidth="10" />
              <CircularProgressbar percentage={t.hsAccuracy} strokeWidth="10" />
            </div>
          </div>
        </div>
      );
    }

    for (let ct of cts.players) {
      ctScores.push(
        <div key={ct.name} className="player">
          <div className="TC3">
            <div className="left-float" style={{width: '40%'}}>
              <CircularProgressbar percentage={ct.accuracy} strokeWidth="10" />
              <CircularProgressbar percentage={ct.hsAccuracy} strokeWidth="10" />
            </div>
          </div>
          <div className="TC2 middle-text">
            <strong>{ct.name}</strong><br/>
            {ct.kills} / {ct.assists} / {ct.deaths}
          </div>
          <div className="TC1 right-text">
            <br />
            ${ct.account}
          </div>
        </div>
      );
    }

    return (
      <div id="scoreboard">
        <div id="team1">
          {terroristScores}
        </div>
        <div id="team2">
          {ctScores}
        </div>
      </div>
    );
  }

}

export default Scoreboard;
