import supertest from 'supertest';
import assert from 'assert';
import jwt from 'jsonwebtoken';
import app from '../app';

const request = supertest(app);
const path = '/api/v1/menu';

const token = jwt.sign({
  userId: '1',
  userRole: 'admin'
}, process.env.JWT_KEY);

const newMeal = {
  menuName: 'Dodo and Beans',
  menuPrice: '1000',
  menuCategory: 'intercontenental'
};

const emptyMenuName = {
  menuName: '',
  menuPrice: '1000',
  menuCategory: 'intercontenental'
};
const smallCategoryInput = {
  menuName: 'banura',
  menuPrice: '100000',
  menuCategory: 'th'
};

const wrongCatInput = {
  menuName: 'chicken and chips',
  menuPrice: '100000',
  menuCategory: '-¬'
};
const wrongNameInput = {
  menuName: '.?',
  menuPrice: '100000',
  menuCategory: '-¬'
};
const emptyCategoryWhitespace = {
  menuName: 'chicken and chips',
  menuPrice: '100',
  menuCategory: '    '
};
const invalidPrice = {
  menuName: 'chicken and chips',
  menuPrice: 'tobi',
  menuCategory: 'touuu'
};
const longCategoryLength = {
  menuName: 'chicken and chips',
  menuPrice: '100000',
  menuCategory: 'thojdokljdolkjdoknmdkndokndlknjsdkmnmdpmndkmndkj'
};

const longNameLength = {
  menuName: 'thojdokljdolkjdoknmdkndokndlknjsdkmnmdpmndkmndkj',
  menuPrice: '100000',
  menuCategory: 'rice and beans',
};


const badPrice = {
  menuName: 'andela food',
  menuPrice: '0.1',
  menuCategory: 'rice and beans'
};


describe('Get Available menu Api Test ', () => {
  it(`should return success when authenticated user access to 
    get all menu and an empty array when no message is available`,
  (done) => {
    request.get(`${path}/`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'multipart/form-data')
      .set('connection', 'keep-alive')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.message, 'No menu Available');
        done();
      });
  });
});
describe('Add menu Api Test', () => {
  it('should return error when given empty Menu Name',
    (done) => {
      request.post(`${path}/`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'multipart/form-data')
        .set('connection', 'keep-alive')
        .field(emptyMenuName)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Please fill all field');
          done();
        });
    });

  it('should return error when given chategory less than 3',
    (done) => {
      request.post(`${path}/`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'multipart/form-data')
        .set('connection', 'keep-alive')
        .field(smallCategoryInput)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Menu Category can only be three character and above');
          done();
        });
    });
  it('should return error when given a price lee than 1',
    (done) => {
      request.post(`${path}/`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'multipart/form-data')
        .set('connection', 'keep-alive')
        .field(badPrice)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Price should be NGN 1 amd above');
          done();
        });
    });
  it('should return error when given a bad menu category input details',
    (done) => {
      request.post(`${path}/`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'multipart/form-data')
        .set('connection', 'keep-alive')
        .field(wrongCatInput)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Menu Category should be alphabet numbers and space');
          done();
        });
    });
  it('should return error when bad menu name format',
    (done) => {
      request.post(`${path}/`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'multipart/form-data')
        .set('connection', 'keep-alive')
        .field(wrongNameInput)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Menu Name should be alphabet numbers and space');
          done();
        });
    });
  it('should return error when long category meal input',
    (done) => {
      request.post(`${path}/`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'multipart/form-data')
        .set('connection', 'keep-alive')
        .field(longCategoryLength)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Menu category should be less than 40 char');
          done();
        });
    });
  it('should return error when given long meal name',
    (done) => {
      request.post(`${path}/`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'multipart/form-data')
        .set('connection', 'keep-alive')
        .field(longNameLength)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Menu Name should be less than 40 char');
          done();
        });
    });
  it('should return error when given empty menu category input',
    (done) => {
      request.post(`${path}/`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'multipart/form-data')
        .set('connection', 'keep-alive')
        .field(emptyCategoryWhitespace)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Please Make sure all Input only contain Alphanumeric characters');
          done();
        });
    });
  it('should return error when given invalid price',
    (done) => {
      request.post(`${path}/`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'multipart/form-data')
        .set('connection', 'keep-alive')
        .field(invalidPrice)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Price can only be integer');
          done();
        });
    });
  it('should return success when given valid menu data',
    (done) => {
      request.post(`${path}/`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'multipart/form-data')
        .set('connection', 'keep-alive')
        .field(newMeal)
        .end((err, res) => {
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.message, 'Menu Added Successfully');
          assert.equal(res.body.menu.menu_name, 'Dodo and Beans');
          assert.equal(res.body.menu.menu_price, '1000');
          assert.equal(res.body.menu.menu_category, 'intercontenental');
          done();
        });
    });

  it('should return conflict error when given a menu that already exist ',
    (done) => {
      request.post(`${path}/`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'multipart/form-data')
        .set('connection', 'keep-alive')
        .field(newMeal)
        .end((err, res) => {
          assert.equal(res.statusCode, 409);
          assert.equal(res.body.error,
            'A Menu with this name and price already Exist');
          done();
        });
    });
});

describe('Get Available menu Api Test', () => {
  it('should return success when authenticated user access to get all menu',
    (done) => {
      request.get(`${path}/`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'multipart/form-data')
        .set('connection', 'keep-alive')
        .field({})
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.menu[0].menu_name, 'Dodo and Beans');
          assert.equal(res.body.menu[0].menu_price, '1000');
          assert.equal(res.body.menu[0].menu_category, 'intercontenental');
          done();
        });
    });
});
