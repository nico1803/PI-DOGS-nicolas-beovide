/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  weight: "12 - 16",
  height: "22 - 31"
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe("Temperaments route", () => {
    describe("GET /temperaments", () => {
      it("expect 200 receiving temperaments", () => agent.get("/temperaments").expect(200));
    });
  });
  describe("Receive a dog using id", () => {
    describe("GET /dogs/:id", () => {
      it("expect 200 if a valid id is passed", () =>
        agent.get("/dogs/13").expect(200));
    });
    describe("GET /dogs?name=xxx", () => {
      it("expect 200 if a valid name is passed", () =>
        agent.get("/dogs?name=affen"));
    });
  })
});