import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { saveApiToken } from '../redux/actions';

class FirstApi extends Component {
  fetchApiToken = async () => {
    const { saveApi, history } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const responseToken = data.token;
    localStorage.setItem('token', responseToken);
    saveApi(responseToken);
    history.push('/game');
  };

  render() {
    const { validateButton } = this.props;
    return (
      <button
        type="button"
        disabled={ validateButton }
        data-testid="btn-play"
        onClick={ this.fetchApiToken }
      >
        Play
      </button>
    );
  }
}

FirstApi.propTypes = {
  saveApi: PropTypes.func.isRequired,
  validateButton: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveApi: (token) => dispatch(saveApiToken(token)),
});

export default connect(null, mapDispatchToProps)(FirstApi);
