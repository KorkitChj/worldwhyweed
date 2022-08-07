const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dateNow = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    title: { type: String, required: false },
    userName: { type: String, required: false },
    fullName: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    birthDate: { type: Date, required: false },
    profilePath: { type: String, required: false },
    gender: { type: String, enum: ['male','female','other'] ,default: 'other',  required: false },
    tel: { type: Number, required: false, maxlength: 10 },
    acceptTerms: Boolean,
    role: { type: String, required: true },
    verificationToken: String,
    verified: Date,
    resetToken: {
        token: String,
        expires: Date
    },
    passwordReset: Date,
    created: { type: Date, default: dateNow },
    updated: Date
});

schema.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('Account', schema);