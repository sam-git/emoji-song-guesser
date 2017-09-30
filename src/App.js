import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';

import qs from 'query-string';

import 'react-select/dist/react-select.css';

let _getOptions = (input) => {
    let params = qs.stringify({
        method: 'track.search',
        track: input,
        api_key: "405d5c31c88edfb69ecb1e3e3e910e4e",
        format: "json",
        limit: 6,
    });
    return fetch(`http://ws.audioscrobbler.com/2.0/?${params}`)
        .then((response) => {
            return response.json();
        }).then((json) => {
            let x = formatResults(json);
            console.log(input);
            console.log(JSON.stringify(x, null, '\t'));
            return {options: x};
        });
};

let getOptions = _getOptions;

function formatResults(json) {
    if (!json.results) {};
    let tracks = json.results.trackmatches.track;
    return tracks.map(function(track){
        if (track.mbid === '') track.mbid = Math.random();
        let newVar = {label: `${track.artist} - ${track.name}`, value: track.mbid};
        return newVar;
    });
}

function filterOption() {
    return true;
}

console.log('⚠️');

let songs = [
    {clue:{__html:'I  👀 ⚠️'}, mbid:"67841d9d-7ce6-435f-8b34-1a27600018a6"},
    {clue:{__html:`<code style={display: block}>⬛️ ⬛️ ⬛</code> <code style={display: block}>⬛️ 🔙🔙️ ⬛</code> <code style={display: block}>⬛️ ⬛️ ⬛</code>️`}, mbid:"dunno"}
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro" dangerouslySetInnerHTML={songs[0].clue}></p>

          <Select.Async
            name="form-field-name"
            loadOptions={getOptions}
            filterOption={filterOption}
            value="one"
          />


      </div>
    );
  }
}

export default App;


