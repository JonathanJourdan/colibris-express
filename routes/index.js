var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    
  res.send({ 'message': 'Welcome to the coolest API !' },
           { 'Content-Type': 'application/json'}, 200);
    
});

module.exports = router;