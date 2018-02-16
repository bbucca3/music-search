import React, { Component } from 'react'
import $ from 'jquery';

import MusicInfo from './MusicInfo.jsx';

class MusicSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicInput: "",
      musicList: [],
      resultCount: 0,
      showResults: false
    };
  }

  handleMusicInput() {
    // clear input for new search
    this.setState({musicList: []});

    // if I had more time here I would sanitize the input string
    // also I would take precautions on the server side xss injection
    
    // search for artists and songs
    $.ajax({
      type:'POST',
      url:'/api/musicsearch',
      data:{musicInput: this.state.musicInput},
      success:(results) => {
        console.log('music results ', results)
        let musicList = results.results.map((item, key) => {
          return <MusicInfo
                  key={item.trackId}
                  trackName={item.trackName}
                  artistName={item.artistName}
                  albumName={item.collectionName}
                  albumArt={item.artworkUrl60} />
        })
        console.log('musicList: ', musicList)
        this.setState({musicList, resultCount: results.resultCount, showResults: true})
      },
      error:(err) => {
        console.log('handleMusicInput ajax error: ', err);
      }
    })

  }

  render() {
    return (
        <div style={container}>
          <h3>Search for Musical Artist or Song: {this.state.musicInput}</h3>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="enter search term"
              onChange={event => this.setState({musicInput: event.target.value})}
            />
            <button
              className="form-control"
              style={buttonStyle}
              onClick={() => this.handleMusicInput()}
            >
              Submit
            </button>
          </div>
          {this.state.showResults && <div>Results: {this.state.resultCount}</div>}
          {this.state.showResults && <div>
              <table style={{width:'100%'}}>
                <tbody>
                  <tr>
                    <th>Album Image</th>
                    <th>Artist Name</th>
                    <th>Track Name</th>
                    <th>Album Name</th>
                    <th>View Lyrics</th>
                  </tr>
                  {this.state.musicList}
                </tbody>
              </table>
            </div>}
        </div>
    );
  }
}

const container = {
  width: '90%',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const buttonStyle = {
  textAlign: 'center',
  fontSize: '1rem',
  fontWeight: '200',
  background: 'transparent',
  borderRadius: '4px',
  margin: '10px 0',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  outline: 'none',
  border: '1px solid darkGreen',
  color: 'darkGreen'
};

export default MusicSearch;
