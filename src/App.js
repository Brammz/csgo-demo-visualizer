import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import Rounds from './Components/Rounds';
import EconomyVisualization from './Components/EconomyVisualization';
import MapVisualization from './Components/MapVisualization';
import Scoreboard from './Components/Scoreboard';
import MoneyVisualization from './Components/MoneyVisualization';
import DamageVisualization from './Components/DamageVisualization';
import './App.css';
import roundsJSON from './json/nip-vs-faze-m3-train-rounds.json';
import scoresJSON from './json/nip-vs-faze-m3-train-scores.json';
import moneyJSON from './json/nip-vs-faze-m3-train-money.json';
import damageJSON from './json/nip-vs-faze-m3-train-damage.json';
import economyJSON from './json/nip-vs-faze-m3-train-economy.json';
import mapJSON from './json/nip-vs-faze-m3-train-map.json';

/*            JSON            |                   YOUTUBE                   | TIME
 * --------------------------------------------------------------------------------
 * nip-vs-faze-m1-cbble       | https://www.youtube.com/watch?v=spkFL9p7y1U | 549
 * nip-vs-faze-m2-inferno     | https://www.youtube.com/watch?v=49yrquM9mHw | 589
 * nip-vs-faze-m3-train       | https://www.youtube.com/watch?v=LrbepbJdh8I | 558
 * nip-vs-faze-m4-overpass    | https://www.youtube.com/watch?v=bPVpcZapu40 | 1677
 * nip-vs-faze-m5-cache       | https://www.youtube.com/watch?v=GXQkLmz_418 | 522
 * --------------------------------------------------------------------------------
 * faze-vs-cloud9-m3-inferno  | https://www.youtube.com/watch?v=Gn9zfWunCEM | 0
 * faze-vs-fnatic-m5-train    | https://www.youtube.com/watch?v=pDFdhr1HIwc | 627
 * --------------------------------------------------------------------------------
 */
class App extends Component {

  constructor() {
    super();
    this.state = {
      time: 0,
      videoStartTime: 558,
      playing: false,
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
      videoStartTime: 558,
      playing: false,
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
      for (let i = (Math.floor(this.player.getCurrentTime())-this.state.videoStartTime); i >= 0 && (!roundsFound || !scoresFound || !moneyFound || !damageFound || !economyFound || !mapFound); i--) {
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
      // set time + playing
      this.setState({
        time: (Math.floor(this.player.getCurrentTime())-this.state.videoStartTime),
        playing: true
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
    this.setState({
      playing: false
    });
  }

  render() {
    return (
      <div className="App">
        <div id="left">
          <Rounds playing={this.state.playing} rounds={this.state.rounds} />
          <EconomyVisualization economy={this.state.economy} />
          <MapVisualization map={this.state.map} locations={this.state.locations} />
          <ReactPlayer
            ref={this.setPlayer}
            className="media"
            url="https://www.youtube.com/watch?v=LrbepbJdh8I"
            config={{ youtube: { playerVars: { start: this.state.videoStartTime } } }}
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
          <div className="title titleTop">Scoreboard</div>
          <Scoreboard scores={this.state.scores} />
          <div className="title">Money distribution</div>
          <MoneyVisualization money={this.state.money} />
          <div className="title">Average Damage per Round</div>
          <DamageVisualization damage={this.state.damage} />
        </div>
      </div>
    );
  }

}

export default App;
