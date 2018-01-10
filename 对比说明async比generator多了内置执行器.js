const fs = require('fs');

const readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

const gen = function* () {
    const f1 = yield readFile('./index.txt');
    const f2 = yield readFile('readme.txt');
    console.log('*f1===',f1);
    console.log('*f2===',f2);
};

const asyncReadFile = async function () {
    const f1 = await readFile('index.txt');
    const f2 = await readFile('readme.txt');
    console.log('async+++',f1.toString());
    console.log('async+++',f2.toString());
};


/*let result = gen();
let next1 = result.next()
let next2 = result.next()
let next3 = result.next()
next2.value.then(function(data){
    console.log(data.toString());
})*/

asyncReadFile().then(function(){
    console.log('执行then方法:::');
})