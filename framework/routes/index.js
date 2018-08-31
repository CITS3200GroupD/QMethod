var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET page 3*/
router.get('/page3', function(req, res, next) {
  res.render('page 3');
});

module.exports = router;
