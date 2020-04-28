import React, { Component } from 'react';
import './App.css';
import Artist from './components/Artist';
import Tracks from './components/Tracks';
import Search from './components/Search'

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com/'


class App extends Component {
  state = {
    artist: null,
    tracks: []
  }

  componentDidMount() {
    this.searchArtist('metallica')
  }

  searchArtist = artistQuery => {
    // console.log(this.state)
    fetch(`${API_ADDRESS}/artist/${artistQuery}`)
      .then(res => res.json())
      .then(json => {
        // console.log(json)
        if (json.artists.total > 0) {
          const artist = json.artists.items[0]

          this.setState({ artist })

          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
            .then(res => res.json())
            .then(json => {
              //console.log(json)
              this.setState({ tracks: json.tracks })
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }


  render() {
    //console.log(this.state)
    return (
      <div className='App'>
        <h2>Music Master</h2>
        <Search searchArtist={this.searchArtist} />
        <Artist artist={this.state.artist} />
        <Tracks tracks={this.state.tracks} />
      </div>
    )
  }
}

export default App;
