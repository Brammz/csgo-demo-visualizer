import React, { Component } from 'react';
import map from '../images/map.png';

class MapVisualization extends Component {

  constructor() {
    super();
    this.state = {
      mapHidden: true,
      selectedMapOption: 'kills',
      selectedTeamOption: 'both',
      selectedRoundOption: 'all'
    }
    this.toggleMap = this.toggleMap.bind(this);
    this.changeMapOption = this.changeMapOption.bind(this);
    this.changeTeamOption = this.changeTeamOption.bind(this);
    this.changeRoundOption = this.changeRoundOption.bind(this);
  }

  toggleMap() {
    const { mapHidden } = this.state;
    this.setState({
      mapHidden: !mapHidden
    });
  }

  changeMapOption(e) {
    this.setState({
      selectedMapOption: e.target.value
    });
  }

  changeTeamOption(e) {
    this.setState({
      selectedTeamOption: e.target.value
    });
  }

  changeRoundOption(e) {
    this.setState({
      selectedRoundOption: e.target.value
    });
  }

  render() {
    let image = require('../maps/' + this.props.map + '.png');
    let mapInfo = require('../maps/' + this.props.map + '.json');
    let circles = [];
    /*
    if (this.state.selectedTeamOption === 'both' || this.state.selectedTeamOption === 'terrorists') {
      let positions = [];
      switch (this.state.selectedMapOption) {
        case 'kills': positions = this.props.locations.terroristKills; break;
        case 'deaths': positions = this.props.locations.terroristDeaths; break;
        case 'grenades': positions = this.props.locations.terroristGrenades; break;
        case 'smokes': positions = this.props.locations.terroristSmokes; break;
        case 'flashbangs': positions = this.props.locations.terroristFlashbangs; break;
        case 'molotovs': positions = this.props.locations.terroristMolotovs; break;
        case 'decoys': positions = this.props.locations.terroristDecoys; break;
        default: positions = this.props.locations.terroristKills;
      }
      for (let pos of positions) {
        let x = (pos.x - mapInfo.pos_x) / (mapInfo.scale*3/4);
        let y = (pos.y - mapInfo.pos_y) / (mapInfo.scale*3/4);
        circles.push(
          <circle key={x*y} cx={x} cy={y} r="5" stroke="black" strokeWidth="1" fill="#F0C557" opacity="0.4" />
        );
      }
    }
    if (this.state.selectedTeamOption === 'both' || this.state.selectedTeamOption === 'cts') {
      let positions = [];
      switch (this.state.selectedMapOption) {
        case 'kills': positions = this.props.locations.ctKills; break;
        case 'deaths': positions = this.props.locations.ctDeaths; break;
        case 'grenades': positions = this.props.locations.ctGrenades; break;
        case 'smokes': positions = this.props.locations.ctSmokes; break;
        case 'flashbangs': positions = this.props.locations.ctFlashbangs; break;
        case 'molotovs': positions = this.props.locations.ctMolotovs; break;
        case 'decoys': positions = this.props.locations.ctDecoys; break;
        default: positions = this.props.locations.ctKills;
      }
      for (let pos of positions) {
        let x = Math.abs((pos.x - mapInfo.pos_x) / (mapInfo.scale*3/4))
        let y = Math.abs((pos.y - mapInfo.pos_y) / (mapInfo.scale*3/4));
        circles.push(
          <circle key={x*y} cx={x} cy={y} r="5" stroke="black" strokeWidth="1" fill="#88C3F3" opacity="0.4" zIndex="2" />
        );
      }
    }
    */
    return (
      <div id="map">
        <button key="map" id="mapBtn" onClick={this.toggleMap}>
          <img src={map} alt="map" className="image" />
        </button>
        {!this.state.mapHidden && (
          <div id="mapVisual">
            <button type="button" className="close" onClick={this.toggleMap}>
              <span>&times;</span>
            </button>
            <div id="mapOptions">
              <form>
                <h4>Map options</h4>
                <div className="radio">
                    <input type="radio" value="kills" checked={this.state.selectedMapOption === 'kills'} onChange={this.changeMapOption} /> Kills
                </div>
                <div className="radio">
                    <input type="radio" value="deaths" checked={this.state.selectedMapOption === 'deaths'} onChange={this.changeMapOption} /> Deaths
                </div>
                <div className="radio">
                    <input type="radio" value="grenades" checked={this.state.selectedMapOption === 'grenades'} onChange={this.changeMapOption} /> Grenades
                </div>
                <div className="radio">
                    <input type="radio" value="smokes" checked={this.state.selectedMapOption === 'smokes'} onChange={this.changeMapOption} /> Smoke grenades
                </div>
                <div className="radio">
                    <input type="radio" value="flashbangs" checked={this.state.selectedMapOption === 'flashbangs'} onChange={this.changeMapOption} /> Flashbangs
                </div>
                <div className="radio">
                    <input type="radio" value="molotovs" checked={this.state.selectedMapOption === 'molotovs'} onChange={this.changeMapOption} /> Molotovs
                </div>
                <div className="radio">
                    <input type="radio" value="decoys" checked={this.state.selectedMapOption === 'decoys'} onChange={this.changeMapOption} /> Decoys
                </div>
                <br />
              </form>
              <form>
                <h4>Team</h4>
                <div className="radio">
                    <input type="radio" value="both" checked={this.state.selectedTeamOption === 'both'} onChange={this.changeTeamOption} /> Both
                </div>
                <div className="radio">
                    <input type="radio" value="terrorists" checked={this.state.selectedTeamOption === 'terrorists'} onChange={this.changeTeamOption} /> Terrorists
                </div>
                <div className="radio">
                    <input type="radio" value="cts" checked={this.state.selectedTeamOption === 'cts'} onChange={this.changeTeamOption} /> Counter-Terrorists
                </div>
                <br />
              </form>
              {this.state.selectedTeamOption !== 'both' && (
                <form>
                  <h4>Rounds</h4>
                  <div className="radio">
                      <input type="radio" value="all" checked={this.state.selectedRoundOption === 'all'} onChange={this.changeRoundOption} /> All
                  </div>
                  <div className="radio">
                      <input type="radio" value="won" checked={this.state.selectedRoundOption === 'won'} onChange={this.changeRoundOption} /> Won
                  </div>
                  <div className="radio">
                      <input type="radio" value="lost" checked={this.state.selectedRoundOption === 'lost'} onChange={this.changeRoundOption} /> Lost
                  </div>
                </form>
              )}
            </div>
            <div id="mapGraph">
              <svg viewBox="0 0 768 768">
                <image href={image} alt="map" height="768" width="768" />
                <circle key={'test1'} cx={10} cy={10} r="5" stroke="white" fill="purple" />
                <circle key={'test2'} cx={50} cy={50} r="5" stroke="white" fill="purple" />
                <circle key={'test3'} cx={200} cy={200} r="5" stroke="white" fill="purple" />
                <circle key={'test4'} cx={500} cy={500} r="5" stroke="white" fill="purple" />
                <circle key={'test5'} cx={768} cy={768} r="5" stroke="white" fill="purple" />
                {circles}
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }

}

export default MapVisualization;
