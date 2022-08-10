import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
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
    const { name, getScore } = this.props;
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
          { getScore }
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  name: store.player.name,
  email: store.player.gravatarEmail,
  getScore: store.player.score,
});

export default connect(mapStateToProps)(Header);
