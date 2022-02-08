import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

// 07/02/2022 para resolver o requisito 8 tive ajuda do meu amigo Mário Fernando
class MusicCard extends Component {
  constructor(props) {
    super(props);

    const { trackId } = this.props;

    this.state = {
      isLoading: false,
      trackId,
    };
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    const { music } = this.props;
    console.log(`valor do checked: ${checked}`);
    this.setState({
      isLoading: true,
    });

    if (checked) {
      // music.find((music) => music.trackId === name);
      await addSong(music);
      this.setState({
        isLoading: false,
        checked: true,
      });
    }
    await removeSong(music);
    this.setState({
      checked: false,
    });
  };

  render() {
    const { music } = this.props;
    const { previewUrl, trackName } = music;
    const { trackId, isLoading, checked } = this.state;

    return (
      <div className="music-card-container">

        {isLoading ? (
          <Loading />
        ) : (

          <div className="audio-card-container">
            <h3>{trackName}</h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>

            <label htmlFor="music">
              Favorita
              <input
                id="music"
                type="checkbox"
                name={ trackId }
                checked={ checked }
                data-testid={ `checkbox-music-${trackId}` }
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
    /* find: PropTypes.func.isRequired, */
  }).isRequired,
  trackId: PropTypes.number.isRequired,
};
