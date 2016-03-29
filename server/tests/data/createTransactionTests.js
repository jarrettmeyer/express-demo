'use strict';

const assert = require('chai').assert;
const data = require('../../data');
const expect = require('chai').expect;

const createClient = data.createClient;
const createTransaction = data.createTransaction;

describe('data/createTransaction', () => {

  it('can operate a simple transaction', () => {
    return createTransaction()
      .then((txn) => {
        txn.begin();
        txn.query('SELECT NOW() as time;');
        txn.query('SELECT NOW() as time;');
        txn.query('SELECT NOW() as time;');
        txn.commit();
      })
      .catch((error) => {
        assert.fail(error);
      });
  });

  it('can perform a more complex series of actions', () => {
    let answer = 0;
    let client = null;
    let tableName = 'temp_table_' + Date.now().toString();
    return createClient()
      .then(_client => {
        client = _client;
        return createTransaction(client);
      })
      .then(txn => {
        txn.begin();
        txn.query(`CREATE TEMP TABLE ${tableName} (time timestamptz);`);
        txn.commit();
        txn.begin();
        txn.query(`INSERT INTO ${tableName} (time) VALUES ( NOW() );`);
        txn.query(`INSERT INTO ${tableName} (time) VALUES ( NOW() );`);
        txn.query(`INSERT INTO ${tableName} (time) VALUES ( NOW() );`);
        txn.commit();
        txn.begin();
        txn.query(`SELECT * FROM ${tableName};`);
        return txn.commit();
      })
      .then(results => {
        expect(results.length).to.equal(11);
        let count = results[9].rows.length;
        expect(count).to.equal(3);
      })
      .then(() => {
        client.end();
      });
  });

});
