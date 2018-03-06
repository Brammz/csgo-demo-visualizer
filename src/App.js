import React, { Component } from 'react';
import Rounds from './Components/Rounds';
import EconomyVisualization from './Components/EconomyVisualization';
import MapVisualization from './Components/MapVisualization';
import Media from './Components/Media';
import Sidebar from './Components/Sidebar';
import './App.css';
import roundsJSON from './json/nip-vs-faze-m4-overpass-rounds.json';
import scoresJSON from './json/nip-vs-faze-m4-overpass-scores.json';
import moneyJSON from './json/nip-vs-faze-m4-overpass-money.json';
import damageJSON from './json/nip-vs-faze-m4-overpass-damage.json';
import economyJSON from './json/nip-vs-faze-m4-overpass-economy.json';

/* TODO
 *
 * - Economy
 * - Github repo
 * - First round economy money + kloppen andere rondes?
 * - Heatmap (contact dev)
 * - Pathing
 * - Default setup
 * - Highchart flow instead of switch on update?
 * - Switching teams
 *
 * NOTE
 * parser: parses the replay-file and creates a json-file for each visualization.
 * each json-file consists of timestamps at which the information was updated,
 * followed by all the information that is needed to create the corresponding
 * visualization.
 */
class App extends Component {

  constructor() {
    super();
    this.state = {
      time: 0,
      rounds: [],
      scores: {},
      money: {},
      damage: {},
      economy: []
    };
    this.startMatch = this.startMatch.bind(this);
    this.stopMatch = this.stopMatch.bind(this);
  }

  startMatch() {
    this.interval = setInterval(() => {
      this.setState({
        time: this.state.time+1,
        rounds: roundsJSON[this.state.time] === undefined ? this.state.rounds : roundsJSON[this.state.time],
        scores: scoresJSON[this.state.time] === undefined ? this.state.scores : scoresJSON[this.state.time],
        money: moneyJSON[this.state.time] === undefined ? this.state.money : moneyJSON[this.state.time],
        damage: damageJSON[this.state.time] === undefined ? this.state.damage : damageJSON[this.state.time],
        economy: economyJSON[this.state.time] === undefined ? this.state.economy : economyJSON[this.state.time]
      });
    }, 1000);
  }

  stopMatch() {
    clearInterval(this.interval);
    this.setState({
      time: 0,
      rounds: [],
      scores: this.state.scores,
      money: this.state.money,
      damage: {
        "terrorists": {
          "teamName": "Ninjas in Pyjamas",
          "players": [
            {
              "name": "REZ",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "Xizt",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "GeT_RiGhT",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "f0rest",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "draken",
              "damage": 0,
              "adr": 0
            }
          ]
        },
        "cts": {
          "teamName": "FaZe Clan",
          "players": [
            {
              "name": "karrigan",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "NiKo",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "olofmeister",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "rain",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "GuardiaN",
              "damage": 0,
              "adr": 0
            }
          ]
        }
      },
      economy: []
    });
  }

  componentWillMount() {
    this.setState({
      time: 0,
      rounds: [],
      scores: {
        "terrorists": {
          "teamName": "Ninjas in Pyjamas",
          "score": 0,
          "players": [
            {
              "name": "REZ",
              "account": 800,
              "kills": 0,
              "assists": 0,
              "deaths": 0,
              "accuracy": 0,
              "hsAccuracy": 0
            },
            {
              "name": "Xizt",
              "account": 800,
              "kills": 0,
              "assists": 0,
              "deaths": 0,
              "accuracy": 0,
              "hsAccuracy": 0
            },
            {
              "name": "GeT_RiGhT",
              "account": 800,
              "kills": 0,
              "assists": 0,
              "deaths": 0,
              "accuracy": 0,
              "hsAccuracy": 0
            },
            {
              "name": "f0rest",
              "account": 800,
              "kills": 0,
              "assists": 0,
              "deaths": 0,
              "accuracy": 0,
              "hsAccuracy": 0
            },
            {
              "name": "draken",
              "account": 800,
              "kills": 0,
              "assists": 0,
              "deaths": 0,
              "accuracy": 0,
              "hsAccuracy": 0
            }
          ]
        },
        "cts": {
          "teamName": "FaZe Clan",
          "score": 0,
          "players": [
            {
              "name": "karrigan",
              "account": 800,
              "kills": 0,
              "assists": 0,
              "deaths": 0,
              "accuracy": 0,
              "hsAccuracy": 0
            },
            {
              "name": "NiKo",
              "account": 800,
              "kills": 0,
              "assists": 0,
              "deaths": 0,
              "accuracy": 0,
              "hsAccuracy": 0
            },
            {
              "name": "olofmeister",
              "account": 800,
              "kills": 0,
              "assists": 0,
              "deaths": 0,
              "accuracy": 0,
              "hsAccuracy": 0
            },
            {
              "name": "rain",
              "account": 800,
              "kills": 0,
              "assists": 0,
              "deaths": 0,
              "accuracy": 0,
              "hsAccuracy": 0
            },
            {
              "name": "GuardiaN",
              "account": 800,
              "kills": 0,
              "assists": 0,
              "deaths": 0,
              "accuracy": 0,
              "hsAccuracy": 0
            }
          ]
        }
      },
      money: {
        "terroristsAccount": 4000,
        "terroristsEquipment": 0,
        "ctAccount": 4000,
        "ctEquipment": 0
      },
      damage: {
        "terrorists": {
          "teamName": "Ninjas in Pyjamas",
          "players": [
            {
              "name": "REZ",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "Xizt",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "GeT_RiGhT",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "f0rest",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "draken",
              "damage": 0,
              "adr": 0
            }
          ]
        },
        "cts": {
          "teamName": "FaZe Clan",
          "players": [
            {
              "name": "karrigan",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "NiKo",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "olofmeister",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "rain",
              "damage": 0,
              "adr": 0
            },
            {
              "name": "GuardiaN",
              "damage": 0,
              "adr": 0
            }
          ]
        },
      },
      economy: []
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <div id="left">
          <button onClick={this.startMatch}>Start</button><button onClick={this.stopMatch}>Stop</button>
          <p>time: {this.state.time}</p>
          <Rounds rounds={this.state.rounds} />
          <EconomyVisualization economy={this.state.economy} />
          <MapVisualization />
          <Media />
        </div>
        <Sidebar scores={this.state.scores} money={this.state.money} damage={this.state.damage} />
      </div>
    );
  }

}

export default App;
