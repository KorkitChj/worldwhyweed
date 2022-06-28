var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/WorldWhyWeed";
var url1 = "mongodb://0.0.0.0:27017/";

module.exports = {
    FinddataAll:function (sort,collec,callback){
        var results;
        MongoClient.connect(url1, function(err, db) {
            if(sort != null && sort != "") {
                var odb = db.db("WorldWhyWeed").collection(collec).find().sort(sort).toArray(function (error, result) {
                    if (err) throw err;
                    results = result;
                    db.close();
                    return callback(results)
                })
            }else{
                var odb = db.db("WorldWhyWeed").collection(collec).find({}).toArray(function (error, result) {
                    if (err) throw err;
                    results = result;
                    db.close();
                    return callback(results)
                })
            }
        });
    },
    FindDatas:function (where,collec,callback){
        var results;
        MongoClient.connect(url1, function(err, db) {
            var odb = db.db("WorldWhyWeed").collection(collec).find(where).toArray(function (error, result){
                if(err) throw err;
                results = result;
                db.close();
                return callback(results)
            })

        });
    },
    checkconnect:function (callback){
        var message;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            message = "Connect..";
            db.close();
            return callback(message);
        });
    },
    InserTodata:function (data,collec,callback){
        var results;
        MongoClient.connect(url1, function(err, db) {

            if(err) throw err;

            var dbo = db.db('WorldWhyWeed').collection(collec).insertOne(data,function (err, result){
                if(err) throw err;

                results = "Add 1 Data";
                db.close();
                console.log(results);
                return callback(results);

            })
        });
    },
    deletedata:function (data,collec,callback){
        var results;
        MongoClient.connect(url1, function(err, db) {

            if(err) throw err;

            var dbo = db.db('WorldWhyWeed').collection(collec).deleteOne(data,function (err, result){
                if(err) throw err;

                results = "delete Data";
                db.close();
                console.log(results);
                return callback(results);

            })
        });
    },
    deletedataall:function (data,collec,callback){
        var results;
        MongoClient.connect(url1, function(err, db) {

            if(err) throw err;

            var dbo = db.db('WorldWhyWeed').collection(collec).deleteMany(data,function (err, result){
                if(err) throw err;

                results = "delete Data";
                db.close();
                console.log(results);
                return callback(results);

            })
        });
    },
    updatedata:function (dataold,datanew,collec,callback){
        var results;
        MongoClient.connect(url1, function(err, db) {

            if(err) throw err;

            var dbo = db.db('WorldWhyWeed').collection(collec).updateOne(dataold,datanew,function (err, result){
                if(err) throw err;

                results = "update Data";
                db.close();
                console.log(results);
                return callback(results);

            })
        });
    },
    updatedataall:function (dataold,datanew,collec,callback){
        var results;
        MongoClient.connect(url1, function(err, db) {

            if(err) throw err;

            var dbo = db.db('WorldWhyWeed').collection(collec).updateMany(dataold,datanew,function (err, result){
                if(err) throw err;

                results = "update Data";
                db.close();
                console.log(results);
                return callback(results);

            })
        });
    },
}

