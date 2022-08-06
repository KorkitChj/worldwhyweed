const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const memberService = require('./member.service');
const accountService = require("./account.service");

router.get('/:id', authorize(Role.User), getById);
router.post('/add/:id', authorize(Role.User), getById);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    const { email, password } = req.body;
    const ipAddress = req.ip;
    accountService.authenticate({ email, password, ipAddress })
        .then(({ refreshToken, ...account }) => {
            setTokenCookie(res, refreshToken);
            res.status(200).json({ data: account, status: 'success' });
        })
        .catch(next);
}

function getById(req,res,next){

}