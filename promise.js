let url = "http://ext-api.info.iii-space.com/api/login_fz"
let ajaxPromise = () => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('post', url + "?workcode=068108", true);
        xhr.send(null);
        xhr.onReadyStatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.responseText)
                }
            }
        }
    })
}

ajaxPromise()
    .then(function (value) {
        console.log(value);
    })
    .catch(function (err) {
        console.error(err)
    })

console.time('all')
console.time('race')
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(resolve,1000,'success1')
})
let promise2 = new Promise((resolve,reject)=>{
    window.setTimeout(resolve,1000,'success12')
})
let promise3 = new Promise((resolve,reject)=>{
    window.setTimeout(resolve,5000,'success3')
})


Promise.race([promise1, promise2, promise3]).then((value)=>{
    console.log(value)
    console.timeEnd('race')
}).catch((err)=>{
    console.error(err)
})

Promise.all([promise1, promise2, promise3]).then((value)=>{
    console.log(value)
    console.timeEnd('all')
}).catch((err)=>{
    console.error(err)
})
