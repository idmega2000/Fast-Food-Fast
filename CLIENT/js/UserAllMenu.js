
/* eslint-disable class-methods-use-this */
/**
 * Represents all the different fetch type to be done.
 */
class UserAllMenu extends Request {
  /**
     * This function create and add dom element
     * @param {array} allArray - the array of all menu.
     * @returns {innerHTML} Returns the menucart content that are available.
     */
  loadMenuElement(allArray) {
    allArray.forEach((element, index) => {
      if (allArray.length < 1) {
        document.querySelector('.no-menu').innerHTML = '<h1>No Menu Yet</h1>';
        return false;
      }
      const mId = element.menu_id;
      const mName = element.menu_name;
      const mPrice = element.menu_price;
      const mImage = element.menu_image;
      const mainBodyContainer = document.querySelector('.main-body-container');
      mainBodyContainer.innerHTML += `
          <div class="row col-4 order-a-meal">
              <div class="red-order-meals" data-id="${mId}">
                  <div class="order-image">
                      <img src="${mImage}" />
                  </div>
                  <div class="order-content">
                      <h3 class="menu-name">${mName}</h3>
                      <div class="selected-price">
                        <div class="unit-price">
                          <p><b>&#8358 <p class="menu-price">${mPrice}</p></b></p>
                        </div>
                        <div class="menu-plates">
                          <button class="decrement-value" >-</button>
                          <input type="number" class="quantity-number" value="1" />
                          <button class="increment-value" >+</button>
                          <div class="testing"></div>
                      </div>
                      </div>
                  </div>
                  <div>
                      <button class="order-btn modal-btn">Add to Cart</button>
                  </div>
              </div>
          `;
      let menuDetails = localStorage.getItem('menuCart');
      if (menuDetails) {
        menuDetails = JSON.parse(menuDetails);
        const menuIdExist = menuDetails
          .find(item => item.menuId === mId.toString());
        if (menuIdExist) {
          const orderBtn = document.getElementsByClassName('order-btn')[index];
          document.getElementsByClassName('quantity-number')[index]
            .setAttribute('value', menuIdExist.quantity);
          orderBtn.innerHTML = 'Added to Cart';
          orderBtn.style.backgroundColor = 'rgb(226, 0, 30)';
        }
      }
    });
    this.orderActions();
  }

  /**
     * This function post data to the endpoint
     * @returns {Promise} Returns the information from the endpoint.
     */
  getAllMenu() {
    const uDir = '/menu';
    this.get(uDir)
      .then((res) => {
        this.loadMenuElement(res.menu);
      });
  }

