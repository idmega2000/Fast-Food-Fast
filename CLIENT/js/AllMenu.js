
/* eslint-disable class-methods-use-this */
/**
 * Represents all the different fetch type to be done.
 */
class AllMenu extends Request {
  /**
   * @constructs the all menu data
   */
  constructor() {
    super();
    this.allMenuData = '';
  }

  /**
     * This function post data to the add menu endpoint
     * @returns {Promise} Returns the all information from the endpoint.
     */
  getAllMenu() {
    const uDir = '/menu';
    this.get(uDir)
      .then((res) => {
        this.allMenuData = res.menu;
        this.loader(res.menu);
      });
  }

  /**
         * This function arrange all fetched menu data in the page
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
          <div class="red-order-meals" data-menuId="${mId}" >
              <div class="order-image">
                  <img src="${mImage}" />
              </div>
              <div class="order-content">
                  <h3>${mName}</h3>
                  <p>Price: NGN ${mPrice}</p>
              </div>
              <div class="food-btn-div centerdiv">
                      <button class=" ad-ev-btn edit-btn">Edit
                          <span class="menu-icons"> &#x270D;</span>
                      </button>
                  <button class="ad-ev-btn delete-btn modal-btn">Delete
                      <span class="menu-icons"> &#x232B;</span>
                  </button>
              </div>
          </div>
      </div>`;
    });
    this.deleteMenu();
    this.editMenuClick();
  }

  /**
         * This function deletes a menu
         * @returns {HTMLElement} Returns the information from the endpoint.
         */
  deleteMenu() {
    const deleteBtns = document.querySelectorAll('.delete-btn');
    const menuDiv = document.querySelectorAll('.order-a-meal');
    const modal = document.querySelectorAll('.modal')[0];
    const closeModal = document.getElementsByClassName('close')[0];
    for (let i = 0; i < deleteBtns.length; i += 1) {
      deleteBtns[i].onclick = () => {
        modal.style.display = 'block';
        const menuName = document.querySelectorAll('.order-content h3')[i].innerHTML;
        document.querySelector('.modal-header h3').innerHTML = menuName;
        const yesButton = document.querySelector('.yes-del-btn');
        const noButton = document.querySelector('.no-del-btn');
        const warningBody = document.querySelector('.warning-modal-body');
        const successBody = document.querySelector('.success-modal-body');
        const menuId = document.querySelectorAll('.red-order-meals')[i].getAttribute('data-menuId');
        yesButton.onclick = () => {
          const endpointDir = `/menu/${menuId}`;
          this.delete(endpointDir)
            .then((res) => {
              if (!res.error) {
                warningBody.style.display = 'none';
                successBody.style.display = 'block';
                menuDiv[i].remove();
                setTimeout(() => {
                  modal.style.display = 'none';
                  warningBody.style.display = 'block';
                  successBody.style.display = 'none';
                }, 2000);
              }
            });
        };
        noButton.onclick = () => {
          modal.style.display = 'none';
          warningBody.style.display = 'block';
          successBody.style.display = 'none';
        };
        closeModal.onclick = () => {
          modal.style.display = 'none';
          warningBody.style.display = 'block';
          successBody.style.display = 'none';
        };
        window.onclick = (event) => {
          if (event.target === modal) {
            modal.style.display = 'none';
            warningBody.style.display = 'block';
            successBody.style.display = 'none';
          }
        };
      };
    }
  }

  /**
         * This function set the edit menu
         * before passing to the edit menu page
         * @returns {HTMLElement} Returns the information from the endpoint.
         */
  editMenuClick() {
    const editBtn = document.querySelectorAll('.edit-btn');
    for (let i = 0; i < editBtn.length; i += 1) {
      editBtn[i].onclick = () => {
        const menuId = document.querySelectorAll('.red-order-meals')[i].getAttribute('data-menuId');
        const clickedMenuData = this.allMenuData.find(menu => menu.menu_id === Number(menuId));
        localStorage.setItem('menuToEdit', JSON.stringify(clickedMenuData));
        location.href = 'edit-fastfood.html';
      };
    }
  }
}

const allMenu = new AllMenu();
allMenu.getAllMenu();
