import supertest from 'supertest';
import assert from 'assert';
import jwt from 'jsonwebtoken';
import app from '../app';


const request = supertest(app);
const path = '/api/v1/orders';


const token = jwt.sign({
  userId: '1',
  userEmail: 'anemail@gmail.com',
  userRole: 'admin'
}, process.env.JWT_KEY);

const newOrder = {
  orderPhone: '08045676746',
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
  orderPhone: '08045676746',
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
  orderPhone: '08045676746',
  orderInfo: [
    { foodId: 'hdhdidnid', quantity: 1 }
  ],
  orderAddress: ' ',
};

const noAddress = {
  orderPhone: '08045676746',
  orderInfo: [
    { foodId: 'hdhdidnid', quantity: 1 }
  ],
  orderAddress: ''
};
const shortAddress = {
  orderPhone: '08045676746',
  orderInfo: [
    {
      foodId: 'hdhdidnid', quantity: 1
    }
  ],
  orderAddress: 'fjfkk'
};

const orderInfoString = {
  orderInfo: 'jkldjdkj',
  orderPhone: '08045676746',
  orderAddress: '200 abakaliki junction'
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


describe('Post Orders', () => {
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


  it('should return error when user send incomplete field', (done) => {
    request.post(path)
      .set('Authorization', `Bearer ${token}`)
      .send(noAddress)
      .end((req, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.error, 'All fields are required');
        done();
      });
  });
});
