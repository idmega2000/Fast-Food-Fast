# Fast-Food-Fast

[![Build Status](https://travis-ci.org/idmega2000/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/idmega2000/Fast-Food-Fast)[![Coverage Status](https://coveralls.io/repos/github/idmega2000/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/idmega2000/Fast-Food-Fast?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/47a5e77af394185999b5/maintainability)](https://codeclimate.com/github/idmega2000/Fast-Food-Fast/maintainability)


Fast-Food-Fast is a food delivery service app for a restaurant.

## Technologies
1. [Nodejs](https://nodejs.org/en/)
2. [Express](https://expressjs.com/)
3. [Postgresql](https://www.postgresql.org/)
4. [Babel](https://babeljs.io/)
5. [Eslint](https://eslint.org/) and [airbnb style guide](https://github.com/airbnb/javascript)
6. [mocha](https://mochajs.org)
 

## How to Install
* Clone repo to your local machine
  git clone https://github.com/idmega2000/Fast-Food-Fast.git
* install dependencies
	npm install
	npm run start:dev
* visit `http://localhost:3000`


## Test
* npm run test

### App is Live
View UI template [here](https://idmega2000.github.io/fast-food-fast/) and
access Api endpoint [here](https://fast-food-fast-idris.herokuapp.com/)


|  Functionality     |Http Request   | Api endpoints    |
|  -------------     | ------------- | ---------------- |
| Get all the orders | GET           | /api/v1/orders         |
| Fetch a specific order    | GET           | /api/v1/orders/:id 		 |
| Update an entry  	 | PUT           | /api/v1/orders/:id 		 |
| Place a new order  | POST	       | /api/v1/orders		 |


## Endpoints
<table>
<tr>
<th>HTTP verbs</th>
<th>Route Endpoints</th>
<th>Function</th>
<th>Request Payload</th>
<th>Example</th></tr>
<tr>
<td>GET</td>
<td>/api/v1/orders</td>
<td>get all Orders</td>
<td>none</td>
<td>none</td>
</tr>

<tr>
<td>GET</td>
<td>/api/v1/orders/:id</td>
<td>Fetch a specific order</td>
<td> id can only be random alphanumeric</td>
<td>/api/v1/orders/hhnpsytbid  </td>
</tr>

<tr>
<td>POST</td>/api/v1/orders<td>
</td><td>Post a new Order</td>
<td>

    userId: <string>,
    orderInfo: <array>,
    orderAddress: <string>,

</td>
<td>
    userId: 'voehnksoe',
    orderInfo[]: {foodId: grildprhr, quantity: 3}
    orderAddress: '5b ishanwo street, ikotun lagos'

</td></tr>
<tr>
<td>Put</td>
<td>/api/v1/orders/:id</td>
<td>Update status of an Order</td>
<td>
    orderStatus: <string>, can only be 'accepted', 'declined', or 'processing'
</td>
<td>
    orderStatus: 'accepted'
</td></tr>


</table>

# Author
 Idris Wale Kelani(@idmega2000)