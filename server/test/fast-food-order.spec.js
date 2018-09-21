import supertest from 'supertest';
import assert from 'assert';
import app from '../../app';
import genId from '../helpers/utils';

const request = supertest(app);
const path = '/api/v1/orders';

const newOrder = {
  userId: 'vdeblshees',
  foodId: 'hjihdijdhi',
  orderFoodId: genId(),
  orderFoodName: 'Beans and Bread',
  orderFoodPrice: 'NGN 1200',
};

const emptyFoodName = {
  userId: 'vdeblshees',
  foodId: 'hjihdijdhi',
  orderFoodId: genId(),
  orderFoodName: '',
  orderFoodPrice: 'NGN 1200',
};

const whiteSpaceName = {
  userId: 'vdeblshees',
  foodId: 'hjihdijdhi',
  orderFoodId: genId(),
  orderFoodName: '  ',
  orderFoodPrice: 'NGN 1200',
};
const shortName = {
  userId: 'vdeblshees',
  foodId: 'hjihdijdhi',
  orderFoodId: genId(),
  orderFoodName: 'h',
  orderFoodPrice: 'NGN 1200',
};

const wrongFoodId = {
  userId: 'vdeblshees',
  foodId: 'hjihdigfjdhi',
  orderFoodId: genId(),
  orderFoodName: 'Beans and Bread',
  orderFoodPrice: 'NGN 1200',
};

describe('Get all Orders', () => {
  describe('when Admin request for All fast food order', () => {
    it('should return fast food orders', (done) => {
      request.get(path).end((req, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.orders[0].userId, 'hdoentnsgel');
        assert.equal(res.body.orders[0].orderFoodId, 'qukdyktyno');
        assert.equal(res.body.orders[0].orderFoodName, 'Rice and chicken');
        assert.equal(res.body.orders[0].orderFoodPrice, 'NGN 1000');
        assert.equal(res.body.orders[0].orderFoodOrderDate, '20/09/2018');
        assert.equal(res.body.orders[0].orderFoodStatus, 'default');
        done();
      });
    });
  });
});

describe('Get an Order', () => {
  describe('when Admin request for A fast food order', () => {
    it('should return the fast food orders', (done) => {
      request.get(`${path}/rloahtnnlrv`).send().end((req, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.order.userId, 'noencytns');
        assert.equal(res.body.order.orderFoodId, 'rloahtnnlrv');
        assert.equal(res.body.order.orderFoodName, 'Fries and chicken');
        assert.equal(res.body.order.orderFoodPrice, 'NGN 500');
        assert.equal(res.body.order.orderFoodOrderDate, '24/07/2018');
        assert.equal(res.body.order.orderFoodStatus, 'accepted');
        done();
      });
    });
  });

  describe('when Admin request for A fast food order that does not exist',
    () => {
      it('should return error', (done) => {
        request.get(`${path}/randomstring`).send().end((req, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Order does not Exit');
          done();
        });
      });
    });

  describe('when Admin request with int id',
    () => {
      it('should return error', (done) => {
        request.get(`${path}/111`).send().end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Invalid Request');
          done();
        });
      });
    });
  describe('when Admin request with with a bad format',
    () => {
      it('should return error', (done) => {
        request.get(`${path}/[]`).send().end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Invalid Request');
          done();
        });
      });
    });
});

describe('Post Orders', () => {
  describe('when User input bad format input', () => {
    it('should return error', (done) => {
      request.post(path)
        .send([])
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Please Enter valid input');
          done();
        });
    });
  });


  describe('when User post data without whole field', () => {
    it('should return fast food orders', (done) => {
      request.post(path)
        .send(emptyFoodName)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'All field are required');
          done();
        });
    });
  });

  describe('when user post whitspace', () => {
    it('should return error', (done) => {
      request.post(path)
        .send(whiteSpaceName)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'whitespace not allowed');
          done();
        });
    });
  });

  describe('when user send data with input less than 3', () => {
    it('should return error', (done) => {
      request.post(path)
        .send(shortName)
        .end((req, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Input must be two char and above');
          done();
        });
    });
  });


  describe('when user send a vilid data', () => {
    it('should return the fast food orders', (done) => {
      request.post(path)
        .send(wrongFoodId)
        .end((req, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Food does not Exits');
          done();
        });
    });
  });

  describe('when user send a vilid data', () => {
    it('should return the fast food orders', (done) => {
      request.post(path)
        .send(newOrder)
        .end((req, res) => {
          assert.equal(res.status, 201);
          assert.equal(res.body.order.foodId, 'hjihdijdhi');
          assert.equal(res.body.order.orderFoodName, 'Beans and Bread');
          assert.equal(res.body.order.orderFoodPrice, 'NGN 1200');
          assert.equal(res.body.order.orderFoodStatus, 'new');
          done();
        });
    });
  });
});
