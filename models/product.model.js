const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    account: { type: Schema.Types.ObjectId, ref: 'Account'},
    productName: { type: String, required: true },
    productPrice: { type: String, required: true },
    isActive: { type: String, required: false },
    isDelete: { type: String, required: false },
    created: { type: Date, default: Date.now },
    updated: Date
});

schema.set('toJSON',{virtuals : false});

module.exports = mongoose.model('Product', schema);