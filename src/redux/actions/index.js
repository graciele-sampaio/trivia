export const SAVE_API_TOKEN = 'SAVE_API_TOKEN';
export const SAVE_DATA_USER = 'SAVE_DATA_USER';
export const SET_TIME_LEFT = 'SET_TIME_LEFT';
export const DISABLE_BUTTONS = 'DISABLE_BUTTONS';

export const saveApiToken = (token) => ({
  type: SAVE_API_TOKEN,
  token,
});

export const saveDataUser = (dataUser) => ({
  type: SAVE_DATA_USER,
  dataUser,
});

export const setTimeLeft = (timeLeft) => ({
  type: SET_TIME_LEFT,
  timeLeft,
});

export const disableButtons = () => ({
  type: DISABLE_BUTTONS,
});
