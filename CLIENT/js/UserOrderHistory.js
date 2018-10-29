
/* eslint-disable class-methods-use-this */
/**
 * Represent the user orders history
 */
class UserOrderHistory extends Pagination {
  /**
     * @param {array} orderHistoryArray - the array of all orders;
     * @param {integer} snBeginning - the begining of the index;
     * @returns {HTMLElement} - return HTMLElement of the orders
     */
  loadUserOrderHistory(orderHistoryArray, snBeginning) {
    if (this.allCompleteDataArray.length < 1) {
      document.querySelector('.no-order-history')
        .innerHTML = '<h1>No Order History</h1>';
      return false;
    }
    const historyTable = document.querySelector('.user-history-table');
    historyTable.innerHTML = '';
    const titleRow = historyTable.insertRow(0);
    titleRow.className = 'table-title';
    titleRow.innerHTML = `<th>S/N</th>
    <th>Date</th>
    <th> Quantity</th>
    <th> Price</th>
    <th> Status</th>`;

    orderHistoryArray.forEach((element, index) => {
      const orderTotalPrice = element.order_total_price;
      const orderQuantity = element.order_total_quantity;
      const orderDate = new Date(element.order_added_date).toLocaleString();
      const orderStatus = element.order_status;
      const row = historyTable.insertRow(index + 1);
      row.className = 'table-content modal-btn';
      const cellIndex = row.insertCell(0);
      const cellDate = row.insertCell(1);
      const cellName = row.insertCell(2);
      const cellPrice = row.insertCell(3);
      const cellStatus = row.insertCell(4);
      cellIndex.innerHTML = index + snBeginning + 1;
      cellIndex.className = 'serial-number';
      cellDate.innerHTML = orderDate;
      cellName.innerHTML = orderQuantity;
      cellPrice.innerHTML = `&#8358 ${orderTotalPrice}`;
      cellStatus.innerHTML = orderStatus;

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
    const modalTableRow = document.querySelectorAll('.table-content');
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
  }

  /**
     * This function post data to the endpoint
     * @returns {Promise} Returns the information from the endpoint.
     */
  getAllOrderHistory() {
    const decoded = jwt_decode(token);
    const thisUserId = decoded.userId;
    const uDir = `/users/${thisUserId}/orders`;
    this.get(uDir)
      .then((res) => {
        this.allCompleteDataArray = res.order;
        this.arrayOutputNumber = 10;
        if (this.allCompleteDataArray.length < 1) {
          document.querySelector('.no-order-history')
            .innerHTML = '<h1>No Order History</h1>';
          return false;
        }
        this.loadData = this.loadUserOrderHistory;
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
        const historyTable = document.querySelector('.user-history-table');
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
}
const userOrderHistory = new UserOrderHistory();
userOrderHistory.getAllOrderHistory();
userOrderHistory.categoryOnchange();
