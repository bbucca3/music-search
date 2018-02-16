import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import MusicSearch from './components/MusicSearch.jsx';
import LyricsInfo from './components/LyricsInfo.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 id="appTitle">Music Search</h1>
        <MusicSearch />
      </div>
    )
  }
}

ReactDOM.render(<Router history={browserHistory}>
                  <Route path="/" component={MusicSearch}/>
                  <Route path="/lyrics" component={LyricsInfo}/>
                </Router>, document.getElementById('app'));
