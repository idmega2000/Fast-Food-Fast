const scrollButton = document.getElementById('arrowP');
const navbarSlider = document.getElementById('header-sm-sc');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const compOrdDiv = document.getElementById('compOrdDiv');
const canBookBtn = document.getElementById('canBookBtn');


if (placeOrderBtn) {
  placeOrderBtn.onclick = () => {
    compOrdDiv.style.display = 'block';
    document.body.scrollTop = 550;
    document.documentElement.scrollTop = 550;
  };
}

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


const moveDownwards = () => {
  document.body.scrollTop = 600;
  document.documentElement.scrollTop = 600;
};

if (scrollButton) {
  scrollButton.onclick = moveDownwards;
}
