const fs = require('fs');
const co = require('co');
const axios = require('axios')

const asyncLogin = async function(url){
    return await axios({
        method: 'post',
        url: url,
        params:{},
        responseType: 'json'
    });
}

const readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

const gen = async function () {
    const f1 = await readFile('index.txt');
    console.log('f1:',f1.toString())
    const f2 = await readFile('index.txt');


};
gen();
/*var a = gen();
var result = a.next();
console.log('result::',result);
console.log('result2::',result);
result.value.then(function(data){
    console.log('then1:::',data.toString());
    console.log('~~~~');
})
var result2 = a.next();
result2.value.then(function(data){
    console.log('then2:::',data.toString());
    console.log('~~~~');
})
a.next();*/


/*co(gen).then(function(data){
    console.log('then::',data)
    console.log('generator 执行完成');
})*/



/*==================================*/

/*let url = "http://ext-api.info.iii-space.com/api/login_fz"
const asyncLogin = async function(url){
    return await axios({
        method: 'post',
        url: url,
        params:{},
        responseType: 'json'
    });
}
function* gen2(){
    var result = yield asyncLogin(url+"?workcode=068108");
    console.log('result:::',result);
}
var g = gen2();
var result = g.next();
result.value.then(function(data){
    g.next(data.data)
})*/
