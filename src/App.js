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
import mapJSON from './json/nip-vs-faze-m4-overpass-map.json';

class App extends Component {

  constructor() {
    super();
    this.state = {
      time: 0,
      rounds: [],
      scores: {},
      money: {},
      damage: {},
      economy: [],
      map: 'de_dust2',
      locations: {}
    };
    this.setPlayer = this.setPlayer.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
  }

  componentWillMount() {
    this.setState({
      time: 0,
      rounds: roundsJSON[0],
      scores: scoresJSON[0],
      money:  moneyJSON[0],
      damage: damageJSON[0],
      economy: economyJSON[0],
      map: mapJSON['map'],
      locations: mapJSON[0]
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
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
      let mapFound = false;
      for (let i = (Math.floor(this.player.getCurrentTime())-1677); i >= 0 && (!roundsFound || !scoresFound || !moneyFound || !damageFound || !economyFound || !mapFound); i--) {
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
        if (!mapFound && mapJSON[i] !== undefined) {
          mapFound = true;
          this.setState({
            locations: mapJSON[i]
          });
        }
      }
      if (!roundsFound) {
        this.setState({
          rounds: roundsJSON[0]
        });
      }
      if (!scoresFound) {
        this.setState({
          scores: scoresJSON[0]
        });
      }
      if (!moneyFound) {
        this.setState({
          money: moneyJSON[0]
        });
      }
      if (!damageFound) {
        this.setState({
          damage: damageJSON[0]
        });
      }
      if (!economyFound) {
        this.setState({
          economy: economyJSON[0]
        });
      }
      if (!mapFound) {
        this.setState({
          locations: mapJSON[0]
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
          economy: economyJSON[this.state.time] === undefined ? this.state.economy : economyJSON[this.state.time],
          locations: mapJSON[this.state.time] === undefined ? this.state.locations : mapJSON[this.state.time]
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
          <Rounds rounds={this.state.rounds} />
          <EconomyVisualization economy={this.state.economy} />
          <MapVisualization map={this.state.map} locations={this.state.locations} />
          <ReactPlayer
            ref={this.setPlayer}
            className="media"
            url="https://www.youtube.com/watch?v=bPVpcZapu40"
            config={{ youtube: { playerVars: { start: 1677 } } }}
            controls={true}
            volume={0.5}
            width='100%'
            height='89%'
            onPlay={this.playVideo}
            onPause={this.stopVideo}
            onEnded={this.stopVideo}
            onError={() => console.log('Error encountered when trying to play video.')}
          />
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
