var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get page content
// router.get('/getcontent', function (req, res, next) {
//   var options = {
//     host: 'www.google.com',
//     port: 80,
//     path: '/index.html'
//   };
  
//   http.get(options, function(res) {
//     console.log("Got response: " + res.statusCode);
//   }).on('error', function(e) {
//     console.log("Got error: " + e.message);
//   });
// });

module.exports = router;
