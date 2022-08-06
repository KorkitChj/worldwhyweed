require('rootpath')();

var expess = require('express'),
    app = expess(),
    port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');
// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));



var system = require('./router/system');
var front = require('./router/fontend');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const apiVersion = "/api/v1/";

app.use('/',front);
app.use('/backend/',system);
app.use(`${apiVersion}accounts`, require('./controller/accounts.controller'));
app.use(`${apiVersion}products`, require('./controller/products.controller'));
app.use(`${apiVersion}member`, require('./controller/member.controller'));


// global error handler
app.use(errorHandler);
app.use(function (req,res){
    res.status(404).send({url:req.originalUrl + 'not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
