const scrollButton = document.getElementById("arrowP");
const navbarSlider = document.getElementById('header-sm-sc');
const rejectBtn = document.getElementsByClassName("reject-btn");

const drawNav = () => {
    const navDrawer = document.getElementById('slide-nav');
    navDrawer.classList.toggle("nav-slide-toggle");
};


const setModal = () => {
    modal.style.display = "block";
} 

if (navbarSlider) {
    navbarSlider.addEventListener('click', drawNav);
}


const moveDownwards = () => {
    document.body.scrollTop = 600;
    document.documentElement.scrollTop = 600;
}

if (scrollButton) {
    scrollButton.onclick = moveDownwards;
}
