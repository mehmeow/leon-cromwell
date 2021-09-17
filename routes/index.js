var express = require('express');
var router = express.Router();
const HtmlTableToJson = require('html-table-to-json');
const got = require('got');
const jsdom = require("jsdom");
const { text } = require('cheerio/lib/api/manipulation');
const { JSDOM } = jsdom;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// get outbreak stats
router.get('/getstats', function (req, res, next) {
  got('https://www.outbreak.my/stats').then(response => {
    const dom = new JSDOM(response.body);
    const table = dom.window.document.querySelector('#casesTable').outerHTML;
    // convert table to json
    const jsonTables = HtmlTableToJson.parse(table);
    res.status(200).send(jsonTables.results[0]);
  }).catch(err => {
    console.log(err);
  });
});

// get outbreak map
router.get('/getmap', function (req, res, next) {
  got('https://www.outbreak.my/api/cases/map').then(response => {
    // clean html
    const clean = response.body.replace(/(<([^>]+)>)/gi, "");
    res.status(200).send(JSON.parse(clean).data);
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;
