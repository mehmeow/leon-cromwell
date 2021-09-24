var express = require('express');
var router = express.Router();
const HtmlTableToJson = require('html-table-to-json');
const got = require('got');
const jsdom = require("jsdom");
const { text } = require('cheerio/lib/api/manipulation');
const { JSDOM } = jsdom;
require('dotenv').config();
const axios = require('axios').default;

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

// get dummy detailed recipes
router.post('/random', function (req, res, next) {
  // const data = require("./recipes.json");
  const filters = req.body;
  const params = {
    apiKey: process.env.REACT_APP_API_KEY,
    ...filters
  }

  axios.get(process.env.REACT_APP_API + "/random", { params })
    .then(response => {
      res.status(200).send({ data: response.data, count: response.data.recipes.length });
    });
});

// get dummy nutrition
router.get('/nutrition', function (req, res, next) {
  const data = require("./nutrition.json");
  res.status(200).send(data);
});

// get dummy nutrition
router.get('/taste', function (req, res, next) {
  const data = require("./taste.json");
  res.status(200).send(data);
});

module.exports = router;
