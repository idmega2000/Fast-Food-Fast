import supertest from 'supertest';
import assert from 'assert';
import { tableCreatedEmitter } from '../models/DbConnect';
import app from '../app';

const startUser = {
  userName: 'Idris Wale',
  userEmail: 'idrisaa@gmail.com',
  userPassword: 'andela'
};

const request = supertest(app);
const path = '/api/v1/auth';

before((done) => {
  tableCreatedEmitter.on('databaseStarted', () => {
    request.post(`${path}/signup`)
      .send(startUser)
      .expect('Content-Type', 'multipart/form-data')
      .end((err, res) => {
        assert.equal(res.statusCode, 201);
        done();
      });
  });
});
