import React, { Component } from 'react';
import map from '../images/map.png';
import overpass from '../images/map_overpass.png';

class MapVisualization extends Component {

  constructor() {
    super();
    this.state = {
      mapHidden: true,
      selectedTypeOption: 'heatmap',
      selectedHeatmapOption: 'kills',
      selectedTeamOption: 'both',
      selectedRoundOption: 'all'
    }
    this.toggleMap = this.toggleMap.bind(this);
    this.changeTypeOption = this.changeTypeOption.bind(this);
    this.changeHeatmapOption = this.changeHeatmapOption.bind(this);
    this.changeTeamOption = this.changeTeamOption.bind(this);
    this.changeRoundOption = this.changeRoundOption.bind(this);
  }

  toggleMap() {
    const { mapHidden } = this.state;
    this.setState({
      mapHidden: !mapHidden
    });
  }

  changeTypeOption(e) {
    this.setState({
      selectedTypeOption: e.target.value
    });
  }

  changeHeatmapOption(e) {
    this.setState({
      selectedHeatmapOption: e.target.value
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
                <h4>Map type</h4>
                <div className="radio">
                    <input type="radio" value="heatmap" checked={this.state.selectedTypeOption === 'heatmap'} onChange={this.changeTypeOption} /> Heatmap
                </div>
                <div className="radio">
                    <input type="radio" value="pathing" checked={this.state.selectedTypeOption === 'pathing'} onChange={this.changeTypeOption} /> Pathing
                </div>
                <br />
              </form>
              {this.state.selectedTypeOption === 'heatmap' && (
                <form>
                  <h4>Heatmap options</h4>
                  <div className="radio">
                      <input type="radio" value="kills" checked={this.state.selectedHeatmapOption === 'kills'} onChange={this.changeHeatmapOption} /> Kills
                  </div>
                  <div className="radio">
                      <input type="radio" value="deaths" checked={this.state.selectedHeatmapOption === 'deaths'} onChange={this.changeHeatmapOption} /> Deaths
                  </div>
                  <div className="radio">
                      <input type="radio" value="grenades" checked={this.state.selectedHeatmapOption === 'grenades'} onChange={this.changeHeatmapOption} /> Grenades
                  </div>
                  <div className="radio">
                      <input type="radio" value="smokeGrenades" checked={this.state.selectedHeatmapOption === 'smokeGrenades'} onChange={this.changeHeatmapOption} /> Smoke grenades
                  </div>
                  <div className="radio">
                      <input type="radio" value="flashbangs" checked={this.state.selectedHeatmapOption === 'flashbangs'} onChange={this.changeHeatmapOption} /> Flashbangs
                  </div>
                  <br />
                </form>
              )}
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
              <img className="image" src={overpass} alt="map"/>
            </div>
          </div>
        )}
      </div>
    );
  }

}

export default MapVisualization;
