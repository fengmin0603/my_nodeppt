/*求值策略*/
/*
js中的trunk函数指的是将多参数函数替换为单参数的版本，且只接受回调函数作为参数
比如一个多参数函数，经过转换器处理，变成了一个单参数函数，只接收回调函数作为参数，那么这个单参数版本就叫做trunk函数

任何函数，只要有回调函数，都能写成trunk函数的形式

ES6 有了 Generator 函数，Thunk 函数现在可以用于 Generator 函数的自动流程管理。Generator 函数可以自动执行。
*/

const fs = require('fs');
const co = require('co');
const axios = require('axios')


const readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    });
};
let url = "http://ext-api.info.iii-space.com/api/login_fz"
const asyncLogin = async function(url){
    return await axios({
        method: 'post',
        url: url,
        params:{},
        responseType: 'json'
    });
}
function* gen2(){
    var result1 = yield asyncLogin(url+"?workcode=068108");
    var result2 = yield readFile('index.txt');
    console.log('result1:::',result1);
    console.log('result2:::',result2);
}

