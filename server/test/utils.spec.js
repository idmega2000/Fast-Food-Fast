
import assert from 'assert';
import getId from '../helpers/utils';


describe('Gen Id test', () => {
  it('it should have return of string', (done) => {
    assert.equal(typeof getId(), 'string');
    done();
  });

  it('it should return id of length of 10', (done) => {
    assert.equal(getId().length, 10);
    done();
  });
});
