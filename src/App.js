import React, { Component } from 'react';
import './App.css';
import Artist from './components/Artist';
import Tracks from './components/Tracks'

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com/'

const inputStyle = {
  padding: 5,
  fontSize: 20,
  width: '20%',
  marginRight: 15
}
const buttonStyle = {
  padding: 8,
  fontSize: 20,
  backgroundImage: 'linear-gradient(90deg, rgba(22,11,228,1) 0%, rgba(27,27,205,1) 49%, rgba(0,194,255,1) 100%)',
  borderRadius: 20,
  width: '10%',
  color: 'white',
  border: 'none'
}
class App extends Component {
  state = {
    artistQuery: '',
    artist: null,
    tracks: []
  }


  updateArtistQuery = event => {
    //console.log(event.target.value)
    this.setState({ artistQuery: event.target.value })
  }
  searchArtist = () => {
    // console.log(this.state)
    fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
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
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.searchArtist();
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className='App'>
        <h3>Music Master</h3>
        <input placeholder='Search For an Artist'
          onChange={this.updateArtistQuery}
          onKeyPress={this.handleKeyPress}
          style={inputStyle}
        />
        <button onClick={this.searchArtist} style={buttonStyle}>Search</button>
        <Artist artist={this.state.artist} />
        <Tracks tracks={this.state.tracks} />
      </div>
    )
  }
}

export default App;
