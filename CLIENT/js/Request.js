

/* eslint-disable class-methods-use-this */
/**
 * Represents all the differnt fetch type to be done.
 */
class Request {
  /**
     * This constructor takes in the address
     */
  constructor() {
    this.hostUrl = 'https://fast-food-fast-idris.herokuapp.com/api/v1';

    // this.hostUrl = 'http://localhost:3000/api/v1'; // for test
  }

  /**
     * This function post data to the endpoint
     * @param {object} uDir - the user directory to access.
     * @param {object} payload - The response object.
     * @returns {Promise} Returns the information from the endpoint.
     */
  post(uDir, payload) {
    const url = `${this.hostUrl}${uDir}`;
    return fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    }).then(res => res.json());
  }

  /**
     * This function post data to the endpoint
     * @param {string} uDir - the request object.
     * @returns {Promise} Returns the information from the endpoint.
     */
  get(uDir) {
    const url = `hostUrl${uDir}`;
    return fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json());
  }

  /**
     * This function post data to the endpoint
     * @param {object} uDir - the request object.
     * @param {object} payload - The response object.
     * @returns {Promise} Returns the information from the endpoint.
     */
  put(uDir, payload) {
    const url = `hostUrl${uDir}`;
    return fetch(url, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json());
  }
}