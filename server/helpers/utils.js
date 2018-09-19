
<<<<<<< HEAD

=======
// idea is gotten from sackoverfleow
>>>>>>> implement get an order api accessing dummy data structure
const getId = () => {
  const idNum = 10;
  let textOutput = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
<<<<<<< HEAD
  for (let i = 0; i < idNum; i += 1) {
=======
  for (let i = 0; i < idNum; i++) {
>>>>>>> implement get an order api accessing dummy data structure
    textOutput += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return textOutput;
};

export default getId;
