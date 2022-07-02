require('rootpath')();

var expess = require('express'),
    app = expess(),
    port = process.env.PORT || 3020;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');



var system = require('./router/system');
var front = require('./router/fontend');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

app.use('/',front);
app.use('/backend/',system);
app.use('/accounts', require('./controller/accounts.controller'));


// global error handler
app.use(errorHandler);
app.use(function (req,res){
    res.status(404).send({url:req.originalUrl + 'not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
