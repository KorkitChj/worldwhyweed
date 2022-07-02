const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions)
    .then(() => { console.log("connect success " )})
    .catch(err => {
        console.log("no connection " + err.message);
    });
mongoose.Promise = global.Promise;

module.exports = {
    Account: require('models/account.model'),
    RefreshToken: require('models/refresh-token.model'),
    isValidId
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}