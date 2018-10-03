import supertest from 'supertest';
import assert from 'assert';
import jwt from 'jsonwebtoken';
import app from '../app';


const request = supertest(app);
const path = '/api/v1/orders';
const statuspath = '/api/v1/status';


const token = jwt.sign({
  userId: '1',
  userEmail: 'anemail@gmail.com',
  userRole: 'uset'
}, process.env.JWT_KEY);

const tokenAdmin = jwt.sign({
  userId: '1',
  userEmail: 'anemail@gmail.com',
  userRole: 'admin'
}, process.env.JWT_KEY);

const newOrder = {
  orderPhone: '08045676746',
  menuCart: [
    {
      menuId: 1, quantity: 4
    }
  ],
  orderAddress: 'ikotun lagos',
};

const invalidMenuId = {
  orderPhone: '08045676746',
  menuCart: [
    {
      menuId: 10, quantity: 4
    }
  ],
  orderAddress: 'ikotun lagos',
};


const orderShortPhoneNumber = {
  orderPhone: '080676746454',
  menuCart: [
    {
      menuId: 1, quantity: 1
    }
  ],
  orderAddress: '200 abakaliki junction'
};

const newEdit = {
  orderStatus: 'processing'
};

const wrongEdit = {
  orderStatus: 'ahdokljd'
};

const wrongEditFormat = {
  '': 'accepted'
};

const wronStatusFormat = {
  orderStatus: []
};


const orderLessQuantity = {
  orderPhone: '08045676746',
  menuCart: [
    { menuId: 1, quantity: 0.5 }
  ],
  orderAddress: 'fldnjlfmlfkmf',
};
const orderbadQuantity = {
  orderPhone: '08045676746',
  menuCart: [
    { menuId: 1, quantity: '1to4' }
  ],
  orderAddress: 'jlkjlkjfokljflk',
};

const orderBadMenuId = {
  orderPhone: '08045676746',
  menuCart: [
    { menuId: [], quantity: 1 }
  ],
  orderAddress: 'jofkjmlmdflkmfk',
};

const orderStringMenuId = {
  orderPhone: '08045676746',
  menuCart: [
    { menuId: 'hkjdhkjd', quantity: 1 }
  ],
  orderAddress: 'jofkjmlmdflkmfk',
};
const orderEmptyMenuCart = {
  orderPhone: '08045676746',
  menuCart: '',
  orderAddress: 'jofkjmlmdflkmfk',
};
const whiteSpaceAddress = {
  orderPhone: '08045676746',
  menuCart: [
    { menuId: 1, quantity: 1 }
  ],
  orderAddress: '   ',
};
const emptyPhone = {
  orderPhone: '',
  menuCart: [
    { menuId: 1, quantity: 1 }
  ],
  orderAddress: '   ',
};

const emptyAddress = {
  orderPhone: '08045676746',
  menuCart: [
    { menuId: 1, quantity: 1 }
  ],
  orderAddress: '',
};
const emptyArrayMenuCart = {
  orderPhone: '08045676746',
  menuCart: [],
  orderAddress: '30 oshole street',
};

const notArrayMenuCart = {
  orderPhone: '08045676746',
  menuCart: 'this is Andela',
  orderAddress: '30 oshole street',
};
const noMenuId = {
  orderPhone: '08045676746',
  menuCart: [{ yam: 1, shot: 1 }],
  orderAddress: '30 oshole street',
};
const noQuantity = {
  orderPhone: '08045676746',
  menuCart: [{ menuId: 1, shot: 1 }],
  orderAddress: '30 oshole street',
};


