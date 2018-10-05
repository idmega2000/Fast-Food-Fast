const token = localStorage.getItem('token');
const decoded = jwt_decode(token);
if (decoded.userRole !== 'admin') {
  if (!token) {
    window.location.href = 'login.html';
  }
}
