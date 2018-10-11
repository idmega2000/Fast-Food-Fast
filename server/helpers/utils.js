

// idea is gotten from sackoverfleow by csharptest.net
/**
     * This function validate the authentication input by user
     * @param {int} outputLength - the length of the random string output.
     * @returns {string} random string
     */
const getrandomString = (outputLength) => {
  const idNum = outputLength;
  let textOutput = '';
  const poss = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < idNum; i += 1) {
    textOutput += poss.charAt(Math.floor(Math.random() * poss.length));
  }
  return textOutput;
};


const getFileName = (originalName) => {
  const randomString = getrandomString(50);
  const nameOutput = (new Date().toISOString() + randomString + originalName);
  return nameOutput.replace(/:/g, '');
};

export default getFileName;
