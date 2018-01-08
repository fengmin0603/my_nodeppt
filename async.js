const fs = require('fs');


const readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            console.log('data:',data.toString());
            if (error) return reject(error);
            resolve(data);
        });
    });
};

const gen = function* () {
    // const f1 = yield readFile('readme.txt');
    const f2 = yield readFile('index.txt');
    // console.log(f1.toString());
    console.log('f2:',f2);
};

const a = gen()
a.next();
a.next();