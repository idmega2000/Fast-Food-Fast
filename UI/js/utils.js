const acceptBtn = document.getElementsByClassName('accept-btn');
const declineBtn = document.getElementsByClassName('reject-btn');
const checkBtn = document.getElementsByClassName('completed-checkbox');

if (acceptBtn) {
  for (let i = 0; i < acceptBtn.length; i += 1) {
    acceptBtn[i].onclick = () => {
      declineBtn[i].disabled = true;
      declineBtn[i].classList.add('disabled-hover');
      checkBtn[i].disabled = false;
      checkBtn[i].classList.add('is-accepted');
    };
  }
}

if (declineBtn) {
  for (let i = 0; i < acceptBtn.length; i += 1) {
    declineBtn[i].onclick = () => {
      acceptBtn[i].disabled = true;
      acceptBtn[i].classList.add('disabled-hover');
    };
  }
}
