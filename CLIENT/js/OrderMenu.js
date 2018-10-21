
/* eslint-disable class-methods-use-this */
/**
 * Represents all the different fetch type to be done.
 */
class UserMenu extends Request {
  /**
       * this function load the cart menu/meals into the table
       * @returns {HTMLElement} - returns html element and arrange the table
       */
  loadOrderElement() {
    let menuDetails = localStorage.getItem('menuCart');
    menuDetails = JSON.parse(menuDetails);
    const orderTable = document.querySelector('.order-table');
    menuDetails.forEach((element, index) => {
      const aMenuId = element.menuId;
      const aMenuName = element.menuName;
      const aMenuPrice = element.menuPrice;
      const aMenuQuantity = element.quantity;
      const row = orderTable.insertRow(index + 1);
      row.className = 'table-row';
      const cellIndex = row.insertCell(0);
      const cellName = row.insertCell(1);
      const cellUnitPrice = row.insertCell(2);
      const cellPlates = row.insertCell(3);
      const cellMenuPrice = row.insertCell(4);
      const cellDelBtn = row.insertCell(5);
      cellIndex.innerHTML = `<div class="row-index">${index + 1}</div>`;
      cellName.innerHTML = aMenuName;
      cellUnitPrice.innerHTML = `&#8358 ${aMenuPrice}`;
      cellPlates.innerHTML = `
      <div>
        <select class="menu-select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
        </select>
        </div>`;
      document.querySelectorAll('.menu-select')[index].value = aMenuQuantity;
      cellMenuPrice.innerHTML = `<div class='qtn-menu-price'> &#8358 ${aMenuPrice * aMenuQuantity}</div>`;
      cellDelBtn.innerHTML = `
      <button class="del-meal-btn modal-btn" data-rowId="${index + 1}">Delete</button>`;
      document.getElementsByClassName('table-row')[index].setAttribute('data-menuId', aMenuId);
    });

    const totalQuantity = localStorage.getItem('totalQuantity');
    const totalPrice = localStorage.getItem('totalPrice');
    const row = orderTable.insertRow(-1);
    const cellIndex = row.insertCell(0);
    const cellName = row.insertCell(1);
    const cellUnitPrice = row.insertCell(2);
    const cellPlates = row.insertCell(3);
    const cellMenuPrice = row.insertCell(4);
    const cellDelBtn = row.insertCell(5);
    cellIndex.innerHTML = 'Total';
    cellName.innerHTML = '';
    cellUnitPrice.innerHTML = '';
    cellPlates.innerHTML = `<div class="total-quantity">${totalQuantity}</div>`;
    cellMenuPrice.innerHTML = `<div class="total-price">&#8358 ${totalPrice}</div>`;
    cellDelBtn.innerHTML = '';
  }

  /**
       * this function delete a meal from the list
       * @returns {HTMLElement} - returns html element and arrange the table
       */
  deleteMeal() {
    const deleteBtn = document.getElementsByClassName('del-meal-btn');
    for (let i = 0; i < deleteBtn.length; i += 1) {
      deleteBtn[i].onclick = () => {
        const menuId = document.querySelectorAll('.table-row')[i].getAttribute('data-menuId');
        let menuDetail = localStorage.getItem('menuCart');
        menuDetail = JSON.parse(menuDetail);
        const afterDelMenuCart = menuDetail.filter(meal => meal.menuId !== menuId.toString());
        localStorage.setItem('menuCart', JSON.stringify(afterDelMenuCart));
        const deleteIndex = deleteBtn[i].getAttribute('data-rowId');
        document.querySelector('.order-table').deleteRow(deleteIndex);
        this.setIndex();
        this.getTotal();
        this.deleteMeal();
      };
    }
  }

  /**
       * this function set the SN and reset the data-rowId of button;
       * @returns {HTMLElement} - returns html element and arrange the table
       */
  setIndex() {
    const rowIndex = document.querySelectorAll('.row-index');
    const deleteBtn = document.getElementsByClassName('del-meal-btn');
    for (let i = 0; i < rowIndex.length; i += 1) {
      deleteBtn[i].setAttribute('data-rowId', i + 1);
      rowIndex[i].innerHTML = i + 1;
    }
  }

