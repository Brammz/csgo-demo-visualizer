# CSGO Demo Visualizer

CSGO Demo Visualizer is a dashboard designed to aid CSGO spectators in better understanding the match and gaining a deeper insight, that can also help them learn for personal improvement.
This is done by showing a VOD of a match and using data from the corresponding replay-file (.dem) of that match.

The dashboard consists of 7 different components:
* `Stream`: This is a VOD of a match. This is currently imported as a YouTube video, but Facebook, Vimeo, Twitch, Daily Motion, ... videos are also supported.
* `Rounds visualization`: This visualization shows the 30 rounds that can be played. The active round blinks with a red border. Played rounds will be indicated with the corresponding color of the winning team and an icon to indicate how the round was won.
* `Economy visualization`: This visualization is a line chart that shows the account values of the teams at the start of each round. It is not shown by default.
* `Map visualization`: This visualization shows the locations of kills, deaths and all types of grenades on an image of the map. It can show the locations for both teams or only one team at the same time. It is no shown by default.
* `Scoreboard`: The scoreboard shows the teams that are competing and for each team all the players. For each player it shows their name, how much money they currently have in their account, their K/A/D and their headshot ratio (percentage of kills that were with a headshot).
* `Money distribution`: This visualization compares the total account values of both team and the total equipment values of both teams.
* `Average Damage per Round`: This visualization shows for each player the average damage they dealt in the played rounds.

This dashboard is developed as part of my master's thesis at the KULeuven, Belgium.

## TODO

* Economy store active lines
* Switching teams

## Technologies used

* [React](https://reactjs.org/) ([under MIT license](https://github.com/facebook/react/blob/master/LICENSE)) - JavaScript library used for the web development.
* [React-player](https://github.com/CookPete/react-player) ([under MIT license](https://github.com/CookPete/react-player/blob/master/LICENSE.md)) - Used for playing and controlling the video.
* [React-Highcharts](https://github.com/kirjs/react-highcharts) ([under MIT license](https://github.com/kirjs/react-highcharts/blob/master/LICENSE)) - [Highcharts](https://www.highcharts.com/) component used for different visualizations
* [React-Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/) ([under MIT license](https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE)) - Used for styling and money visualizations
* [React-circular-progressbar](http://www.kevinqi.com/react-circular-progressbar/) ([under MIT license](https://github.com/iqnivek/react-circular-progressbar/blob/master/LICENSE)) - User for accuracy visualization
* [demofile](https://github.com/saul/demofile) ([under MIT license](https://github.com/saul/demofile/blob/master/LICENSE)) - Node.js library to parse CSGO demo-files
* [gamevis](https://github.com/saul/gamevis/tree/master/overviews/csgo) ([under MIT license](https://github.com/saul/gamevis/tree/master/overviews/csgo)) - Used for map images and info

## Information parsing

The demo-files need to be parsed first. Parsing is currently done using [demofile](https://github.com/saul/demofile).
The parser is in [another project](https://github.com/Brammz/csgo-demofile-parser) (due to errors when using [demofile](https://github.com/saul/demofile) in combination with [React](https://reactjs.org/)).
The parser parses the replay-file and creates a JSON-file for each visualization.
Each JSON-file consists of timestamps at which the information was updated, followed by all the information that is needed to create the corresponding visualization.


## Notes

* As the event `buytime_ended` is not working, updates for the account and equipment value might be delayed.
* Damage and ADR are currently only damage to the health of a person and don't include damage to armor.
* Headshot percentage is only updated at the end of each round.
