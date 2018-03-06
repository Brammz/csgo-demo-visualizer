import React, { Component } from 'react';
import YouTube from 'react-youtube';

class Media extends Component {

  render() {
    return (
      <div id="media">
          <YouTube className="fill" videoId="bPVpcZapu40" onReady={this._onReady} />
      </div>
    );
  }

}

export default Media;
