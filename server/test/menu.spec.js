import supertest from 'supertest';
import assert from 'assert';
import jwt from 'jsonwebtoken';
import app from '../app';

const request = supertest(app);
const path = '/api/v1/menu';

const token = jwt.sign({
  userId: '1',
  userEmail: 'anemail@gmail.com',
  userRole: 'admin'
}, process.env.JWT_KEY);

const newMeal = {
  menuName: 'Dodo and Beans',
  menuPrice: '1000',
  menuCategory: 'intercontenental',
  menuImage: 'www.andelaimagesforbootcamp.com'
};

const emptyMenuName = {
  menuName: '',
  menuPrice: '1000',
  menuCategory: 'intercontenental',
  menuImage: 'www.andelaimagesforbootcamp.com'
};
const highMenuPrice = {
  menuName: 'beans and yam',
  menuPrice: '100000',
  menuCategory: 'intercontenental',
  menuImage: 'www.andelaimagesforbootcamp.com'
};

const wrongMenuFormat = {
  menuName: [],
  menuPrice: '100000',
  menuCategory: 'intercontenental',
  menuImage: 'www.andelaimagesforbootcamp.com'
};
const wrongCatInput = {
  menuName: 'chicken and chips',
  menuPrice: '100000',
  menuCategory: '-¬',
  menuImage: 'www.andelaimagesforbootcamp.com'
};
const wrongNameInput = {
  menuName: '.?',
  menuPrice: '100000',
  menuCategory: '-¬',
  menuImage: 'www.andelaimagesforbootcamp.com'
};
const emptyCategoryWhitespace = {
  menuName: 'chicken and chips',
  menuPrice: '100',
  menuCategory: '    ',
  menuImage: 'www.andelaimagesforbootcamp.com'
};
const invalidPrice = {
  menuName: 'chicken and chips',
  menuPrice: 'tobi',
  menuCategory: 'touuu',
  menuImage: 'www.andelaimagesforbootcamp.com'
};
const longCategoryLength = {
  menuName: 'chicken and chips',
  menuPrice: '100000',
  menuCategory: 'thojdokljdolkjdoknmdkndokndlknjsdkmnmdpmndkmndkj',
  menuImage: 'www.andelaimagesforbootcamp.com'
};

const longNameLength = {
  menuName: 'thojdokljdolkjdoknmdkndokndlknjsdkmnmdpmndkmndkj',
  menuPrice: '100000',
  menuCategory: 'rice and beans',
  menuImage: 'www.andelaimagesforbootcamp.com'
};

const imageWhiteSpace = {
  menuName: 'andela food',
  menuPrice: '1000',
  menuCategory: 'rice and beans',
  menuImage: 'www.andelaim agesforbootcamp.com'
};


describe('Add menu Api Test', () => {
  it('should return error when given empty Menu Name',
    (done) => {
      request.post(`${path}/`)
        .send(emptyMenuName)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Please fill all field');
          done();
        });
    });
  it('should return error when given an high menu price',
    (done) => {
      request.post(`${path}/`)
        .send(highMenuPrice)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Price should not be more than 10000');
          done();
        });
    });
  it('should return error when given wrong menu format',
    (done) => {
      request.post(`${path}/`)
        .send(wrongMenuFormat)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Invalid input type');
          done();
        });
    });
  it('should return error when given a bad menu category input details',
    (done) => {
      request.post(`${path}/`)
        .send(wrongCatInput)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
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
        .send(wrongNameInput)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
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
        .send(longCategoryLength)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
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
        .send(longNameLength)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Menu Name should be less than 40 char');
          done();
        });
    });
  it('should return error when given empty menu category input',
    (done) => {
      request.post(`${path}/`)
        .send(emptyCategoryWhitespace)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Please Make sure all Input are Entered Properly');
          done();
        });
    });
  it('should return error when given image with white spaces',
    (done) => {
      request.post(`${path}/`)
        .send(imageWhiteSpace)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'White Space is not allowed in Images');
          done();
        });
    });
  it('should return error when given invalid price',
    (done) => {
      request.post(`${path}/`)
        .send(invalidPrice)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Invalid Price Type');
          done();
        });
    });
  it('should return success when given valid menu data',
    (done) => {
      request.post(`${path}/`)
        .send(newMeal)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.message, 'Menu Added Successfully');
          done();
        });
    });
});

describe('Get Available menu Api Test', () => {
  it('should return success when authenticated user access to get all menu',
    (done) => {
      request.get(`${path}/`)
        .send()
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.menu[0].menu_name, 'Dodo and Beans');
          assert.equal(res.body.menu[0].menu_price, '1000');
          assert.equal(res.body.menu[0].menu_category, 'intercontenental');
          assert.equal(res.body.menu[0].menu_image,
            'www.andelaimagesforbootcamp.com');
          done();
        });
    });
});
