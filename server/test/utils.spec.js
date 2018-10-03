
import supertest from 'supertest';
import assert from 'assert';
import jwt from 'jsonwebtoken';
import app from '../app';

const request = supertest(app);
const path = '/api/v1/orders';
const menuPath = '/api/v1/menu';
const getAPath = '/api/v1/users';

const token = jwt.sign({
  userId: '1',
  userEmail: 'anemail@gmail.com',
  userRole: 'user'
}, process.env.JWT_KEY);

const tokenAdmin = jwt.sign({
  userId: '1',
  userEmail: 'anemail@gmail.com',
  userRole: 'admin'
}, process.env.JWT_KEY);

const getAtoken = jwt.sign({
  userId: '10',
  userEmail: 'anemail@gmail.com',
  userRole: 'user'
}, process.env.JWT_KEY);

describe('check admin jwt authentication', () => {
  it('should return error when no token is provided',
    (done) => {
      request.get(path)
        .send()
        .expect('Content-Type', /json/)
        .end((req, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.error, 'No token provided');
          done();
        });
    });


  it('should return error when token is not arranged in the right format',
    (done) => {
      request.get(path)
        .send()
        .set('Authorization', `Bearer${tokenAdmin}`)
        .expect('Content-Type', /json/)
        .end((req, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.error,
            'Please Organise your token in the specified format');
          done();
        });
    });


  it('should return error when given a bad jwt token',
    (done) => {
      request.get(path)
        .send()
        .set('Authorization', `Bearer ${tokenAdmin}kshdkhdkdh`)
        .expect('Content-Type', /json/)
        .end((req, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.error, 'The token you provided is invalid');
          done();
        });
    });
  it('should return error when given a user without admin authority',
    (done) => {
      request.get(path)
        .send()
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((req, res) => {
          assert.equal(res.status, 403);
          assert.equal(res.body.error,
            'You need Admin Privilege to access this Endpoint');
          done();
        });
    });
});

describe('check user jwt authentication', () => {
  it('should return error when no token is provided',
    (done) => {
      request.get(menuPath)
        .send()
        .expect('Content-Type', /json/)
        .end((req, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.error, 'No token provided');
          done();
        });
    });

  it('should return error when given a user without admin authority',
    (done) => {
      request.get(menuPath)
        .send()
        .set('Authorization', `Bearer${token}`)
        .expect('Content-Type', /json/)
        .end((req, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.error,
            'Please Organise your token in the specified format');
          done();
        });
    });

  it('should return error when given a user without admin authority',
    (done) => {
      request.get(menuPath)
        .send()
        .set('Authorization', `Bearer ${token}hkhekdhks`)
        .expect('Content-Type', /json/)
        .end((req, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.error, 'The token you provided is invalid');
          done();
        });
    });
});

describe('check user user exist ', () => {
  it('should return error when given a user id that does not exist',
    (done) => {
      request.get(`${getAPath}/10/orders`)
        .send()
        .set('Authorization', `Bearer ${getAtoken}`)
        .expect('Content-Type', /json/)
        .end((req, res) => {
          assert.equal(res.status, 422);
          assert.equal(res.body.error, 'User Id does not exist');
          done();
        });
    });
  it('should return error when given a user id that does not exist',
    (done) => {
      request.get(`${getAPath}/10/orders`)
        .send()
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((req, res) => {
          assert.equal(res.status, 403);
          assert.equal(res.body.error, 'You can only access your account data');
          done();
        });
    });
});
