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
          <div className="TC2 middle-text" title="K / A / D">
            <strong>{t.name}</strong><br/>
            {t.kills} / {t.assists} / {t.deaths}
          </div>
          <div className="TC3">
            <div className="right-float" style={{width: '50%', 'marginTop': '7px'}} title="Headshot Ratio">
              <CircularProgressbar percentage={t.hsPercentage} strokeWidth="10" />
            </div>
          </div>
        </div>
      );
    }

    for (let ct of cts.players) {
      ctScores.push(
        <div key={ct.name} className="player">
          <div className="TC3">
            <div className="left-float" style={{width: '50%', 'marginTop': '7px'}} title="Headshot Ratio">
              <CircularProgressbar percentage={ct.hsPercentage} strokeWidth="10" />
            </div>
          </div>
          <div className="TC2 middle-text" title="K / A / D">
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
          <div className="teamName">
            {terrorists.teamName}
          </div>
          {terroristScores}
        </div>
        <div id="team2">
          <div className="teamName">
            {cts.teamName}
          </div>
          {ctScores}
        </div>
      </div>
    );
  }

}

export default Scoreboard;
