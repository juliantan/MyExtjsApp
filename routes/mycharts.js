var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('my_chart', { title: 'My Chart' });
});

module.exports = router;
