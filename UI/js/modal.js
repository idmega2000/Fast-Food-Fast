// content and idea gotten from w3schools.com


const modal = document.getElementById('myModal');
const modalDel = document.getElementById('myModalDel');

const delAOrder = document.getElementById('delAOrder');
const editBtn = document.getElementsByClassName('edit-btn');
const rejectBtn = document.getElementsByClassName('reject-btn');
const modalBtn = document.getElementsByClassName('modal-btn');
const closeModal = document.getElementsByClassName('close')[0];
const closeModalButton = document.getElementById('closeModal');
const closeModalDbtn = document.getElementById('closeModaldel');

const setModal = () => {
  modal.style.display = 'block';
};


for (let i = 0; i < modalBtn.length; i += 1) {
  modalBtn[i].addEventListener('click', setModal, false);
}


const setDelModalMsg = () => {
  if (modal) {
    modal.style.display = 'none';
  }
  modalDel.style.display = 'block';
};

if (delAOrder) {
  delAOrder.onclick = () => {
    setDelModalMsg();
  };
}


if (closeModalButton) {
  closeModalButton.onclick = () => {
    modal.style.display = 'none';
  };
}
if (closeModalDbtn) {
  closeModalDbtn.onclick = () => {
    modalDel.style.display = 'none';
  };
}


if (closeModal) {
  closeModal.onclick = () => {
    modal.style.display = 'none';
  };
}

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

const setRedirect = (input) => {
  window.location.href = input;
};
