import React from 'react'

const Artist = ({ artist }) => {
    if (!artist) return null;
    const { images, name, followers, genres } = artist;

    const imageStyle = {
        width: 250,
        height: 250,
        borderRadius: 125,
        objectFit: 'cover'
    }
    return (
        <div>
            <h3>{name}</h3>
            <p>{followers.total} followers</p>
            <p>{genres.join(', ')}</p>
            <img src={images[0] && images[0].url} alt='' style={imageStyle} />
        </div>
    )
}

export default Artist;