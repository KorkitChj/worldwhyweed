var express = require('express');
var dbcon = require('../models/dbcontext')
var router = express.Router();

router.get('/check',function (req,res){

    dbcon.checkconnect(function (message){
        res.send(message);
    })
});
router.get('/insertdata',function (req,res){
    var myobj = { address: "admin"};
    dbcon.InserTodata(myobj,"User",function (results){
        res.send(results)
    })
});

router.get('/getfind',function (req,res){
   var myobj = {role:"1"}
    dbcon.FindDatas(myobj,"role",function (results){
       res.send(results);
    });
});

router.get('/getall',function (req, res){
    dbcon.FinddataAll({address:1},'User',function (results){
       res.send(results);
    });
})

router.get('/delete',function (req,res){
    dbcon.deletedata({address:"Highway 37"},'User',function (results){
       res.send(results);
    });
})

router.get('/deleteall',function (req,res){
    dbcon.deletedataall({address:"Highway 37"},'User',function (results){
        res.send(results);
    });
})

router.get('/update',function (req, res){
    var dataold = {address: "admin"}
    var datanew = {$set:{address:"member"}};
    dbcon.updatedata(dataold,datanew,'User',function (results){
        res.send(results);
    })
})

router.get('/updateall',function (req, res){
    var dataold = {address: /^a/}
    var datanew = {$set:{address:"member"}};
    dbcon.updatedataall(dataold,datanew,'User',function (results){
        res.send(results);
    })
})

router.get('/', function (req,res,next){
    res.send('aaa')
});
router.get('/user',function (req,res,next){
    res.send('Admin');
})
module.exports = router;