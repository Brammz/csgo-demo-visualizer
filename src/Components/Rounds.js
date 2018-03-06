import React, { Component } from 'react';
import defuse from '../images/defuse.png';
import kills from '../images/kills.png';
import plant from '../images/plant.png';
import time from '../images/time.png';

class Rounds extends Component {

  setRound(i) {
    console.log('Round clicked: ' + i);
  }

  render() {
    let rounds = this.props.rounds;
    let output = [];

    output.push(
      <button key="roundall" id="roundall" className="round" onClick={this.setRound.bind(this, 'all')}>
        <strong>All</strong>
      </button>
    )

    for (let i = 1; i <= 30; i++) {
      if (i <= rounds.length) {
        var image;
        if (rounds[i-1].reason === 'bomb_defused') {
          image = (<img src={defuse} className="winReason" alt="defuse" />)
        } else if (rounds[i-1].reason === 'terrorists_killed' || rounds[i-1].reason === 'cts_killed') {
          image = (<img src={kills} className="winReason" alt="kills" />)
        } else if (rounds[i-1].reason === 'bomb_planted') {
          image = (<img src={plant} className="winReason" alt="plant" />)
        } else if (rounds[i-1].reason === 'target_saved') {
          image = (<img src={time} className="winReason" alt="time" />)
        }
        output.push(
          <button key={'round' + i} id={'round' + i} className={'round ' + rounds[i-1].winner} onClick={this.setRound.bind(this, i)}>
            <strong>{i}</strong>
            {image}
          </button>
        )
      } else {
        output.push(
          <button disabled key={'round' + i} id={'round' + i} className="round" onClick={this.setRound.bind(this, i)}>
            <strong>{i}</strong>
          </button>
        )
      }
    }

    return (
      <div id="rounds">
        {output}
      </div>
    );
  }

}

export default Rounds;
