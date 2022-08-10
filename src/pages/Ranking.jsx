import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  renderUsersScore = (usersScore) => (
    usersScore.map((user, index) => (
      <div key={ `${user}-${index}` }>
        <img src={ user.avatar } alt="User avatar" />
        <p data-testid={ `player-name-${index}` }>{user.playerName}</p>
        <p data-testid={ `player-score-${index}` }>{user.totalScore}</p>
      </div>
    ))
  );

  loadUsersScore = () => {
    const storageData = localStorage.getItem('usersRanking');
    if (storageData === null) return;
    const usersRanking = JSON.parse(storageData)
      .sort((curr, prev) => prev.totalScore - curr.totalScore);
    return this.renderUsersScore(usersRanking);
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <div>Ranking</div>
        {this.loadUsersScore()}
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClick }
        >
          voltar
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

// const mapStateToProps = (state) => ({})

// const mapDispatchToProps = {}

export default Ranking;
