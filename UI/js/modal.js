// content and idea gotten from w3schools.com

let modal = document.getElementById('myModal');

let ModalBtn = document.getElementsByClassName("modal-btn");
// When the user clicks the button, open the modal 
const setModal = () => {
    modal.style.display = "block";
}

for (var i = ModalBtn.length; i--;) {
    ModalBtn[i].addEventListener('click', setModal, false);
}

let closeModal = document.getElementsByClassName("close")[0];



if (closeModal) {
    closeModal.onclick = function () {
        modal.style.display = "none";
    }
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//order modal end
// delete a food modal
let editBtn2 = document.getElementsByClassName("edit-btn");
let setRedirect = (input) => {
    window.location.href = input;
}

/*
    for (var i = editBtn.length; i--;) {
        editBtn[i].addEventListener('click', setRedirect('editfastfood.html'), false);
    }
*/