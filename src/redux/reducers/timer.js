import { SET_TIME_LEFT, DISABLE_BUTTONS } from '../actions';

const INITIAL_STATE = {
  timeLeft: 0,
  disableButtons: false,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TIME_LEFT:
    return {
      ...state,
      timeLeft: action.timeLeft,
    };
  case DISABLE_BUTTONS:
    return {
      ...state,
      disableButtons: true,
    };
  default:
    return state;
  }
};

export default timer;
