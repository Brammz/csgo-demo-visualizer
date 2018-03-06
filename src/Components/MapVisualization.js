import React, { Component } from 'react';
import map from '../images/map.png';
import overpass from '../images/map_overpass.png';

class MapVisualization extends Component {

  constructor() {
    super();
    this.state = {
      mapHidden: true
    }
    this.toggleMap = this.toggleMap.bind(this);
  }

  toggleMap() {
    const { mapHidden } = this.state;
    this.setState({
      mapHidden: !mapHidden
    });
  }

  render() {
    const { mapHidden } = this.state;
    return (
      <div id="map">
        <button key="map" id="mapBtn" onClick={this.toggleMap}>
          <img src={map} alt="map" className="image" />
        </button>
        {!mapHidden && (
          <div id="mapVisual">
            <button type="button" className="close" onClick={this.toggleMap}>
              <span>&times;</span>
            </button>
            <div id="mapOptions">
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
