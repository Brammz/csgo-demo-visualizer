import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import Rounds from './Components/Rounds';
import EconomyVisualization from './Components/EconomyVisualization';
import MapVisualization from './Components/MapVisualization';
import Scoreboard from './Components/Scoreboard';
import MoneyVisualization from './Components/MoneyVisualization';
import DamageVisualization from './Components/DamageVisualization';
import './App.css';
import roundsJSON from './json/nip-vs-faze-m4-overpass-rounds.json';
import scoresJSON from './json/nip-vs-faze-m4-overpass-scores.json';
import moneyJSON from './json/nip-vs-faze-m4-overpass-money.json';
import damageJSON from './json/nip-vs-faze-m4-overpass-damage.json';
import economyJSON from './json/nip-vs-faze-m4-overpass-economy.json';

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
    this.stopMatch = this.stopMatch.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
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
    clearInterval(this.intervalId);
  }

  stopMatch() {
    clearInterval(this.intervalId);
    this.player.seekTo(1677);
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

  setPlayer(player) {
    this.player = player;
  }

  playVideo() {
    if (this.player === undefined) {
      console.log('Player not found.');
    } else {
      clearInterval(this.intervalId);
      // update data to current time
      let roundsFound = false;
      let scoresFound = false;
      let moneyFound = false;
      let damageFound = false;
      let economyFound = false;
      for (let i = (Math.floor(this.player.getCurrentTime())-1677); i >= 0 && (!roundsFound || !scoresFound || !moneyFound || !damageFound || !economyFound); i--) {
        if (!roundsFound && roundsJSON[i] !== undefined) {
          roundsFound = true;
          this.setState({
            rounds: roundsJSON[i]
          });
        }
        if (!scoresFound && scoresJSON[i] !== undefined) {
          scoresFound = true;
          this.setState({
            scores: scoresJSON[i]
          });
        }
        if (!moneyFound && moneyJSON[i] !== undefined) {
          moneyFound = true;
          this.setState({
            money: moneyJSON[i]
          });
        }
        if (!damageFound && damageJSON[i] !== undefined) {
          damageFound = true;
          this.setState({
            damage: damageJSON[i]
          });
        }
        if (!economyFound && economyJSON[i] !== undefined) {
          economyFound = true;
          this.setState({
            economy: economyJSON[i]
          });
        }
      }
      if (!roundsFound) {
        this.setState({
          rounds: [] // TODO default
        });
      }
      if (!scoresFound) {
        this.setState({
          scores: { // TODO default
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
          }
        });
      }
      if (!moneyFound) {
        this.setState({
          money: { // TODO default
            "terroristsAccount": 4000,
            "terroristsEquipment": 0,
            "ctAccount": 4000,
            "ctEquipment": 0
          }
        });
      }
      if (!damageFound) {
        this.setState({
          damage: { // TODO default
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
          }
        });
      }
      if (!economyFound) {
        this.setState({
          economy: [] // TODO default
        });
      }
      // set time
      this.setState({
        time: (Math.floor(this.player.getCurrentTime())-1677)
      });
      // set interval
      this.intervalId = setInterval(() => {
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
  }

  stopVideo() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className="App">
        <div id="left">
          <button onClick={this.stopMatch}>Stop</button>
          <p>time: {this.state.time}</p>
          <Rounds rounds={this.state.rounds} />
          <EconomyVisualization economy={this.state.economy} />
          <MapVisualization />
          <div id="media">
            <ReactPlayer
              ref={this.setPlayer}
              className="fill"
              url="https://www.youtube.com/watch?v=bPVpcZapu40"
              youtubeConfig={{ playerVars: { start: 1677 } }}
              controls="true"
              width='100%'
              height='80%'
              onPlay={this.playVideo}
              onPause={this.stopVideo}
              onEnded={this.stopVideo}
              onError={() => console.log('Error encountered when trying to play video.')}
            />
          </div>
        </div>
        <div id="sidebar">
          <Scoreboard scores={this.state.scores} />
          <MoneyVisualization money={this.state.money} />
          <DamageVisualization damage={this.state.damage} />
        </div>
      </div>
    );
  }

}

export default App;
