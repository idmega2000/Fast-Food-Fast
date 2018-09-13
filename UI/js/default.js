const navbarSlider = document.getElementById('header-sm-sc');

const drawNav = () => {
  const navDrawer = document.getElementById('slide-nav');
  navDrawer.classList.toggle("nav-slide-toggle");
};

if (navbarSlider) {
    navbarSlider.addEventListener('click', drawNav);
}


// content and idea gotten from w3schools.com
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementsByClassName("modal-btn");

// iterate over all the elements
for (var i= btn.length; i--;) {
  btn[i].addEventListener('click', setModal, false);
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
 function setModal() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//order modal end
var editbtn = document.getElementsByClassName("edit-btn");

// iterate over all the elements
for (var i= editbtn.length; i--;) {
    editbtn[i].addEventListener('click', setRedirect , false);
}

var editbtn = document.getElementsByClassName("delete-btn");

function setRedirect() {
    window.location.href = 'editpage.html';
}
