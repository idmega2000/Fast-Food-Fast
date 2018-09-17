const navbarSlider = document.getElementById('header-sm-sc');

const drawNav = () => {
    const navDrawer = document.getElementById('slide-nav');
    navDrawer.classList.toggle("nav-slide-toggle");
};

if (navbarSlider) {
    navbarSlider.addEventListener('click', drawNav);
}



let rejectBtn = document.getElementsByClassName("reject-btn");
if (rejectBtn) {
    for (var i = rejectBtn.length; i--;) {
        rejectBtn[i].addEventListener('click', setModal, false);
    }

}

const moveDownwards = () => {
    document.body.scrollTop = 600; // For Safari
    document.documentElement.scrollTop = 600; // For Chrome, Firefox, IE and Opera
}

let scroolBotton = document.getElementById("arrowP");
scroolBotton.onclick = moveDownwards;

