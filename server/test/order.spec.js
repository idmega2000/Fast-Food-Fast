import supertest from 'supertest';
import assert from 'assert';
import app from '../../app';
import genId from '../helpers/utils';

const request = supertest(app);
const path = '/api/v1/orders';

const newOrder = {
  userId: 'noencytns',
  orderId: genId(),
  orderInfo: [
    {
      foodId: 'ghsjhdijnd', quantity: 4
    }
  ],
  orderAddress: '5b ishanwo street, ikotun lagos',
  orderDateTime: '20/09/2018',
  orderStatus: 'new'
};

const newOrderWrongUser = {
  userId: 'hkfkjhfgg',
  orderId: genId(),
  orderInfo: [
    {
      foodId: 'ghsjhdijnd', quantity: 4
    }
  ],
  orderAddress: '5b ishanwo street, ikotun lagos',
  orderDateTime: '20/09/2018',
  orderStatus: 'new'
};

const whiteSpaceName = {
  userId: 'noencytns',
  orderId: 'rloaghtnnlrv',
  orderInfo: [
    { foodId: 'hdhdidnid', quantity: 1 }
  ],
  orderAddress: ' ',
  orderDateTime: '20/09/2018',
  orderStatus: 'default'
};

const noAddress = {
  userId: 'noencytns',
  orderId: 'rloaghtnnlrv',
  orderInfo: [
    { foodId: 'hdhdidnid', quantity: 1 }
  ],
  orderAddress: '',
  orderDateTime: '20/09/2018',
  orderStatus: 'default'
};
const shortAddress = {
  userId: 'noencytns',
  orderId: 'rloaghtnnlrv',
  orderInfo: [
    {
      foodId: 'hdhdidnid', quantity: 1
    }
  ],
  orderAddress: 'fjfkk',
  orderDateTime: '20/09/2018',
  orderStatus: 'default'
};

const orderInfoString = {
  userId: 'noencytns',
  orderId: 'rloaghtnnlrv',
  orderInfo: 'jkldjdkj',
  orderAddress: 'jmlfmlfmlfml',
  orderDateTime: '20/09/2018',
  orderStatus: 'default'
};

const newEdit = {
  orderStatus: 'accepted'
};

const wrongEdit = {
  orderStatus: 'ahdokljd'
};

const wrongEditFormat = [
  'orderStatus', 'accepted'
];

describe('Get all Orders', () => {
  it('when admin request all orders should return fast food orders',
    (done) => {
      request.get(path).end((req, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.orders[0].userId, 'voehnksoe');
        assert.equal(res.body.orders[0].orderId, 'grildprhr');
        assert.equal(res.body.orders[0].orderDateTime, '20/09/2018');
        assert.equal(res.body.orders[0].orderStatus, 'default');
        done();
      });
    });
});

describe('Get an Order', () => {
  it('Admin request for an order, it should return the fast food orders',
    (done) => {
      request.get(`${path}/rloahtnnlrv`).send().end((req, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.order.userId, 'noencytns');
        assert.equal(res.body.order.orderId, 'rloahtnnlrv');
        assert.equal(res.body.order.orderDateTime, '20/09/2018');
        assert.equal(res.body.order.orderStatus, 'default');
        done();
      });
    });

  it('should return error for a food that does not exist',
    (done) => {
      request.get(`${path}/randomstring`).send().end((req, res) => {
        assert.equal(res.status, 404);
        assert.equal(res.body.error, 'Order does not Exist');
        done();
      });
    });


  it('should return error for request with id of int',
    (done) => {
      request.get(`${path}/111`).send().end((req, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.error, 'Invalid Request');
        done();
      });
    });

  it('should return error when admin give bad format', (done) => {
    request.get(`${path}/[]`).send().end((req, res) => {
      assert.equal(res.status, 400);
      assert.equal(res.body.error, 'Invalid Request');
      done();
    });
  });
});

describe('Post Orders', () => {
  it('should return error when user send bad format input',
    (done) => {
      request.post(path)
        .send([])
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Please Enter valid data');
          done();
        });
    });


  it('should return error when user send incomplete field', (done) => {
    request.post(path)
      .send(noAddress)
      .end((req, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.error, 'All fields are required');
        done();
      });
  });

  it('should return error wen user enter just white spaces',
    (done) => {
      request.post(path)
        .send(whiteSpaceName)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'whitespace not allowed');
          done();
        });
    });

  it('should return error when user send data less than three', (done) => {
    request.post(path)
      .send(shortAddress)
      .end((req, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.error, 'Input must be eight char and above');
        done();
      });
  });

  it('should return error when user input wrong user', (done) => {
    request.post(path)
      .send(newOrderWrongUser)
      .end((req, res) => {
        assert.equal(res.status, 404);
        assert.equal(res.body.error, 'User does not Exist');
        done();
      });
  });

  it('should return error when user send wrong order information format',
    (done) => {
      request.post(path)
        .send(orderInfoString)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Order information must be array');
          done();
        });
    });


  describe('when user send a vilid data', () => {
    it('should return the fast food orders', (done) => {
      request.post(path)
        .send(newOrder)
        .end((req, res) => {
          assert.equal(res.status, 201);
          assert.equal(res.body.order.userId, 'noencytns');
          assert.equal(res.body.order.orderAddress,
            '5b ishanwo street, ikotun lagos');
          assert.equal(res.body.order.orderStatus, 'new');
          done();
        });
    });
  });
});

describe('Put Orders', () => {
  it(' should return the content edited', (done) => {
    request.put(`${path}/rloahtnnlrv`)
      .send(newEdit)
      .end((req, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.order.userId, 'noencytns');
        assert.equal(res.body.order.orderId, 'rloahtnnlrv');
        assert.equal(res.body.order.orderStatus, 'accepted');
        done();
      });
  });

  it('should return error for wrong input for update', (done) => {
    request.put(`${path}/rloahtnnlrv`)
      .send(wrongEdit)
      .end((req, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.error, 'Invalid status Input');
        done();
      });
  });

  it('should return error when admin enter wrong input format', (done) => {
    request.put(`${path}/rloahtnnlrv`)
      .send(wrongEditFormat)
      .end((req, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.error, 'status input must be a string');
        done();
      });
  });
});
