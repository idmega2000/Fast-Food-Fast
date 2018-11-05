import supertest from 'supertest';
import assert from 'assert';
import app from '../app';

const request = supertest(app);
const path = '/api/v1/auth';

const shortUserEmail = {
  userName: 'john andela',
  userEmail: 'idm',
  userPassword: 'andela'
};

const shortPassword = {
  userName: 'john andela',
  userEmail: 'idmegat@gmail.com',
  userPassword: 'and'
};

const whiteSpace = {
  userName: 'john andela',
  userEmail: 'wh tespa@gmail.com',
  userPassword: 'andkinte'
};

const worongInputType = {
  userName: 'john andela',
  userEmail: [],
  userPassword: 'andkinte'
};

const emailHaveWrongInput = {
  userName: 'john andela',
  userEmail: 'wh}tespa',
  userPassword: 'andkinte'
};

const passHaveWrongInput = {
  userName: 'john andela',
  userEmail: 'sholaforyou@gmail.com',
  userPassword: 'and-~kinte'
};
const passHavelongInput = {
  userName: 'john andela',
  userEmail: 'sholaforyou@gmail.com',
  userPassword: 'kjdhfkjjnhfkjhnfikjnfkjnifjnfjinfijnfifnkfnkjfninte'
};
const emailHavelongInput = {
  userName: 'john andela',
  userEmail: 'whjlkmlkhfijfdhifj@jfkhfhfhhjfhffhiff.com',
  userPassword: 'andkinte'
};
const newUser = {
  userName: 'john andela',
  userEmail: 'idmega3000@gmail.com',
  userPassword: 'andela'
};

const existingUserSignUP = {
  userName: 'john andela',
  userEmail: 'idrisaa@gmail.com',
  userPassword: 'andela'
};

const emptyUserEmail = {
  userName: 'john andela',
  userEmail: '',
  userPassword: 'andela'
};

const emptyPassword = {
  userName: 'john andela',
  userEmail: 'idrisaa@gmail.com',
  userPassword: ''
};
const loginWrongUser = {
  userName: 'john andela',
  userEmail: 'idrisa@gmail.com',
  userPassword: 'anielata'
};
const existingUserWrongPass = {
  userName: 'john andela',
  userEmail: 'idrisaa@gmail.com',
  userPassword: 'andelaja'
};
const nameHaveWrongInput = {
  userName: 'wh}+tespa',
  userEmail: 'shola@gmail.com',
  userPassword: 'andkinte'
};
const nameLongInput = {
  userName: 'whjlkmlkhfijfdhifjjfkhfhfhhjfhffhiff hdidodhd',
  userEmail: 'shola@gmail.com',
  userPassword: 'andkinte'
};

describe('All Tes Authentication', () => {
  it('should return error when given empty useremail',
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

  it('should return error when given empty userEmail',
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

  it('should return error when given empty password',
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

  it('should return error when given a short userEmail',
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

  it('should return error when  given wrong userEmail input',
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

  it('should return error when given too long useremail',
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
  it('should return error when given name with bad input',
    (done) => {
      request.post(`${path}/signup`)
        .send(nameHaveWrongInput)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'name can only be char and number');
          done();
        });
    });

  it('should return error when given name that is too long',
    (done) => {
      request.post(`${path}/signup`)
        .send(nameLongInput)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'name should be less than 20 char');
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

describe('Login Api Test', () => {
  it('should return error when given a user that does not exist',
    (done) => {
      request.post(`${path}/login`)
        .send(loginWrongUser)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 401);
          assert.equal(res.body.error, 'Incorrect Email/Password');
          done();
        });
    });

  it('should return error when given a good user and wrong password',
    (done) => {
      request.post(`${path}/login`)
        .send(existingUserWrongPass)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 401);
          assert.equal(res.body.error, 'Incorrect Email/Password');
          done();
        });
    });

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
