// content and idea gotten from w3schools.com

let modal = document.getElementById('myModal');

let ModalBtn = document.getElementsByClassName("modal-btn");
let closeModal = document.getElementsByClassName("close")[0];
let editBtn2 = document.getElementsByClassName("edit-btn");

const setModal = () => {
    modal.style.display = "block";
}

for (var i = ModalBtn.length; i--;) {
    ModalBtn[i].addEventListener('click', setModal, false);
}

if (closeModal) {
    closeModal.onclick = () => {
        modal.style.display = "none";
    }
}

window.onclick =  (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let setRedirect = (input) => {
    window.location.href = input;
}

/*
    for (var i = editBtn.length; i--;) {
        editBtn[i].addEventListener('click', setRedirect('editfastfood.html'), false);
    }
*/