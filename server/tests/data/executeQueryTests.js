'use strict';

const data = require('../../data');
const expect = require('chai').expect;

const executeQuery = data.executeQuery;
const getClient = data.getClient;

describe('data/executeQuery()', () => {

  it('can query a table', () => {
    return executeQuery('SELECT * FROM users')
      .then(function (result) {
        expect(result.rows.length).to.be.at.least(1);
      });
  });

  it('can return a parameterized query', () => {
    return executeQuery('SELECT $1::int as number', [123])
      .then(function (result) {
        let number = result.rows[0].number;
        expect(number).to.equal(123);
      });
  });

  it('can return a simple result', () => {
    let start = Date.now();
    return executeQuery('SELECT NOW() AS time')
      .then(function (result) {
        let timestamp = (new Date(result.rows[0].time)).getTime();
        expect(timestamp).to.be.closeTo(start, 100);
      });
  });

});