describe('Before all Orders', () => {
  it('should return empty many cart',
    (done) => {
      request.get(path)
        .send()
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((req, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'No Orders Available');
          done();
        });
    });

  it('should return error when there is no order id that is selected',
    (done) => {
      request.get(`${path}/1`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send()
        .end((req, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Order does not exist');
          done();
        });
    });

  it('should return message of no order History when no user history',
    (done) => {
      request.get('/api/v1/users/1/orders')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send()
        .end((req, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message,
            'No Order History Available for this User');
          done();
        });
    });
});
describe('Post Orders', () => {
  it('should return error when given an cart with no MenuId',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(noMenuId)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error,
            'Menu Id is required');
          done();
        });
    });
  it('should return error when given an Cart with no Quantity',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(noQuantity)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error,
            'Quantity is required');
          done();
        });
    });
  it('should return error when given an Menu Cart that is not array',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(notArrayMenuCart)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error,
            'Menu Cart must be array');
          done();
        });
    });
  it('should return error when given an empty phone number',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(emptyPhone)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error,
            'Phone field is required');
          done();
        });
    });
  it('should return error when given an empty Order Address',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(emptyAddress)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error,
            'Address field is required');
          done();
        });
    });
  it('should return error when given an Address of whitespace only',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(whiteSpaceAddress)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error,
            'Address should not be white space only');
          done();
        });
    });
  it('should return error when given an empty menu Cart',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(orderEmptyMenuCart)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Menu Cart is required');
          done();
        });
    });
  it('should return error when given an empty menu Cart Array',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(emptyArrayMenuCart)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Menu Cart cannot be empty');
          done();
        });
    });
  it('should return error when given a menu Id that is not integer',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(orderStringMenuId)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Menu Id can only be integer');
          done();
        });
    });
  it('should return error when given a quantity that is not integer',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(orderbadQuantity)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Quantity can only be integer');
          done();
        });
    });
  it('should return error when given a menu ID that is not integer',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(orderBadMenuId)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error,
            'Menu Id should be integer char greater than one');
          done();
        });
    });

  it('should return error when user send bad format input',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send([])
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Please Enter valid data');
          done();
        });
    });

  it('should return error when user send bad format input',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(orderShortPhoneNumber)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'please Enter a valid Number');
          done();
        });
    });

  it('should return error when given a quantity that is less than 1',
    (done) => {
      request.post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(orderLessQuantity)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error,
            'Quality should integer char greater than one');
          done();
        });
    });

  it('should return error when given Menu id that does not exist in db',
    (done) => {
      request.post(`${path}/`)
        .send(invalidMenuId)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 422);
          assert.equal(res.body.error, 'Menu Id 10 is not a valid menu Id');
          done();
        });
    });

  it('should return success when given valid order data',
    (done) => {
      request.post(`${path}/`)
        .send(newOrder)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.message, 'Order Placed Successfully');
          assert.equal(res.body.order.order_phone, '08045676746');
          assert.equal(res.body.order.order_address, 'ikotun lagos');
          assert.equal(res.body.order.order_menu[0].menu_id, 1);
          assert.equal(res.body.order.order_menu[0].quantity, 4);
          done();
        });
    });
});


describe('Get All Available Order Api Test', () => {
  it('should return success when authenticated admin access to get all orders',
    (done) => {
      request.get(`${path}`)
        .send()
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.order[0].order_phone, '08045676746');
          assert.equal(res.body.order[0].order_address, 'ikotun lagos');
          assert.equal(res.body.order[0].order_menu[0].menu_id, 1);
          assert.equal(res.body.order[0].order_menu[0].quantity, 4);
          done();
        });
    });
});


describe('Get A specific Order Api Test', () => {
  it('should return error when given wrong order id format',
    (done) => {
      request.get(`${path}/tola`)
        .send()
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'orderId can only be Integer');
          done();
        });
    });

  it('should return success when authenticated user/admin access an orders',
    (done) => {
      request.get(`${path}/1`)
        .send()
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.message, 'Order Selected Successfully');
          assert.equal(res.body.order.order_phone, '08045676746');
          assert.equal(res.body.order.order_address, 'ikotun lagos');
          assert.equal(res.body.order.order_menu[0].menu_id, 1);
          assert.equal(res.body.order.order_menu[0].quantity, 4);
          done();
        });
    });

  it('should return message of user history data when given a user id',
    (done) => {
      request.get('/api/v1/users/1/orders')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send()
        .end((req, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Order History Successful');
          assert.equal(res.body.order[0].order_phone, '08045676746');
          assert.equal(res.body.order[0].order_address, 'ikotun lagos');
          assert.equal(res.body.order[0].order_menu[0].menu_id, 1);
          assert.equal(res.body.order[0].order_menu[0].quantity, 4);
          done();
        });
    });
});


describe('Put status of an Order Api Test', () => {
  it('should return success when admin edit status or order with good data',
    (done) => {
      request.put(`${path}/1`)
        .send(newEdit)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.order.order_phone, '08045676746');
          assert.equal(res.body.order.order_address, 'ikotun lagos');
          assert.equal(res.body.order.order_menu[0].menu_id, 1);
          assert.equal(res.body.order.order_menu[0].quantity, 4);
          assert.equal(res.body.order.order_status, 'processing');
          done();
        });
    });

  it('should return error when admin edit status of non existing Order Id',
    (done) => {
      request.put(`${path}/5`)
        .send(newEdit)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 422);
          assert.equal(res.body.error, 'Order Id does not exist');
          done();
        });
    });

  it('should return success when admin edit status or order with good data',
    (done) => {
      request.put(`${path}/1`)
        .send(wrongEditFormat)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'status input is required');
          done();
        });
    });
  it('should return success when admin edit status or order with good data',
    (done) => {
      request.put(`${path}/1`)
        .send(wrongEdit)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Order Status can only be processing, cancelled or complete');
          done();
        });
    });

  it('should return success when admin edit status or order with good data',
    (done) => {
      request.put(`${path}/1`)
        .send(wronStatusFormat)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Order status input can only be a string');
          done();
        });
    });
});

describe('Get Order status history of a particular status', () => {
  it('should return error when user give status that is not allowed',
    (done) => {
      request.get(`${statuspath}/andela`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Order Status can only be new, processing, cancelled or complete');
          done();
        });
    });
  it('should return success when user enter a good status',
    (done) => {
      request.get(`${statuspath}/cancelled`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.message, 'No Order History Available');
          done();
        });
    });
  it('should return success when admin edit status or order with good data',
    (done) => {
      request.get(`${statuspath}/processing`)
        .send()
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.message,
            'processing History successfully selected');
          done();
        });
    });
});
