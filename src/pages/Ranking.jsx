import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <div data-testid="ranking-title">Ranking</div>
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
