
/* eslint-disable class-methods-use-this */
/**
 * Represents all the different fetch type to be done.
 */
class AllMenu {
  /**
         * This function post data to the endpoint
         * @param {string} uDir - the request object.
         * @returns {Promise} Returns the information from the endpoint.
         */
  get(uDir) {
    const url = `${hostUrl}${uDir}`;
    return fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(res => res.json());
  }

  /**
         * This function create and add dom element
         * @param {array} allArray - the array of all menu.
         * @returns {innerHTML} Returns the mencu content that are avialble.
         */
  loader(allArray) {
    allArray.forEach((element) => {
      const mId = element.menu_id;
      const mName = element.menu_name;
      const mPrice = element.menu_price;
      const mImage = element.menu_image;
      const name = document.querySelector('.main-body-container');
      name.innerHTML += `
          <div class="row col-4 order-a-meal">
              <div class="red-order-meals" data-id="${mId}">
                  <div class="order-image">
                      <img src="${mImage}" />
                  </div>
                  <div class="order-content">
                      <h3>${mName}</h3>
                      <p>Price: NGN ${mPrice}</p>
  
                  </div>
                  <div>
                      <button id="orderBtn" class="order-btn modal-btn">Add to Cart</button>
  
  
                  </div>
              </div>
   
          `;
    });
  }

  /**
         * This function post data to the endpoint
         * @returns {Promise} Returns the information from the endpoint.
         */
  getAllMenu() {
    const uDir = '/menu';
    this.get(uDir)
      .then((res) => {
        this.loader(res.menu);
      });
  }
}

const allMenu = new AllMenu();
allMenu.getAllMenu();
