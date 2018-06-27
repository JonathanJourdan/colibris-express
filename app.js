//https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var url = require('url');


global.schemas = {};

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/colibrisApp', function (err) {
    if (err) {
        throw err;
    } else console.log('Connected to db !!!');
});

// chargement des schémas depuis le fichier de configuration JSON dans une variable
var database_schemas = JSON.parse(fs.readFileSync("database_schema.json", 'utf8'));

// Initialisation de chaque schéma par association entre le schéma et la collection
for (modelName in database_schemas) {
    global.schemas[modelName] = mongoose.model(modelName, database_schemas[modelName].schema,
        database_schemas[modelName].collection);
    console.log("schema chargé !");
}


//Chargement des controleurs
/* Chargement configuration JSON des actions --> controleurs */
global.actions_json = JSON.parse(fs.readFileSync("./routes/config_actions.json", 'utf8'));



var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


//Controleurs
//Routes Managed dynamically
require('./dynamicRouter')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
