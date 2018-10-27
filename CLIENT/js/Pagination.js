

/* eslint-disable class-methods-use-this */
/**
 * Represent the pagination
 */
class Pagination extends Request {
/**
 * @constructs allorderHistoryArray
 */
  constructor() {
    super();
    this.allCompleteDataArray = '';
    this.arrayOutputNumber = '';
    this.currentDataArray = '';
  }

  /**
     * This function post data to the endpoint
     * @param {array} orderHistoryArray - the array of all orders
     * @returns {HTMLElement} Returns the created paginataion linkers.
     */
  createPagination(orderHistoryArray) {
    document.querySelector('.pagination').innerHTML = '';
    this.currentDataArray = orderHistoryArray;
    const paginationDiv = document.querySelector('.pagination');
    paginationDiv.innerHTML += '<a class="arrow-backward">&laquo;</a>';
    let count = 1;

    for (let i = 0; i <= orderHistoryArray.length; i += this.arrayOutputNumber) {
      paginationDiv.innerHTML += `<a class="pagination-list">${count}</a>`;
      document.getElementsByClassName('pagination-list')[count - 1]
        .setAttribute('data-pageId', count);
      count += 1;
    }
    paginationDiv.innerHTML += '<a class="arrow-forward">&raquo;</a>';
    const activeClass = document.getElementsByClassName('pagination-list')[0];
    activeClass.className += ' active';
    const firstPageArray = orderHistoryArray
      .slice(0, this.arrayOutputNumber);
    this.paginationOnClick();
    this.arrowsOnclick();
    this.loadUserOrderHistory(firstPageArray, 0);
  }

  /**
     * This function set the array needed and send to loadpage function
     * @param {Integer} pageId - the dataId of the selected
     * @returns {array} Returns the created pagination linkers.
     */
  changeDisplayList(pageId) {
    const to = this.arrayOutputNumber * pageId;
    const from = (this.arrayOutputNumber * (pageId - 1));
    const arrayToDisplay = this.currentDataArray.slice(from, to);
    this.loadUserOrderHistory(arrayToDisplay, from);
  }

  /**
       * This function change the order history to the necessary one on click
       * @returns {HTMLElement} Returns array of the necessary order history
       */
  paginationOnClick() {
    const allPaginationList = document.querySelectorAll('.pagination-list');
    for (let i = 0; i < allPaginationList.length; i += 1) {
      allPaginationList[i].addEventListener('click', () => {
        const pageId = document.getElementsByClassName('pagination-list')[i].getAttribute('data-pageId');
        this.changeDisplayList(pageId);
        const newActiveClass = document.getElementsByClassName('pagination-list')[i];
        const activeClass = document.getElementsByClassName('active')[0];
        activeClass.classList.remove('active');
        newActiveClass.classList.add('active');
      }, false);
    }
  }

  /**
       * This function listen to the arraow key and use the active class to
       * calculate the next pagination anchor that should be active and set it
       * @returns {HTMLElement} Returns array of the necessary order history
       */
  arrowsOnclick() {
    const arrowBackward = document.getElementsByClassName('arrow-backward')[0];
    const arrowForward = document.getElementsByClassName('arrow-forward')[0];
    arrowBackward.addEventListener('click', () => {
      const activeClass = document.getElementsByClassName('active')[0];
      const activeDataId = activeClass.getAttribute('data-pageId');
      const prevPage = document.getElementsByClassName('pagination-list')[activeDataId - 2];
      if (prevPage) {
        this.changeDisplayList(Number(activeDataId) - 1);
        activeClass.classList.remove('active');
        prevPage.classList.add('active');
      }
    }, false);

    arrowForward.addEventListener('click', () => {
      const activeClass = document.getElementsByClassName('active')[0];
      const activeDataId = activeClass.getAttribute('data-pageId');
      const nextData = document.getElementsByClassName('pagination-list')[activeDataId];
      if (nextData) {
        this.changeDisplayList(Number(activeDataId) + 1);
        activeClass.classList.remove('active');
        nextData.classList.add('active');
      }
    }, false);
  }
}
