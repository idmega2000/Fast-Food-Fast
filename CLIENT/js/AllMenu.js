/* eslint-disable class-methods-use-this */
/**
 * Represents all the different fetch type to be done.
 */
class AllMenu extends Request {
  /**
           * This function post data to the endpoint
           * @returns {Promise} Returns the all information from the endpoint.
           */
  getAllMenu() {
    const uDir = '/menu';
    this.get(uDir)
      .then((res) => {
        this.loader(res.menu);
      });
  }

  /**
           * This function arrange all fected menu data in the page
           * @param {array} allArray this is all menu fetched.
           * @returns {HTMLElement} Returns the information from the endpoint.
           */
  loader(allArray) {
    allArray.forEach((element) => {
      const mId = element.menu_id;
      const mName = element.menu_name;
      const mPrice = element.menu_price;
      const mImage = element.menu_image;
      const name = document.querySelector('.main-body-container');
      name.innerHTML += ` <div class=" row col-4 order-a-meal">
          <div class="red-order-meals" data-id="${mId}" >
              <div class="order-image">
                  <img src="${mImage}" />
              </div>
              <div class="order-content">
                  <h3>${mName}</h3>
                  <p>Price: NGN ${mPrice}</p>
              </div>
              <div class="food-btn-div centerdiv">
                  <form action="edit-fastfood.html">
                      <button class=" ad-ev-btn edit-btn">Edit
                          <span style='font-size:20px;'>&#x270D;</span>
                      </button>
                  </form>
                  <button class="ad-ev-btn delete-btn modal-btn">Delete
                      <span style='font-size:20px;'>&#x232B;</span>
                  </button>
              </div>
          </div>
      </div>`;
    });
  }
}

const allMenu = new AllMenu();
allMenu.getAllMenu();
