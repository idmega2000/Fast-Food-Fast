let scroolBotton = document.getElementById("arrowP");
const navbarSlider = document.getElementById('header-sm-sc');
let rejectBtn = document.getElementsByClassName("reject-btn");

const drawNav = () => {
    const navDrawer = document.getElementById('slide-nav');
    navDrawer.classList.toggle("nav-slide-toggle");
};

if (navbarSlider) {
    navbarSlider.addEventListener('click', drawNav);
}

if (rejectBtn) {
    for (var i = rejectBtn.length; i--;) {
        rejectBtn[i].addEventListener('click', setModal, false);
    }

}

const moveDownwards = () => {
    document.body.scrollTop = 600;
    document.documentElement.scrollTop = 600;
}

if (scroolBotton) {
    scroolBotton.onclick = moveDownwards;
}


