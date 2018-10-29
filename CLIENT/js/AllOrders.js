
/* eslint-disable class-methods-use-this */
/**
 * Represent the user orders history
 */
class allOrders extends Pagination {
  /**
       * @param {array} ordersArray - the array of all orders;
       * @param {integer} snBeginning - the beginning of the index;
       * @returns {HTMLElement} - return HTMLElement of the orders
       */
  loadOrders(ordersArray) {
    if (this.allCompleteDataArray.length < 1) {
      document.querySelector('.no-order-history')
        .innerHTML = '<h1>No Order History</h1>';
      return false;
    }
    const historyTable = document.querySelector('.order-table');
    historyTable.innerHTML = '';
    const titleRow = historyTable.insertRow(0);
    titleRow.className = 'table-title';
    titleRow.innerHTML = `<th>OrderId</th>
      <th>Order Details</th>
      <th> Name</th>
      <th> Quantity</th>
      <th> Price</th>
      <th> Request</th>`;

    ordersArray.forEach((element, index) => {
      const orderTotalPrice = element.order_total_price;
      const orderQuantity = element.order_total_quantity;
      const orderDate = new Date(element.order_added_date).toLocaleString();
      const row = historyTable.insertRow(index + 1);
      row.className = 'table-content modal-btn';
      const cellIndex = row.insertCell(0);
      const cellViewFood = row.insertCell(1);
      const cellName = row.insertCell(2);
      const cellQuantity = row.insertCell(3);
      const cellPrice = row.insertCell(4);
      const cellRequest = row.insertCell(5);

      cellIndex.innerHTML = element.order_id;
      cellIndex.className = 'serial-number';
      cellViewFood.innerHTML = '<div class="view-details">view Details</div>';
      cellName.innerHTML = element.recipient_name;
      cellQuantity.innerHTML = orderQuantity;
      cellPrice.innerHTML = `&#8358 ${orderTotalPrice}`;
      cellPrice.className = 'arrange-order-price';
      if (element.order_status === 'new') {
        cellRequest.innerHTML = `<button class="accept-btn">&#x2714;</button>
                                <button class="reject-btn modal-btn">&#x2718;</button>`;
      }
      if (element.order_status === 'processing') {
        cellRequest.innerHTML = '<button class="complete-btn">Complete</button>';
      }
      if (element.order_status === 'cancelled') {
        cellRequest.innerHTML = 'Cancelled';
      }
      if (element.order_status === 'complete') {
        cellRequest.innerHTML = 'Completed';
      }

      const orderModal = document.querySelector('.all-modal');
      orderModal.innerHTML += `
                          <div id="myModal" class="modal order-modal">
  
                          <!-- Modal content -->
                          <div class="modal-content">
  
                              <span class="close-order-modal">&times;</span>
                              <div class="modal-body del-order-body">
                                  <div class="order-details-wrapper">
                                      <h1>Order Details</h1>
                                      <div class="order-details">
                                          <div><b>Recipient Name:</b>${element.recipient_name}</div>
                                          <div><b>Telephone:</b>${element.order_phone}</div>
                                      </div>
                                      <div class="order-details">
                                          <div> <b>Address:</b>${element.order_address}</div>
                                          <div class="order-dates">
                                              <div><b>Ordered Date:</b>${orderDate}</div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="order-food-item">
                                      <div class="food-items order-food-title">
                                          <div>
                                              <b>Food Name:</b>
                                          </div>
                                          <div>
                                              <b>Unit Price:</b>
                                          </div>
                                          <div>
                                              <b>Quantity</b>
                                          </div>
                                          <div>
                                              <b>Price</b>
                                          </div>
                                      </div>
                                      ${element.order_menu.map(food => `<div class="food-items"> 
                                          <div>${food.menu_name}</div>
                                          <div>${food.a_menu_price}</div>
                                          <div>${food.quantity}</div>
                                          <div>${food.all_menu_price}</div>
                                          </div>`).join('')}
                                      <hr>
                                      <div class="food-items">
                                          <div>
                                              <b>Total</b>
                                          </div>
                                          <div>
                                              <b></b>
                                          </div>
                                          <div>
                                              <b>${element.order_total_quantity}</b>
                                          </div>
                                          <div>
                                              <b>${element.order_total_price}</b>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                          `;
    });
    const ordersModal = document.querySelectorAll('.order-modal');
    const modalTableRow = document.querySelectorAll('.view-details');
    const closeOrderModal = document.querySelectorAll('.close-order-modal');
    const setOrderModal = (index) => {
      ordersModal[index].style.display = 'block';
    };
    for (let i = 0; i < modalTableRow.length; i += 1) {
      modalTableRow[i].onclick = () => {
        setOrderModal(i);
      };
      closeOrderModal[i].onclick = () => {
        ordersModal[i].style.display = 'none';
      };

      window.addEventListener('click', (event) => {
        if (event.target === ordersModal[i]) {
          ordersModal[i].style.display = 'none';
        }
      });
    }
    this.requestEventclicks();
  }

