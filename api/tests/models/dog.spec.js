const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('height', () => {
      it('should throw an error if height is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a height that match the requirements')))
          .catch(() => done());
      });
      it('should work when its a valid height', () => {
        Dog.create({ height: '12 - 13' });
      });
    });
  });
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('age', () => {
      it('should throw an error if the datatypes dont match', (done) => {
        Dog.create({ age: '1' })
          .then(() => done(new Error('It requires a valid age')))
          .catch(() => done());
      });
      it('should work when its a valid age', () => {
        Dog.create({ age: 1 });
      });
    });
  });  
});