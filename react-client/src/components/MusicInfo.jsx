import React, { Component } from 'react';
import { Link } from 'react-router';

class MusicInfo extends Component {
  constructor(props) {
    super(props);
    // console.log('hello music props: ', props)
  }

  render() {
    return (
      <tr>
        <td><img src={this.props.albumArt} alt={this.props.trackName}/></td>
        <td>{this.props.artistName}</td>
        <td>{this.props.trackName}</td>
        <td>{this.props.albumName}</td>
        <td><Link to={{ pathname: '/lyrics',
                        query: {
                          artistName: this.props.artistName,
                          trackName: this.props.trackName,
                          albumName: this.props.albumName,
                          albumArt: this.props.albumArt
                        },
                        hash: {
                          artistName: this.props.artistName,
                          trackName: this.props.trackName,
                          albumName: this.props.albumName,
                          albumArt: this.props.albumArt
                        },
                        search: {
                          artistName: this.props.artistName,
                          trackName: this.props.trackName,
                          albumName: this.props.albumName,
                          albumArt: this.props.albumArt
                        }
                      }}
            >
              View Lyrics
            </Link>
        </td>
      </tr>
    )
  }
}

export default MusicInfo;
