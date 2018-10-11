const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

const loggoutUser = () => {
  localStorage.removeItem('token');
  location.href = './login.html';
}
