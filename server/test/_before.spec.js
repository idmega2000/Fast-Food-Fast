import { tableCreatedEmitter } from '../models/DbConnect';

before((done) => {
  tableCreatedEmitter.on('databaseStarted', () => {
    done();
  });
});
