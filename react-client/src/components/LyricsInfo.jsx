import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

class LyricsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusText: '',
      song: {}
    }
  }

  componentDidMount() {
    let artist = this.props.location.query.artistName.split(' ').join('+')
    let song = this.props.location.query.trackName.split(' ').join('+')
    $.ajax({
      type:'POST',
      url:'/api/lyricsearch',
      data:{artist, song},
      success: (results) => {
        this.setState({song: results}, () => {
          console.log('setState callback: ', this.state)
        })
      },
      error: (err) => {
        this.setState({statusText: err.statusText})
      }
    })
  }

  render() {
    return (
      <div style={container}>
        <h2><Link to="/">New Search</Link></h2>
        <div>
          <table style={{width:'100%'}}>
            <tbody>
              <tr>
                <th>Album Image</th>
                <th>Artist Name</th>
                <th>Track Name</th>
                <th>Album Name</th>
              </tr>
              <tr>
                <td><img src={this.props.location.query.albumArt} alt={this.props.location.query.trackName}/></td>
                <td>{this.props.location.query.artistName}</td>
                <td>{this.props.location.query.trackName}</td>
                <td>{this.props.location.query.albumName}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>View Lyrics</h2>
          {this.state.statusText}
          <div>{this.state.song.toString()}</div>
        </div>
      </div>
    )
  }
}

const container = {
  width: '90%',
  marginLeft: 'auto',
  marginRight: 'auto'
};

export default LyricsInfo;
