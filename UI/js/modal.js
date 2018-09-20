// content and idea gotten from w3schools.com

const modal = document.getElementById('myModal');

const modalBtn = document.getElementsByClassName("modal-btn");
const closeModal = document.getElementsByClassName("close")[0];
const editBtn = document.getElementsByClassName("edit-btn");

const setModal = () => {
    modal.style.display = "block";
}

for (let i = modalBtn.length; i--;) {
    modalBtn[i].addEventListener('click', setModal, false);
}

if (closeModal) {
    closeModal.onclick = () => {
        modal.style.display = "none";
    }
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let setRedirect = (input) => {
    window.location.href = input;
}

/*
for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].onclick = setRedirect('edit-fastfood.html');
}
*/
