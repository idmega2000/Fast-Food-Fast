
import assert from 'assert';
import getId from '../helpers/utils';


describe('when the id is accessed', () => {
  it('it should have return of string', (done) => {
    assert.equal(typeof getId(), 'string');
    done();
  });
});

describe('when the id is accessed', () => {
  it('it should return id of length of 10', (done) => {
    assert.equal(getId().length, 10);
    done();
  });
});
