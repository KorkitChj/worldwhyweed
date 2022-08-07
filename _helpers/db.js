const config = require('config.json');
const mongoose = require('mongoose');
require('dotenv').config();

const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect((process.env.NODE_ENV === 'development'
    ? process.env.ConnectionStringLocal
    : process.env.ConnectionStringOnline), connectionOptions)
    .then(() => { console.log("connect success " )})
    .catch(err => {
        console.log("no connection " + err.message);
    });
mongoose.Promise = global.Promise;

module.exports = {
    Account: require('models/account.model'),
    Bookbank: require('models/account.bookbank.model'),
    Product: require('models/product.model'),
    RefreshToken: require('models/refresh-token.model'),
    isValidId
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}