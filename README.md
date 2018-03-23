# CSGO Demo Visualizer

This tool visualizes different statistic from CSGO demo-files to aid the viewer in better understanding what happened.

This tool is developed as part of my master's thesis at the KULeuven, Belgium.

## TODO

* Economy store active lines
* Switching teams

## Technologies used

* [React](https://reactjs.org/) - JavaScript library used for the web development.
* [React-player](https://github.com/CookPete/react-player) - Used for playing and controlling the video.
* [React-Highcharts](https://github.com/kirjs/react-highcharts) - [Highcharts](https://www.highcharts.com/) component used for different visualizations
* [React-Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/) - Used for styling and money visualizations
* [React-circular-progressbar](http://www.kevinqi.com/react-circular-progressbar/) - User for accuracy visualization
* [demofile](https://github.com/saul/demofile) - Node.js library to parse CSGO demo-files
* [gamevis](https://github.com/saul/gamevis/tree/master/overviews/csgo) - Used for map images and info

## Information parsing

The demo-files need to be parsed first. Parsing is currently done using [demofile](https://github.com/saul/demofile).
The parser is in [another project](https://github.com/Brammz/csgo-demofile-parser) (due to errors when using [demofile](https://github.com/saul/demofile) in combination with [React](https://reactjs.org/)).
The parser parses the replay-file and creates a json-file for each visualization.
Each json-file consists of timestamps at which the information was updated, followed by all the information that is needed to create the corresponding visualization.


## Notes

* As the event `buytime_ended` is not working, updates for the account and equipemnt value might be delayed.
* Damage and ADR are currently only damage to the health of a person and don't include damage to armor.
* Headshot percentage is only updated at the end of each round.
