
const errorHandle = document.getElementById('signUpErrorHandler');
const addMenuBtn = document.getElementById('addMenuBtn');
const loader = document.getElementById('loaderDiv');
const imageUpload = document.querySelector('.choose-img-btn');
const imgOutputDisplay = document.getElementById('uploaded-img-holder').src;

const removeImageBtn = document.querySelector('.remove-img-btn');

let holdImage = '';


const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dr4yibvoq/upload';
const CLOUDINARY_UPLOAD_PRESET = 'dnn2vfdk';

const doBeforClose = () => {
  this.event.preventDefault();
  this.event.returnValue = '';
  localStorage.removeItem('menuToEdit');
};

/* eslint-disable class-methods-use-this */
/**
 * Represents all the different fetch type to be done.
 */
class Menu extends Request {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.menuDetailToEdit = '';
  }

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
        errorHandle.innerHTML = 'Uploaded Image should not be more than 3mb';
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
    } else if (imgOutputDisplay && imgOutputDisplay !== '') {
      const partOfImage = imgOutputDisplay.split('.');
      if (!(partOfImage[partOfImage.length - 1].toLowerCase() === 'jpg'
      || partOfImage[partOfImage.length - 1].toLowerCase() === 'jpeg'
      || partOfImage[partOfImage.length - 1].toLowerCase() === 'png'
      || partOfImage[partOfImage.length - 1].toLowerCase() === 'git')
      ) {
        errorHandle.innerHTML = 'Please upload a valid image';
        return;
      }
      holdImage = imgOutputDisplay;
      this.addMenu();
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
        'Content-Type': 'application/x-ww-form-urlencoded'
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
    const menuDetail = this.menuDetailToEdit;
    const uDrl = `/menu/${menuDetail.menu_id}`;
    this.put(uDrl, allData)
      .then((res) => {
        if (res.error) {
          loader.style.display = 'none';
          errorHandle.innerHTML = res.error;
          return;
        }
        setTimeout(() => {
          window.removeEventListener('beforeunload', doBeforClose);
          location.href = 'all-food.html';
        },
        2000);
      });
  }

  /** This function load in the menu data from the localstorage
   * @returns {HTMLElement} returns the data in the form
  */
  LoadMenuData() {
    let menuDetail = localStorage.getItem('menuToEdit');
    if (!menuDetail) {
      location.href = 'add-fastfood.html';
      return;
    }
    menuDetail = JSON.parse(menuDetail);
    this.menuDetailToEdit = menuDetail;
    const menuName = document.getElementById('menuName');
    const menuPrice = document.getElementById('menuPrice');
    const menuCat = document.getElementById('menuCategory');
    const menuCategory = menuCat.options[menuCat.selectedIndex];
    const theImage = document.getElementById('uploaded-img-holder');
    menuName.value = menuDetail.menu_name;
    menuCat.value = menuDetail.menu_category;
    menuPrice.value = menuDetail.menu_price;
    menuCategory.value = menuDetail.menu_category;
    theImage.src = menuDetail.menu_image;
  }
}
const menu = new Menu();
menu.LoadMenuData();

if (addMenuBtn) {
  addMenuBtn.onclick = () => {
    menu.validateMenu();
  };
}
imageUpload.onchange = (event) => {
  const theImageDisplay = document.getElementById('uploaded-img-holder');
  theImageDisplay.src = URL.createObjectURL(event.target.files[0]);
};

removeImageBtn.onclick = () => {
  const theImageDisplay = document.getElementById('uploaded-img-holder');
  theImageDisplay.src = '';
  imageUpload.value = '';
};

window.addEventListener('beforeunload', doBeforClose, false);
