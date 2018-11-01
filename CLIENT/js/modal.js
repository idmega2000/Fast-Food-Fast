// content and idea gotten from w3schools.com


const modal = document.getElementById('myModal');
const modalDel = document.getElementById('myModalDel');

const modalBtn = document.getElementsByClassName('modal-btn');
const closeModal = document.getElementsByClassName('close')[0];
const closeModalButton = document.getElementById('closeModal');
const closeModalDbtn = document.getElementById('closeModaldel');


const closeOrderModal = document.querySelectorAll('.close-order-modal');
const userOrderScript = document.getElementById('user-order-script');

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

