var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
    var r1 = yield readFileThunk('index.txt');
    console.log(r1.toString());
    var r2 = yield readFileThunk('readme.txt');
    console.log(r2.toString());
};

var g = gen();

var r1 = g.next();
console.log('r1:::',r1.value);
/*
r1.value(function (err, data) {
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function (err, data) {
        if (err) throw err;
        g.next(data);
    });
});*/
