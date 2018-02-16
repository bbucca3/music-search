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
    console.log('lyrics props: ', props)
    //API: <a href={this.state.url} target='_'>LINK </a>
  }

  componentDidMount() {
    let artist = this.props.location.query.artistName.split(' ').join('+')
    let song = this.props.location.query.trackName.split(' ').join('+')
    $.ajax({
      type:'POST',
      url:'/api/lyricsearch',
      data:{artist, song},
      success: (results) => {
        console.log('client lyrics results: ', results)
        // this.setState({lyrics: song['lyrics']}, () => {
        //   console.log('setState lyrics: ', this.state.results)
        // })
        this.setState({song: results}, () => {
          console.log('setState cb ', this.state)
        })
      },
      error: (err) => {
        console.log('client lyrics error: ', err)
        this.setState({statusText: err.statusText})
      }
    })
  }

  render() {
    return (
      <div>
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
                <td><img src={this.props.location.hash.albumArt} alt={this.props.location.hash.trackName}/></td>
                <td>{this.props.location.hash.artistName}</td>
                <td>{this.props.location.hash.trackName}</td>
                <td>{this.props.location.hash.albumName}</td>
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

export default LyricsInfo;
