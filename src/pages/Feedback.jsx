import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../Components/Header';

class Feedback extends Component {
  componentDidMount() {
    this.handleUsersScore();
  }

  getAvatar = (playerEmail) => {
    const hash = md5(playerEmail).toString();
    const imagem = `https://www.gravatar.com/avatar/${hash}`;
    return imagem;
  }

  handleUsersScore = () => {
    const { totalScore, playerName, playerEmail } = this.props;
    const avatar = this.getAvatar(playerEmail);
    const currData = {
      totalScore,
      playerName,
      avatar,
    };

    if (localStorage.getItem('usersRanking') === null) {
      localStorage.setItem('usersRanking', JSON.stringify([currData]));
    } else {
      const oldData = localStorage.getItem('usersRanking');
      const recuperedData = JSON.parse(oldData);
      const newArray = [...recuperedData, currData];
      localStorage.setItem('usersRanking', JSON.stringify(newArray));
    }
  }

  handlePlayAgain = () => {
    const { history, clearData } = this.props;
    clearData();
    history.push('/');
  }

  message = () => {
    const { totalAssertions } = this.props;
    const mediumResult = 3;
    if (totalAssertions < mediumResult) return 'Could be better...';
    if (totalAssertions >= mediumResult) return 'Well Done!';
  }

  handleGoRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    // const { totalAssertions, totalScore } = this.props;
    const { totalScore, playerName, playerEmail, totalAssertions } = this.props;
    console.log('totalScore: ', totalScore);
    console.log('playerName: ', playerName);
    console.log('playerEmail: ', playerEmail);
    return (
      <div data-testid="settings-title">
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handlePlayAgain }
        >
          Jogar novamente
        </button>
        <p data-testid="feedback-text">{this.message()}</p>
        <p>
          {'Final Score: '}
          <span data-testid="feedback-total-score">{totalScore}</span>
        </p>
        <p>
          {'Total Assertions: '}
          <span data-testid="feedback-total-question">{totalAssertions}</span>
        </p>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.handleGoRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  totalAssertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  totalAssertions: store.player.assertions,
  totalScore: store.player.score,
  playerName: store.player.name,
  playerEmail: store.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
