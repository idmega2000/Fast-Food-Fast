
if (localStorage.getItem('token')) {
  const decoded = jwt_decode(localStorage.getItem('token'));
  if (decoded.userRole === 'user') {
    location.href = 'fastfood.html';
  } else {
    location.href = './admin/all-food.html';
  }
}
