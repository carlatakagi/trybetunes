import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isLoading: true,
    };
  }

  // ref: https://pt-br.reactjs.org/docs/state-and-lifecycle.html
  componentDidMount() {
    this.recoverUserName();
  }

  recoverUserName = async () => {
    const getUserName = await getUser();
    this.setState({
      inputName: getUserName.name,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, inputName } = this.state;

    return (
      <header data-testid="header-component">
        <nav className="header-container">
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        {isLoading ? (<Loading />) : (
          <div className="user">
            <p data-testid="header-user-name">{`Usuário: ${inputName}`}</p>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
