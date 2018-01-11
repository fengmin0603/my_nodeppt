const axios = require('axios')

const asyncLogin = async function(url){
    return await axios({
        method: 'post',
        url: url,
        params:{},
        responseType: 'json'
    });
}
let url = "http://ext-api.info.iii-space.com/api/login_fz"
let result = asyncLogin(url+"?workcode=068108")
console.log('result=',result);
result.then(function(data){
    console.log('data:',data);
})

/*async function f() {
    throw new Error('出错了');
}

f().then(
    v => console.log(v),
    e => console.log(e)
)*/

/*async function f() {
    return await Promise.reject('出错了');;
}

f().then(v => console.log(v)).catch(e => console.log(e))*/
