const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  suite('5 functional GET request tests', function () {
    
    // Test 1: Viewing one stock
    test('Viewing one stock: GET request to /api/stock-prices/', function (done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'TSLA' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal('TSLA', res.body.stockData.stock);
          assert.exists(res.body.stockData.price, "TSLA has a price");
          assert.exists(res.body.stockData.likes, "TSLA has likes count");
          done();
        });
    });

    // Test 2: Viewing one stock and liking it
    test('Viewing one stock and liking it: GET request to /api/stock-prices/', function (done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'GOOG', like: true })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal('GOOG', res.body.stockData.stock);
          assert.equal(1, res.body.stockData.likes);
          assert.exists(res.body.stockData.price, "GOOG has a price");
          done();
        });
    });

    // Test 3: Viewing the same stock and liking it again (should not increase like count)
    test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function (done) {
        chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'GOOG', like: true })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal('GOOG', res.body.stockData.stock);
          assert.equal(1, res.body.stockData.likes);
          assert.exists(res.body.stockData.price, "GOOG has a price");
          done();
        });
    });

    // Test 4: Viewing two stocks
    test('Viewing two stocks: GET request to /api/stock-prices/', function (done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: ['AMZN', 'T'] })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal('AMZN', res.body.stockData[0].stock);
          assert.equal('T', res.body.stockData[1].stock);
          assert.exists(res.body.stockData[0].price, "AMZN has a price");
          assert.exists(res.body.stockData[1].price, "T has a price");
          assert.exists(res.body.stockData[0].rel_likes, "AMZN has rel_likes");
          assert.exists(res.body.stockData[1].rel_likes, "T has rel_likes");
          done();
        });
    });

    // Test 5: Viewing two stocks and liking them
    test('Viewing two stocks and liking them: GET request to /api/stock-prices/', function (done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: ['AMZN', 'T'], like: true })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal('AMZN', res.body.stockData[0].stock);
          assert.equal('T', res.body.stockData[1].stock);
          assert.exists(res.body.stockData[0].price, "AMZN has a price");
          assert.exists(res.body.stockData[1].price, "T has a price");
          assert.exists(res.body.stockData[0].rel_likes, "AMZN has rel_likes");
          assert.exists(res.body.stockData[1].rel_likes, "T has rel_likes");
          done();
        });
    });

  });
});