  /**
     * this function change the quantity base on the new qunatity selected
     * @returns {HTMLElement} - returns html element and arrange the table
     */
  changeQuantity() {
    const changeOption = document.getElementsByClassName('menu-select');
    for (let i = 0; i < changeOption.length; i += 1) {
      changeOption[i].addEventListener('change', () => {
        const aMenuId = document.querySelectorAll('.table-row')[i].getAttribute('data-menuId');
        const currentQuantity = document.getElementsByClassName('menu-select')[i].value;
        let menuDetails = localStorage.getItem('menuCart');
        menuDetails = JSON.parse(menuDetails);
        const menuCart = menuDetails.find(meal => meal.menuId === aMenuId.toString());
        menuCart.quantity = currentQuantity;
        const qtnMenuPrice = document.querySelectorAll('.qtn-menu-price')[i];
        qtnMenuPrice.innerHTML = `&#8358 ${currentQuantity * menuCart.menuPrice}`;
        localStorage.setItem('menuCart', JSON.stringify(menuDetails));
        this.getTotal();
      });
    }
  }

  /**
       * this function load the cart menu/meals into the table
       * @returns {HTMLElement} - returns html element and arrange the table
       */
  getTotal() {
    let menuDetails = localStorage.getItem('menuCart');
    menuDetails = JSON.parse(menuDetails);
    let totalQuantity = 0;
    let totalPrice = 0;
    console.log(menuDetails);
    menuDetails.forEach((item) => {
      totalQuantity += Number(item.quantity);
      totalPrice += Number(item.menuPrice * item.quantity);
    });
    localStorage.setItem('totalQuantity', totalQuantity);
    localStorage.setItem('totalPrice', totalPrice);
    const updateTotalPrice = document.querySelector('.total-price');
    const updateTotalQuantity = document.querySelector('.total-quantity');
    updateTotalPrice.innerHTML = `&#8358 ${totalPrice}`;
    updateTotalQuantity.innerHTML = totalQuantity;
    const quantityHolder = document.querySelectorAll('.quantity-amount-holder');
    quantityHolder[0].innerHTML = totalQuantity;
    quantityHolder[1].innerHTML = totalQuantity;
  }

  /**
       * this function load the cart menu/meals into the table
       * @returns {HTMLElement} - returns html element and arrange the table
       */
  placeOrder() {
    const uDir = '/orders';
    const phone = document.querySelector('.order-phone').value;
    const requiredStar = document.querySelectorAll('.is-required');
    const nigNumber = (/^[0]\d{10}$/);
    const alphnumaOnly = (/^[a-zA-Z0-9 ]*$/);
    const name = document.querySelector('.order-name').value;
    const address = document.querySelector('.order-address').value;
    const errorHandler = document.querySelector('.order-error-span');
    const errorHandlerDiv = document.querySelector('.order-error-div');
    if (!name || name.trim() === 0) {
      errorHandlerDiv.style.display = 'inline-block';
      errorHandler.innerHTML = 'Please Enter a name';
      requiredStar[0].style.color = 'red';
      console.log(localStorage);
      return false;
    }
    if (!phone || phone.trim() === 0) {
      errorHandlerDiv.style.display = 'inline-block';
      errorHandler.innerHTML = 'Please Enter Phone number';
      requiredStar[1].style.color = 'red';
      return false;
    }
    if (!address || address.trim() === 0) {
      errorHandlerDiv.style.display = 'inline-block';
      errorHandler.innerHTML = 'Please Enter Delivery Address';
      requiredStar[2].style.color = 'red';
      return false;
    }
    if (!phone.match(nigNumber)) {
      errorHandlerDiv.style.display = 'inline-block';
      errorHandler.innerHTML = 'Please Enter a valid Phone number';
      requiredStar[1].style.color = 'red';
    }
    if (!name.match(alphnumaOnly)) {
      errorHandlerDiv.style.display = 'inline-block';
      errorHandler.innerHTML = 'Name can only be alpha numeric';
      requiredStar[1].style.color = 'red';
    }
    let menuCartDetails = localStorage.getItem('menuCart');
    menuCartDetails = JSON.parse(menuCartDetails);
    const payload = {
      orderName: name,
      orderPhone: phone,
      orderAddress: address,
      menuCart: menuCartDetails
    };
    this.post(uDir, payload)
      .then((res) => {
        if (res.error) {
          errorHandler.innerHTML = res.error;
          return false;
        }
        localStorage.removeItem('menuCart');
        localStorage.removeItem('totalPrice');
        localStorage.removeItem('totalQuantity');
        location.href = 'user-order-history.html';
      });
  }
}

const userMenu = new UserMenu();
userMenu.loadOrderElement();
userMenu.deleteMeal();
userMenu.changeQuantity();

const orderForm = document.querySelector('.order-form');
orderForm.onsubmit = (event) => {
  userMenu.placeOrder();
  event.preventDefault();
};
// orderForm.addEventListener('submit', userMenu.placeOrder, false);
