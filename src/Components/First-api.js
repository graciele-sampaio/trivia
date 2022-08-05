export default fetchApiToken = () => {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const responseToken = data.token;
  };
};
