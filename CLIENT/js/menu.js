
const errorHandle = document.getElementById('signUpErrorHandler');
const addMenuBtn = document.getElementById('addMenuBtn');
const loader = document.getElementById('loaderDiv');

let holdImage = '';


const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dr4yibvoq/upload';
const CLOUDINARY_UPLOAD_PRESET = 'dnn2vfdk';

const fileUpload = document.getElementById('menuImage');


/* eslint-disable class-methods-use-this */
/**
 * Represents all the differnt fetch type to be done.
 */
class Menu extends Request {
  /**
     * This function post data to the endpoint
     * @returns {Promise} Returns the information from the endpoint.
     */
  authMenu() {
    // fileUpload.addEventListener('change', (event) => {
    const file = fileUpload.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-ww-form-urlendoded'
      },
      data: formData
    })
      .then((res) => {
        holdImage = res.data.secure_url;
        this.AddMenu();
        console.log(holdImage);
      })
      .catch((err) => {
        console.log(err);
      });
    // });
  }


  AddMenu() {
    const menuName = document.getElementById('menuName').value;
    const menuPrice = document.getElementById('menuPrice').value;
    const menuCat = document.getElementById('menuCategory');
    const menuCategory = menuCat.options[menuCat.selectedIndex].value;
    const allData = {
      menuName: menuName,
      menuPrice: menuPrice,
      menuCategory: menuCategory,
      menuImage: holdImage
    };
    const uDrl = '/menu';
    this.post(uDrl, allData)
      .then((res) => {
        if (res.error) {
          loader.style.display = 'none';
          errorHandle.innerHTML = res.error;
          return false;
        }
        setTimeout(() => {
          location.href = 'all-food.html';
        },
        2000);
      });
  }
}
const menu = new Menu();

if (addMenuBtn) {
  addMenuBtn.onclick = () => {
    loader.style.display = 'flex';
    menu.authMenu();
  };
}
