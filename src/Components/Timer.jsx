import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { disableButtons, setTimeLeft } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    this.handleTimer();
  }

  componentDidUpdate() {
    this.handleTimer();
  }

  resetTimer = () => {
    this.setState({ timer: 30 });
  };

  handleTimer = () => {
    const { timer } = this.state;
    const { stopTimer, dispatchTimeLeft, dispatchDisableButtons } = this.props;

    if (timer > 0 && !stopTimer) {
      this.timer = setTimeout(() => {
        this.setState({
          timer: timer - 1,
        });
      }, '1000');
    }
    if (timer > 0 && stopTimer) {
      dispatchTimeLeft(timer);
    }
    if (timer === 0) {
      dispatchDisableButtons();
    }
  }

  render() {
    const { timer } = this.state;

    return (
      <div>
        <h2>{ timer }</h2>
      </div>
    );
  }
}

Timer.propTypes = {
  stopTimer: PropTypes.bool.isRequired,
  dispatchTimeLeft: PropTypes.func.isRequired,
  dispatchDisableButtons: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchTimeLeft: (timeLeft) => dispatch(setTimeLeft(timeLeft)),
  dispatchDisableButtons: () => dispatch(disableButtons()),
});

export default connect(null, mapDispatchToProps)(Timer);
