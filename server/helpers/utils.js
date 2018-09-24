/**
     * This function generates a random alphanumeric string of 10
     * @returns {string} Returns alphanumeric string of length 10
     */
const getId = () => {
  const idNum = 10;
  let textOutput = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < idNum; i += 1) {
    textOutput += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return textOutput;
};

export default getId;
