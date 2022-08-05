import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  getAvatar = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    const imagem = `https://www.gravatar.com/avatar/${hash}`;
    return imagem;
  }

  render() {
    const { name } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ this.getAvatar() }
          alt="avatar"
        />
        <h3
          data-testid="header-player-name"
        >
          { name }
        </h3>
        <p
          data-testid="header-score"
        >
          0
        </p>
      </header>
    );
  }
}

export default connect()(Header);