  /**
       * This function post data to the endpoint
       * @returns {Promise} Returns the information from the endpoint.
       */
  getAllOrders() {
    const uDir = '/orders';
    this.get(uDir)
      .then((res) => {
        this.allCompleteDataArray = res.order;
        this.arrayOutputNumber = 10;
        if (this.allCompleteDataArray.length < 1) {
          document.querySelector('.no-order-history')
            .innerHTML = '<h1>No Order History</h1>';
          return false;
        }
        this.loadData = this.loadOrders;
        this.createPagination(this.allCompleteDataArray);
      });
  }

  /**
       * This function post data to the endpoint
       * @returns {HTMLElement} Returns the information from the endpoint.
       */
  categoryOnchange() {
    const foodCategory = document.querySelector('.select-category');
    foodCategory.addEventListener('change', () => {
      const selectedCategory = foodCategory.options[foodCategory.selectedIndex].value;
      let selectedDataArray = '';
      if (selectedCategory === 'all') {
        selectedDataArray = this.allCompleteDataArray;
      } else {
        selectedDataArray = this.allCompleteDataArray
          .filter(order => order.order_status === selectedCategory);
      }
      if (selectedDataArray.length < 1) {
        document.querySelector('.pagination').innerHTML = '';
        const historyTable = document.querySelector('.order-table');
        historyTable.innerHTML = '';
        const titleRow = historyTable.insertRow(0);
        titleRow.className = 'table-title';
        titleRow.innerHTML = `<th>S/N</th>
          <th>Date</th>
          <th> Quantity</th>
          <th> Price</th>
          <th> Status</th>`;
        document.querySelector('.no-order-history')
          .innerHTML = '<h1>No Order History</h1>';
        return false;
      }
      document.querySelector('.no-order-history')
        .innerHTML = '';
      this.createPagination(selectedDataArray);
    }, false);
  }

  /**
   * this function handles the request onclick events
   * @returns {HTMLElement} returns the actions needed after the events
   */
  requestEventclicks() {
    const acceptBtn = document.querySelectorAll('.accept-btn');
    const rejectBtn = document.querySelectorAll('.reject-btn');
    const completeBtn = document.querySelectorAll('.complete-btn');


    for (let i = 0; i < acceptBtn.length; i += 1) {
      acceptBtn[i].onclick = () => {
        acceptBtn[i].parentElement.innerHTML = '<button class="complete-btn">Complete</button>';
        this.requestEventclicks();
      };
    }

    for (let i = 0; i < rejectBtn.length; i += 1) {
      rejectBtn[i].onclick = () => {
        rejectBtn[i].parentElement.innerHTML = 'Cancelled';
      };
    }

    for (let i = 0; i < completeBtn.length; i += 1) {
      completeBtn[i].onclick = () => {
        completeBtn[i].parentElement.innerHTML = 'Completed';
      };
    }
  }
}
const userOrderHistory = new allOrders();
userOrderHistory.getAllOrders();
userOrderHistory.requestEventclicks();
userOrderHistory.categoryOnchange();
