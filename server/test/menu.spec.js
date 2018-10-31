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
  menuCategory: 'intercontenental',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};

const newMealEdited = {
  menuName: 'Dodo and chicken',
  menuPrice: '1000',
  menuCategory: 'intercontenental',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};

const newMealDel = {
  menuName: 'Rice and Beans',
  menuPrice: '1200',
  menuCategory: 'intercontenental',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};

const newMealBadImage = {
  menuName: 'Dodo and Beans',
  menuPrice: '1000',
  menuCategory: 'intercontenental',
  menuImage: 'www.andelaimagesforbootcamp.js'
};

const emptyMenuName = {
  menuName: '',
  menuPrice: '1000',
  menuCategory: 'intercontenental',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};
const smallNameInput = {
  menuName: 'ba',
  menuPrice: '100000',
  menuCategory: 'intercontenental',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};
const smallCategoryInput = {
  menuName: 'banura',
  menuPrice: '100000',
  menuCategory: 'th',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};

const wrongMenuFormat = {
  menuName: [],
  menuPrice: '100000',
  menuCategory: 'intercontenental',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};
const wrongCatInput = {
  menuName: 'chicken and chips',
  menuPrice: '100000',
  menuCategory: '-¬',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};
const wrongNameInput = {
  menuName: '.?',
  menuPrice: '100000',
  menuCategory: '-¬',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};
const emptyCategoryWhitespace = {
  menuName: 'chicken and chips',
  menuPrice: '100',
  menuCategory: '    ',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};
const invalidPrice = {
  menuName: 'chicken and chips',
  menuPrice: 'tobi',
  menuCategory: 'touuu',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};
const longCategoryLength = {
  menuName: 'chicken and chips',
  menuPrice: '100000',
  menuCategory: 'thojdokljdolkjdoknmdkndokndlknjsdkmnmdpmndkmndkj',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};

const longNameLength = {
  menuName: 'thojdokljdolkjdoknmdkndokndlknjsdkmnmdpmndkmndkj',
  menuPrice: '100000',
  menuCategory: 'rice and beans',
  menuImage: 'www.andelaimagesforbootcamp.jpg'
};

const imageWhiteSpace = {
  menuName: 'andela food',
  menuPrice: '1000',
  menuCategory: 'rice and beans',
  menuImage: 'www.andelaim agesforbootcamp.jpg'
};
const imageWrongFormat = {
  menuName: 'andela food',
  menuPrice: '1000',
  menuCategory: 'rice and beans',
  menuImage: []
};

const badPrice = {
  menuName: 'andela food',
  menuPrice: '0.1',
  menuCategory: 'rice and beans',
  menuImage: 'www.andelaim agesforbootcamp.jpg'
};


describe('Get Available menu Api Test ', () => {
  it(`should return success when authenticated user access to 
    get all menu and an empty array when no message is available`,
  (done) => {
    request.get(`${path}/`)
      .send()
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
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
        .send(emptyMenuName)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Please fill all field');
          done();
        });
    });
  it('should return error when given a wrong Image format',
    (done) => {
      request.post(`${path}/`)
        .send(imageWrongFormat)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Image Link should be a String');
          done();
        });
    });
  it('should return error when given short image name',
    (done) => {
      request.post(`${path}/`)
        .send(smallNameInput)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'menu Name should be three character and above');
          done();
        });
    });

  it('should return error when given chategory less than 3',
    (done) => {
      request.post(`${path}/`)
        .send(smallCategoryInput)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error,
            'Menu Category can only be three character and above');
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
  it('should return error when given a price lee than 1',
    (done) => {
      request.post(`${path}/`)
        .send(badPrice)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Price should be NGN 1 amd above');
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
            'Please Make sure all Input only contain Alphanumeric characters');
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
          assert.equal(res.body.error, 'Price can only be integer');
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
          assert.equal(res.body.menu.menu_name, 'Dodo and Beans');
          assert.equal(res.body.menu.menu_price, '1000');
          assert.equal(res.body.menu.menu_category, 'intercontenental');
          assert.equal(res.body.menu.menu_image,
            'www.andelaimagesforbootcamp.jpg');
          done();
        });
    });

  it('should return error when given image with bad format ',
    (done) => {
      request.post(`${path}/`)
        .send(newMealBadImage)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'Please upload a valid image');
          done();
        });
    });
  it('should return conflict error when given a menu that already exist ',
    (done) => {
      request.post(`${path}/`)
        .send(newMeal)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
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
        .send()
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.menu[0].menu_name, 'Dodo and Beans');
          assert.equal(res.body.menu[0].menu_price, '1000');
          assert.equal(res.body.menu[0].menu_category, 'intercontenental');
          assert.equal(res.body.menu[0].menu_image,
            'www.andelaimagesforbootcamp.jpg');
          done();
        });
    });
});

describe('Get Available menu Api Test', () => {
  it('should return success when given valid menu data',
    (done) => {
      request.post(`${path}/`)
        .send(newMealDel)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.message, 'Menu Added Successfully');
          assert.equal(res.body.menu.menu_name, 'Rice and Beans');
          assert.equal(res.body.menu.menu_price, '1200');
          assert.equal(res.body.menu.menu_category, 'intercontenental');
          assert.equal(res.body.menu.menu_image,
            'www.andelaimagesforbootcamp.jpg');
          done();
        });
    });
});


describe('Edit menu Api Test', () => {
  it('should return error when given menuId that does not exist',
    (done) => {
      request.put(`${path}/1222`)
        .send(newMealDel)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 404);
          assert.equal(res.body.error, 'menuId does not exist');
          done();
        });
    });
  it('should return success when given valid menu data',
    (done) => {
      request.put(`${path}/1`)
        .send(newMealEdited)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.message, 'menu updated successfully');
          assert.equal(res.body.menu[0].menu_name, 'Dodo and chicken');
          assert.equal(res.body.menu[0].menu_price, '1000');
          assert.equal(res.body.menu[0].menu_category, 'intercontenental');
          assert.equal(res.body.menu[0].menu_image,
            'www.andelaimagesforbootcamp.jpg');
          done();
        });
    });
});

describe('Delete menu Api Test', () => {
  it('should return error when given an invalid menuId',
    (done) => {
      request.delete(`${path}/tobi`)
        .send()
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          assert.equal(res.body.error, 'menuId can only be Integer');
          done();
        });
    });

  it('should return error when given menuId that does not exist',
    (done) => {
      request.delete(`${path}/1222`)
        .send()
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 404);
          assert.equal(res.body.error, 'menuId does not exist');
          done();
        });
    });
  it('should return success when given valid menu data',
    (done) => {
      request.delete(`${path}/1`)
        .send()
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.message, 'menu deleted successfully');
          assert.equal(res.body.menu[0].menu_name, 'Dodo and chicken');
          assert.equal(res.body.menu[0].menu_price, '1000');
          assert.equal(res.body.menu[0].menu_category, 'intercontenental');
          assert.equal(res.body.menu[0].menu_image,
            'www.andelaimagesforbootcamp.jpg');
          done();
        });
    });
});
