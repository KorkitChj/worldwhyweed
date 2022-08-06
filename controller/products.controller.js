const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const productService = require('./product.service');
const accountService = require("./account.service");

router.post('/addproduct',authorize() ,productSchema, addProduct );
router.get('/',authorize() , getAll );
router.get('/:id',authorize() , getById );
router.put('/:id',authorize() ,productSchema, updateProduct );
router.delete('/:id',authorize() , deleteProduct );

module.exports = router;


function productSchema(req, res, next) {
    const schema = Joi.object({
        productName: Joi.string().required(),
        productPrice: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function addProduct(req, res, next) {
    if (req.user.role !== Role.Seller) {
        return res.status(401).json({ message: 'Unauthorized', status: 'error' });
    }

    const {productName,productPrice} = req.body;
    const accountId = req.user.id;
    productService.addProduct({accountId,productName,productPrice})
        .then((data) => {
            res.json({message: data ,status: 'success'});
        })
        .catch(next);
}

function getAll(req,res,next){
    const accountId = req.user.id;
    if (req.user.role !== Role.Seller) {
        return res.status(401).json({ message: 'Unauthorized',status: 'error' });
    }

    productService.getAll(accountId)
        .then(products => res.json({ message: 'success',status: 'success', data: products }))
        .catch(next);
}

function getById(req,res,next){
    const accountId = req.user.id;
    if (req.user.role !== Role.Seller) {
        return res.status(401).json({ message: 'Unauthorized',status: 'error' });
    }
    const productId = req.params.id;
    productService.getById({productId,accountId})
        .then(product => product ? res.json({ message: 'success',status: 'success', data: product }) : res.sendStatus(404))
        .catch(next);
}

function updateProduct(req,res,next){
    const accountId = req.user.id;
    if (req.user.role !== Role.Seller) {
        return res.status(401).json({ message: 'Unauthorized',status: 'error' });
    }
    const productId = req.params.id;
    const params = req.body;
    productService.updateProduct({params,productId,accountId})
        .then(product => product ? res.json({message : product,status: 'success'}) : res.sendStatus(404))
        .catch(next);
}

function deleteProduct(req,res,next){
    const accountId = req.user.id;
    if (req.user.role !== Role.Seller) {
        return res.status(401).json({ message: 'Unauthorized',status: 'error' });
    }
    const productId = req.params.id;
    productService.deleteProduct({productId,accountId})
        .then(() => res.json({ message: 'Product deleted successfully',status: 'success' }))
        .catch(next);

}