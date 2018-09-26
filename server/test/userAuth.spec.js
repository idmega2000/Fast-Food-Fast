import supertest from 'supertest';
import assert from 'assert';
import app from '../app';

const request = supertest(app);
const path = '/api/v1/auth';

const shortUserEmail = {
  userEmail: 'idm',
  userPassword: 'andela'
};

const shortPassword = {
  userEmail: 'idmegat@gmail.com',
  userPassword: 'and'
};

const whiteSpace = {
  userEmail: 'wh tespa@gmail.com',
  userPassword: 'andkinte'
};

const worongInputType = {
  userEmail: [],
  userPassword: 'andkinte'
};

const emailHaveWrongInput = {
  userEmail: 'wh}tespa',
  userPassword: 'andkinte'
};

const passHaveWrongInput = {
  userEmail: 'sholaforyou@gmail.com',
  userPassword: 'and-~kinte'
};
const passHavelongInput = {
  userEmail: 'sholaforyou@gmail.com',
  userPassword: 'kjdhfkjjnhfkjhnfikjnfkjnifjnfjinfijnfifnkfnkjfninte'
};
const emailHavelongInput = {
  userEmail: 'whjlkmlkhfijfdhifj@jfkhfhfhhjfhffhiff.com',
  userPassword: 'andkinte'
};
const newUser = {
  userEmail: 'idmega3000@gmail.com',
  userPassword: 'andela'
};

const existingUserSignUP = {
  userEmail: 'idrisaa@gmail.com',
  userPassword: 'andela'
};

const emptyUserEmail = {
  userEmail: '',
  userPassword: 'andela'
};

const emptyPassword = {
  userEmail: 'idrisaa@gmail.com',
  userPassword: ''
};


describe('All Authentication Tests', () => {
  it('should return error when given an empty email',
    (done) => {
      request.post(`${path}/signup`)
        .send(worongInputType)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Invalid input type');
          done();
        });
    });

  it('should return error when given an empty Email',
    (done) => {
      request.post(`${path}/signup`)
        .send(emptyUserEmail)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Please fill all field');
          done();
        });
    });

  it('should return error when given an empty password',
    (done) => {
      request.post(`${path}/signup`)
        .send(emptyPassword)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Please fill all field');
          done();
        });
    });

  it('should return error when given a short Email',
    (done) => {
      request.post(`${path}/signup`)
        .send(shortUserEmail)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Email should be six character and above');
          done();
        });
    });

  it('should return error when given short password',
    (done) => {
      request.post(`${path}/signup`)
        .send(shortPassword)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Password can only be six character and above');
          done();
        });
    });

  it('should return error when  given wrong password input',
    (done) => {
      request.post(`${path}/signup`)
        .send(passHaveWrongInput)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Password can only be alphabets and numbers');
          done();
        });
    });

  it('should return error when  given wrong Email input',
    (done) => {
      request.post(`${path}/signup`)
        .send(emailHaveWrongInput)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Please Enter a valid Email');
          done();
        });
    });

  it('should return error when input has whitespace',
    (done) => {
      request.post(`${path}/signup`)
        .send(whiteSpace)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'White spaces are not allowed in input');
          done();
        });
    });

  it('should return error when given too long Email',
    (done) => {
      request.post(`${path}/signup`)
        .send(emailHavelongInput)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Email should be less than 30 char');
          done();
        });
    });


  it('should return error when given too long password',
    (done) => {
      request.post(`${path}/signup`)
        .send(passHavelongInput)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Password must be less than 40 char');
          done();
        });
    });

  it('should return error when given too long password',
    (done) => {
      request.post(`${path}/signup`)
        .send(existingUserSignUP)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 409);
          assert.equal(res.body.error, 'User already exist');
          done();
        });
    });

  describe('Signup Api Test', () => {
    it('should return success when given new user',
      (done) => {
        request.post(`${path}/signup`)
          .send(newUser)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            assert.equal(res.statusCode, 201);
            assert.equal(res.body.message, 'Registration Successful');
            assert.notEqual(res.body.token, null);
            done();
          });
      });
  });
});

describe('Signup Api Test', () => {
  it('should return success when given login details',
    (done) => {
      request.post(`${path}/login`)
        .send(existingUserSignUP)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.message, 'Login Successful');
          assert.notEqual(res.body.token, null);
          done();
        });
    });
});
