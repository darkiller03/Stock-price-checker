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
        .set("content-type","application/json")
        .query({ stock: 'TSLA' }) // Example stock
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'TSLA');
          assert.exists(res.body.stockData.price, "TSLA has a price");
          done();
        });
    });

    // Test 2: Viewing one stock and liking it
    test('Viewing one stock and liking it: GET request to /api/stock-prices/', function (done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .set("content-type","application/json")
        .query({ stock: 'GOOG', like: true })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOLD');
          assert.equal(res.body.stockData.stock, 1);
          assert.exists(res.body.stockData.price, "GOLD has a price");
          done();
        });
    });

    // Test 3: Viewing the same stock and liking it again (should not increase like count if the same IP is used)
    test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function (done) {
        chai
        .request(server)
        .get('/api/stock-prices')
        .set("content-type","application/json")
        .query({ stock: 'GOOG', like: true })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'GOLD');
          assert.equal(res.body.stockData.stock, 1);
          assert.exists(res.body.stockData.price, "GOLD has a price");
          done();
        });
    });

    // Test 4: Viewing two stocks
    test('Viewing two stocks: GET request to /api/stock-prices/', function (done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .set("content-type","application/json")
        .query({ stock: ['AMZN', 'T'] }) // Example stocks
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, "AMZN");
          assert.equal(res.body.stockData[1].stock,"T");
          assert.exists(res.body.stockData[0].price, "AMZN has a price");
          assert.exists(res.body.stockData[1].price, "T has a price");
          
          done();
        });
    });

    // Test 5: Viewing two stocks and liking them
    test('Viewing two stocks and liking them: GET request to /api/stock-prices/', function (done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .set("content-type","application/json")
        .query({ stock: ['AMZN', 'T'], like: true })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, "AMZN");
          assert.equal(res.body.stockData[1].stock,"T");
          assert.exists(res.body.stockData[0].price, "AMZN has a price");
          assert.exists(res.body.stockData[1].price, "T has a price");
          assert.exists(res.body.stockData[0].rel_likes, "has rel_likes");
          assert.exists(res.body.stockData[1].rel_likes,"has rel_likes");
          done();
        });
    });

  });
});
