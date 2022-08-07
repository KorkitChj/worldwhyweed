const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dateNow = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });

const schema = new Schema({
    account: { type: Schema.Types.ObjectId, ref: 'Account'},
    cardName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiredDate: { type: String, required: true },
    ccv: { type: Number, required: true },
    isActive: { type: String, enum: [ 'yes','no' ], default: 'no' ,required: false },
    isDelete: { type: String, enum: [ 'yes', 'no'], default: 'no', required: false },
    created: { type: Date, default: dateNow },
    updated: {type: Date, required: false}
});

schema.set('toJSON',{virtuals : false});

module.exports = mongoose.model('Bookbank', schema);