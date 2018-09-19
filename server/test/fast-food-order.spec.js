import supertest from 'supertest';
import assert from 'assert';
import app from '../../app';

const request = supertest(app);
const path = '/api/v1/orders';

describe('Get all Orders', () => {
    describe('when Admin request for All fast food order', () => {
        it('should return fast food orders', (done) => {
            request.get(path).end((req, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.orders[0].userId, 'hdoentnsgel');
                assert.equal(res.body.orders[0].fastFoodId, 'qukdyktyno');
                assert.equal(res.body.orders[0].fastFoodFood, 'Rice and chicken');
                assert.equal(res.body.orders[0].fastFoodPrice, 'NGN 1000');
                assert.equal(res.body.orders[0].FastFoodOrderDate, '20/09/2018');
                assert.equal(res.body.orders[0].FastFoodImage, 'pjrjldnlrblklhhohfrwdnr.jpg');
                assert.equal(res.body.orders[0].FastFoodStatus, 'default');
                done();
            });
        });
    });
});
