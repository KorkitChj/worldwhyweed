var express = require('express');
var router = express.Router();

router.get('/', function (req,res,next){
    res.send('aaa')
});
router.get('/user',function (req,res,next){
    res.send('Admin');
})
module.exports = router;