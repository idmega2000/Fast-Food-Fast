const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

const loggoutUser = () => {
  localStorage.clear();
  location.href = './login.html';
};