  /**
     * This function perfom actions necessary to make order
     * @returns {innerHTML} Returns the menucart content that are available.
     */
  orderActions() {
    const addQuantity = document.getElementsByClassName('increment-value');
    const reduceQuantity = document.getElementsByClassName('decrement-value');
    const addToCart = document.getElementsByClassName('order-btn');

    if (addQuantity) {
      for (let i = 0; i < addQuantity.length; i += 1) {
        addQuantity[i].onclick = () => {
          let menuDetails = localStorage.getItem('menuCart');
          const aMenu = document.getElementsByClassName('red-order-meals')[i];
          const aMenuDataId = aMenu.getAttribute('data-id');
          const currentValue = document
            .getElementsByClassName('quantity-number')[i].value;
          let value = parseInt(currentValue, 10);
          value = isNaN(value) ? 0 : value;
          value += 1;
          value > 12 ? value = 12 : value;
          document.getElementsByClassName('quantity-number')[i].value = value;
          if (menuDetails) {
            menuDetails = JSON.parse(menuDetails);
            const menuIdExist = menuDetails
              .find(item => item.menuId === aMenuDataId);
            if (menuIdExist) {
              if (menuIdExist.quantity === value.toString()) {
                const orderBtn = document.getElementsByClassName('order-btn')[i];
                orderBtn.style.backgroundColor = 'rgb(226, 0, 30)';
                orderBtn.innerHTML = 'Added to Cart';
              } else {
                const orderBtn = document.getElementsByClassName('order-btn')[i];
                orderBtn.style.backgroundColor = '#ee6e73';
                orderBtn.innerHTML = 'Update Cart';
              }
            }
          }
        };
      }
    }
    if (reduceQuantity) {
      for (let i = 0; i < reduceQuantity.length; i += 1) {
        reduceQuantity[i].onclick = () => {
          let menuDetails = localStorage.getItem('menuCart');
          const aMenu = document.getElementsByClassName('red-order-meals')[i];
          const aMenuDataId = aMenu.getAttribute('data-id');
          const currentValue = document
            .getElementsByClassName('quantity-number')[i].value;
          let value = parseInt(currentValue, 10);
          value = isNaN(value) ? 0 : value;
          value -= 1;
          value < 1 ? value = 1 : value;
          document.getElementsByClassName('quantity-number')[i].value = value;
          menuDetails = JSON.parse(menuDetails);
          const menuIdExist = menuDetails
            .find(item => item.menuId === aMenuDataId);
          if (menuIdExist) {
            if (menuIdExist.quantity === value.toString()) {
              const orderBtn = document.getElementsByClassName('order-btn')[i];
              orderBtn.style.backgroundColor = 'rgb(226, 0, 30)';
              orderBtn.innerHTML = 'Added to Cart';
            } else {
              const orderBtn = document.getElementsByClassName('order-btn')[i];
              orderBtn.style.backgroundColor = '#ee6e73';
              orderBtn.innerHTML = 'Update Cart';
            }
          }
        };
      }
    }
    if (addToCart) {
      for (let i = 0; i < addToCart.length; i += 1) {
        addToCart[i].onclick = () => {
          const aMenu = document.getElementsByClassName('red-order-meals')[i];
          const aMenuDataId = aMenu.getAttribute('data-id');
          const orderBtn = document.getElementsByClassName('order-btn')[i];
          const currentQuantity = document.getElementsByClassName('quantity-number')[i].value;
          const amenuName = document.getElementsByClassName('menu-name')[i].textContent;
          const amenuPrice = document.getElementsByClassName('menu-price')[i].textContent;
          orderBtn.innerHTML = 'Added to Cart';
          orderBtn.style.backgroundColor = 'rgb(226, 0, 30)';
          let menuDetails = localStorage.getItem('menuCart');
          if (menuDetails) {
            menuDetails = JSON.parse(menuDetails);
            const menuIdExist = menuDetails.find(item => item.menuId === aMenuDataId);
            if (menuIdExist) {
              menuIdExist.quantity = currentQuantity;
            } else {
              menuDetails.push({
                menuId: aMenuDataId,
                menuName: amenuName,
                menuPrice: amenuPrice,
                quantity: currentQuantity
              });
            }
          } else {
            menuDetails = [];
            menuDetails.push({
              menuId: aMenuDataId,
              menuName: amenuName,
              menuPrice: amenuPrice,
              quantity: currentQuantity
            });
          }


          localStorage.setItem('menuCart', JSON.stringify(menuDetails));
          let totalQuantity = 0;
          let totalPrice = 0;
          menuDetails.forEach((item) => {
            totalQuantity += Number(item.quantity);
            totalPrice += Number(item.menuPrice * item.quantity);
          });
          localStorage.setItem('totalQuantity', totalQuantity);
          localStorage.setItem('totalPrice', totalPrice);
          const quantityHolder = document.querySelectorAll('.quantity-amount-holder');
          quantityHolder[0].innerHTML = totalQuantity;
          quantityHolder[1].innerHTML = totalQuantity;
        };
      }
    }
  }
}
const userAllMenu = new UserAllMenu();
userAllMenu.getAllMenu();

const handlerEvent = (event) => {
  if (event.key !== 'totalQuantity') return;
  const quantityHolder = document.querySelectorAll('.quantity-amount-holder');
  quantityHolder[0].innerHTML = event.newValue;
  quantityHolder[1].innerHTML = event.newValue;
  return false;
};

window.addEventListener('storage', handlerEvent, false);
