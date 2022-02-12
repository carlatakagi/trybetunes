import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
      albumArtist: '',
    };
  }

  // montar o elemento
  componentDidMount() {
    this.getMusicList();
  }

  // funcao para pegar a lista com o id
  // desestruturo o id para poder pegar as musicas pelo id que está dentro de params que está dentro de match
  getMusicList = async () => {
    const { match: { params: { id } } } = this.props;
    const getlistMusics = await getMusics(id);
    // console.log(getlistMusics);
    const albumName = getlistMusics[0]; // para pegar a posição que tem as infos do album - nome artista etc
    // console.log(albumName);
    this.setState({
      musicList: getlistMusics,
      albumArtist: albumName,
    });
  }

  render() {
    const { musicList, albumArtist } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        <div className="album-page">
          <h3 data-testid="artist-name">
            {albumArtist.artistName}
          </h3>
          <h3 data-testid="album-name">
            {albumArtist.collectionName}
          </h3>
          <img
            src={ albumArtist.artworkUrl100 }
            alt={ `Capa do Album ${albumArtist.collectionName}` }
          />

        </div>
        <div>
          {musicList.slice(1).map((music) => (
            <MusicCard
              music={ music }
              key={ music.trackName }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }),
  }).isRequired,
};
