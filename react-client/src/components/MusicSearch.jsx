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
    };
  }

  handleMusicInput() {
    // clear input
    this.setState({musicList: []})
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
        this.setState({musicList, resultCount: results.resultCount})
      },
      error:(err) => {
        console.log('handleMusicInput ajax error: ', err);
      }
    })

  }

  render() {
    return (
        <div>
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
          <div>Results: {this.state.resultCount}</div>
          <div>
            <table style={{width:'100%'}}>
              <tbody>
                <tr>
                  <th>Album Image</th>
                  <th>Artist Name</th>
                  <th>Track Name</th>
                  <th>Album Name</th>
                  <th>Lyrics</th>
                </tr>
                {this.state.musicList}
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

const buttonStyle = {
  textAlign: 'center',
  fontSize: '1rem',
  fontWeight: '200',
  background: 'transparent',
  borderRadius: '4px',
  margin: '20px 0',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  outline: 'none',
  border: '1px solid #FE7880',
  color: '#FE7880'
};

export default MusicSearch;
