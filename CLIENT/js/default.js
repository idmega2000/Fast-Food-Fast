
const hostUrl = 'http://localhost:3000/api/v1';
//const hostUrl = 'https://fast-food-fast-idris.herokuapp.com/api/v1';

const scrollButton = document.getElementById('arrowP');
const navbarSlider = document.getElementById('header-sm-sc');
const adminNavbarSlider = document.querySelectorAll('.admin-header-bars')[0];
const compOrdDiv = document.getElementById('compOrdDiv');
const canBookBtn = document.getElementById('canBookBtn');


if (canBookBtn) {
  canBookBtn.onclick = () => {
    compOrdDiv.style.display = 'none';
  };
}

const drawNav = () => {
  const navDrawer = document.getElementById('slide-nav');
  navDrawer.classList.toggle('nav-slide-toggle');
};


if (navbarSlider) {
  navbarSlider.addEventListener('click', drawNav);
}
if (adminNavbarSlider) {
  adminNavbarSlider.addEventListener('click', drawNav);
}

const moveDownwards = () => {
  document.body.scrollTop = 600;
  document.documentElement.scrollTop = 600;
};

if (scrollButton) {
  scrollButton.onclick = moveDownwards;
}

const quantityHolder = document.querySelectorAll('.quantity-amount-holder');
if (quantityHolder.length > 0 && localStorage.getItem('totalQuantity')) {
  quantityHolder[0].innerHTML = localStorage.getItem('totalQuantity');
  quantityHolder[1].innerHTML = localStorage.getItem('totalQuantity');
}
