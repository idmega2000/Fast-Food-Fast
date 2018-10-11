
const errorHandle = document.getElementById('signUpErrorHandler');
const addMenuBtn = document.getElementById('addMenuBtn');
const loader = document.getElementById('loaderDiv');

let holdImage = '';


const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dr4yibvoq/upload';
const CLOUDINARY_UPLOAD_PRESET = 'dnn2vfdk';


/* eslint-disable class-methods-use-this */
/**
 * Represents all the differnt fetch type to be done.
 */
class Menu extends Request {
  /**
     * This function validates the menu inputs
     * @returns {object} Returns the error.
     */
  validateMenu() {
    const menuName = document.getElementById('menuName').value;
    const menuPrice = document.getElementById('menuPrice').value;
    const menuCat = document.getElementById('menuCategory');
    const menuCategory = menuCat.options[menuCat.selectedIndex].value;
    const menuImage = document.getElementById('menuImage');

    const alphnumaOnly = (/^[a-zA-Z0-9 ]*$/);
    const name = menuName;
    const price = menuPrice;
    const category = menuCategory;
    const image = menuImage;
    const IntPrice = Number(price);

    if (!name || !price || !category) {
      errorHandle.innerHTML = 'Please fill all field';
      return false;
    }
    if (typeof name !== 'string'
      || typeof price !== 'string'
      || typeof category !== 'string') {
      errorHandle.innerHTML = 'Invalid input type';
      return false;
    }
    if ((name.match(/^\s*$/)) || (price.match(/^\s*$/)) || (category.match(/^\s*$/))) {
      errorHandle.innerHTML = 'Input can only contain alphanumeric char';
      return;
    }

    if (!name.match(alphnumaOnly)) {
      errorHandle.innerHTML = 'Menu Name should be alphabet numbers and space';
      return;
    }
    if (!category.match(alphnumaOnly)) {
      errorHandle.innerHTML = 'Menu Category should be alphabet numbers and space';
      return;
    }
    if (category === 'Select Category') {
      errorHandle.innerHTML = 'Please select a Category';
      return;
    }
    if (name.length < 4) {
      errorHandle.innerHTML = 'menu Name should be three character and above';
      return;
    }
    if (category.length < 4) {
      errorHandle.innerHTML = 'Menu Category can only be three character and above';
      return;
    }
    if (name.length > 40) {
      errorHandle.innerHTML = 'Menu Name should be less than 40 char';
      return;
    }
    if (category.length > 40) {
      errorHandle.innerHTML = 'Menu category should be less than 40 char';
      return;
    }

    if (IntPrice < 1) {
      errorHandle.innerHTML = 'Price should be NGN 1 amd above';
      return;
    }
    if (!Number.isInteger(IntPrice)) {
      errorHandle.innerHTML = 'Price can only be integer';
      return;
    }
    if (image.value !== '') {
      if (image.files[0].size > 3145728) {
        errorHandle.innerHTML = 'Uploaded Image should not be moret than 3mb';
        return;
      }
      const partOfImage = image.files[0].name.split('.');
      if (!(partOfImage[partOfImage.length - 1].toLowerCase() === 'jpg'
        || partOfImage[partOfImage.length - 1].toLowerCase() === 'jpeg'
        || partOfImage[partOfImage.length - 1].toLowerCase() === 'png'
        || partOfImage[partOfImage.length - 1].toLowerCase() === 'git')
      ) {
        errorHandle.innerHTML = 'Please upload a valid image';
      } else {
        loader.style.display = 'flex';
        this.uploadMenuImage();
      }
    } else {
      this.addMenu();
    }
  }


  /**
     * This function post data to the endpoint
     * @returns {Promise} Returns the information from the endpoint.
     */
  uploadMenuImage() {
    const fileUpload = document.getElementById('menuImage');
    const file = fileUpload.files[0];
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
        this.addMenu();
      });
  }

  /**
     * This function post data to the endpoint
     * @returns {Promise} Returns the information from the endpoint.
     */
  addMenu() {
    loader.style.display = 'flex';
    const menuName = document.getElementById('menuName').value;
    const menuPrice = document.getElementById('menuPrice').value;
    const menuCat = document.getElementById('menuCategory');
    const menuCategory = menuCat.options[menuCat.selectedIndex].value;
    const allData = {
      menuName,
      menuPrice,
      menuCategory,
      ...(holdImage !== '' && { menuImage: holdImage })

    };
    const uDrl = '/menu';
    this.post(uDrl, allData)
      .then((res) => {
        if (res.error) {
          loader.style.display = 'none';
          errorHandle.innerHTML = res.error;
          return;
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
    menu.validateMenu();
  };
}
