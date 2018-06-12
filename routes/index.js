var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var type = req.method;
    var path = req.originalUrl;
    
  res.render(global.actions_json[type+path].view, {
      title: global.actions_json[type+path].title,
      form_action: "/modifyUser"
  });
});

module.exports = router;
