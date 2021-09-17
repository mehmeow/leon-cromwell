var express = require('express');
var router = express.Router();
const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// get content got
router.get('/getstats', function (req, res, next) {
  got('https://www.outbreak.my/stats').then(response => {
    const dom = new JSDOM(response.body);
    console.log(dom.window.document.querySelector('table.table').textContent);
  }).catch(err => {
    console.log(err);
  });
  res.status(200).send({'cheerio':true});
});

module.exports = router;
