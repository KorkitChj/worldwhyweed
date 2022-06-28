var expess = require('express'),
    app = expess(),
    port = process.env.PORT || 3020;





var system = require('./router/system');
var front = require('./router/fontend');



app.use('/',front);
app.use('/backend/',system);
app.use(function (req,res){
    res.status(404).send({url:req.originalUrl + 'not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
