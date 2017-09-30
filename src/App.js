import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';

import qs from 'query-string';

// var Select = require('react-select');
import 'react-select/dist/react-select.css';

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

// var qps = qs.stringify({
//     method: 'track.search',
//     track:
//     api_key: "405d5c31c88edfb69ecb1e3e3e910e4e",
//     format: "json",
//     limit: 10,
// });

let headers = new Headers({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'multipart/form-data'
});

const getOptions = (input) => {
    let params = qs.stringify({
        method: 'track.search',
        track: input,
        api_key: "405d5c31c88edfb69ecb1e3e3e910e4e",
        format: "json",
        limit: 10,
    });
    return fetch(`http://ws.audioscrobbler.com/2.0/?${params}`, {method: 'GET', headers: headers})
        .then((response) => {
            return response.json();
        }).then((json) => {
            let x = formatResults(json);
            console.log(x);
            return {options: x};
        });
};

function formatResults(json) {
    let tracks = json.results.trackmatches.track;
    console.log('b', tracks);
    return tracks.map(function(track){
        let newVar = {label: `${track.artist} - ${track.name}`, value: track.mbid};
        return newVar;
    });
}

// var myRequest = new Request(`http://ws.audioscrobbler.com/2.0/${qps}`, {method: 'POST', body: '{"foo":"bar"}'});

// var getOptions = function(input, callback) {
//     setTimeout(function() {
//         callback(null, {
//             options: [
//                 { value: 'one', label: 'One' },
//                 { value: 'two', label: 'Two' }
//             ],
//             // CAREFUL! Only set this to true when there are no more options,
//             // or more specific queries will not be sent to the server.
//             complete: true
//         });
//     }, 500);
// };


// const getOptions = (input) => {
//     return fetch(`/users/${input}.json`)
//         .then((response) => {
//             return response.json();
//         }).then((json) => {
//             return { options: json };
//         });
// }

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
            I  👀 ⚠️
        </p>

          <Select.Async
            name="form-field-name"
            loadOptions={getOptions}
          />


      </div>
    );
  }
}

export default App;
