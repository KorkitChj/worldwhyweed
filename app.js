require('rootpath')();
require('dotenv').config();


const server = require('express'),
    app = server(),
    port = process.env.NODE_ENV === 'development'
        ? process.env.PortDev
        : process.env.Port;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');
// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));



const system = require('./router/system');
const front = require('./router/fontend');

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
app.use((req,res) =>{ res.status(404).send({url:req.originalUrl + ' not found'}) });

app.listen(port);

console.log('todo list Rest full API server started on: ' + port);

// 'npm start' for production mode
// 'npm run dev' for development mode