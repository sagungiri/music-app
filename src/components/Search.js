import React, { Component } from 'react';

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

class Search extends Component {
    state = {
        artistQuery: ''
    }

    updateArtistQuery = event => {
        //console.log(event.target.value)
        this.setState({ artistQuery: event.target.value })
    }
    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.searchArtist();
        }
    }

    searchArtist = () => {
        this.props.searchArtist(this.state.artistQuery);
    }
    render() {
        return (
            <div>
                <input placeholder='Search For an Artist'
                    onChange={this.updateArtistQuery}
                    onKeyPress={this.handleKeyPress}
                    style={inputStyle}
                />
                <button onClick={this.searchArtist} style={buttonStyle}>Search</button>
            </div>
        );
    }
}
export default Search; 