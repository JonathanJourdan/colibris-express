var express = require('express');
var router = express.Router();
var jwt = require('../jwt.js');
/* GET home page. */

router.post('/', function (req, res) {


    var type = req.method;
    var path = req.originalUrl;

    // find the user
    console.log(global.actions_json[type + path].schema);

    global.schemas[global.actions_json[type + path].schema].findOne({
        email: req.body.email
    }, function (err, user) {
        console.log("coucou");
        if (err) throw err;

        if (!user) {
            res.send({
                'success': false,
                'message': 'Authentication failed. User not found.'
            }, {
                'Content-Type': 'application/json'
            }, 400);
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.send({
                    'success': false,
                    'message': 'Authentication failed. Wrong password.'
                }, {
                    'Content-Type': 'application/json'
                }, 400);
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password

                console.log(user);

                var token = jwt.create_token(user);

                res.send({
                    'message': 'token délivré !',
                    'token': token
                },
                { 'Content-Type': 'application/json'}, 200);

            }

        }

    });
});

module.exports = router;