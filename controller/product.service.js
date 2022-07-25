const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
//const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const {Account, Product} = require("../_helpers/db");
const accountService = require("./account.service");

module.exports = {
    addProduct,
    getAll,
    getById,
    updateProduct,
    deleteProduct
};

async function addProduct({accountId,productName,productPrice}){
    if (await db.Product.findOne({ productName: productName })) {
        throw 'Product Name already to use';
    }

    const product = new Product({
        productName:productName,
        productPrice: productPrice,
        account: accountId
    });
    await product.save();

    return 'success';

}

async function getAll(accountId){
    return db.Product.find({account : accountId});
}

async function getById({productId,accountId}) {
    return await getProduct(productId,accountId);
}

async function getProduct(productId,accountId) {
    if (!db.isValidId(productId)) throw 'Product not found';
    const product = await db.Product.findOne({_id: productId,account: accountId});
    if (!product) throw 'Product not found';
    return product;
}

async function updateProduct({params, productId,accountId}){
    const product = await getProduct(productId,accountId);
    Object.assign(product, params);
    product.updated = Date.now();
    await product.save();
    return 'success';
}

async function deleteProduct({productId,accountId}) {
    const product = await getProduct(productId,accountId);
    await product.remove();
}