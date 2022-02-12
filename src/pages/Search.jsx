import React, { Component } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      isDisabled: true,
      albums: [],
      artist: '',
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });

    // verifica se o valor do inputname é maior ou igual a 2
    const MIN_CHAR = 2;
    const isValid = value.length >= MIN_CHAR;

    this.setState({
      isDisabled: !isValid,
    });
  };

  clickSearchArtist = (event) => {
    event.preventDefault();
    this.buttonGetApiAlbums();
  }

  // 04/02/2022 mentoria com Daniel Farias - sala do requisito 6
  // usar prevent default na hora de validar a api no botao de clicar
  // listar as musicas com um map após o form
  buttonGetApiAlbums = async () => {
    const { inputName } = this.state;
    const artist = inputName;
    const getAlbums = await searchAlbumsAPI(inputName);
    // console.log(getAlbums);
    this.setState({
      inputName: '',
      isDisabled: false,
      isLoading: false,
      albums: getAlbums,
      artist,
    });
  }

  // me inspirei no PR do Mário Fernando e achei mais interessante colocar o link em uma função para deixar o código mais organizado
  // link do PR  do Mário Fernando: https://github.com/tryber/sd-018-b-project-trybetunes/pull/30
  returnAlbumAndArtist = () => {
    const { artist, albums } = this.state;

    return (
      <div>
        {!albums.length ? <p>Nenhum álbum foi encontrado</p> : null}
        <h3>{`Resultado de álbuns de: ${artist}`}</h3>
        {albums.map(({ artistName, artworkUrl100, collectionId, collectionName }) => (
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
            key={ collectionId }
          >
            <div className="album-collection">
              <p>{ collectionName }</p>
              <img src={ artworkUrl100 } alt={ `Capa do album ${collectionName}` } />
              <p>{ artistName }</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  render() {
    const { isLoading, inputName, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <label htmlFor="search-artist-input">
            <input
              type="text"
              data-testid="search-artist-input"
              name="inputName"
              placeholder="Digite o nome do artista"
              value={ inputName }
              onChange={ this.handleChange }
            />
          </label>

          <button
            id="search-artist-button"
            type="submit"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ this.clickSearchArtist }
          >
            Pesquisar
          </button>
        </form>
        {!isLoading
          ? (this.returnAlbumAndArtist())
          : (<Loading />)}
      </div>
    );
  }
}

export default Search;
