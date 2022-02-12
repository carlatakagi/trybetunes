import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

// 07/02/2022 para resolver o requisito 8 tive ajuda do meu amigo Mário Fernando
// 11/02/2022 jenni: depender do state nao é inteligente, state nao é síncrono
// 11/02/2022 boa prática deixar setado todos os estados que for utilizar desde o inicio
// quando dá reload na página, o state é resetado
class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.getFavoritesMusics();
  }

  // funcao que pega as musicas favoritas, quando tiver a resposta pega o data e checa se tem musica favorita
  getFavoritesMusics() {
    getFavoriteSongs()
      .then((data) => {
        this.checkFavoriteSong(data);
      });
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    const { music } = this.props;

    this.setState({
      isLoading: true,
    });

    if (checked) {
      await addSong(music);
      this.setState({
        isLoading: false,
        checked: true,
      });
    } else {
      await removeSong(music);
      this.setState({
        isLoading: false,
        checked: false,
      });
    }
  };

  checkFavoriteSong(data) {
    const { music } = this.props;

    const isFavoriteSong = data.some((song) => song.trackId === music.trackId);

    this.setState({
      checked: isFavoriteSong,
    });
  }

  render() {
    const { music } = this.props;
    console.log('console.log de music', music.trackName);
    const { checked, isLoading } = this.state;

    return (
      <div className="music-card-container">

        {isLoading ? (
          <Loading />
        ) : (

          <div className="audio-card-container">
            <h3>{ music.trackName }</h3>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>

            <label htmlFor="music">
              Favoritas
              <input
                id="music"
                type="checkbox"
                name={ music.trackId }
                checked={ checked }
                data-testid={ `checkbox-music-${music.trackId}` }
                onChange={ this.handleChange }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
  }).isRequired,
};
