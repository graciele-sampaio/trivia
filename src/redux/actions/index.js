export const SAVE_API_TOKEN = 'SAVE_API_TOKEN';

export const saveApiToken = (token) => ({
  type: SAVE_API_TOKEN,
  token,
});
