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


var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function() {
    console.log('partials registered');
});


hbs.registerHelper('compare', function(lvalue, rvalue, options) {
    console.log("####### Compare lvalue :",lvalue," et rvalue: ",rvalue);
    if(arguments.length < 3)
        throw new Error("Handlebars Helper 'compare' needs 2 parameters");
    var operator = options.hash.operator || "==";
    var operators = {
        '==': function(l,r) {
            return l == r;
        },
'tabEmpty': function (obj) {
if (!obj || obj.length == 0)
return true;
return false;
}
    }
    if(!operators[operator])
        throw new Error("'compare' doesn't know the operator" + operator);
    var result = operators[operator](lvalue, rvalue);
    if(result){
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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
