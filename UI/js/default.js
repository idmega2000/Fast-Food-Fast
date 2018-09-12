const navbarSlider = document.getElementById('header-sm-sc');

const drawNav = () => {
  const navDrawer = document.getElementById('slide-nav');
  navDrawer.classList.toggle("nav-slide-toggle");
};

if (navbarSlider) {
    navbarSlider.addEventListener('click', drawNav);
}


