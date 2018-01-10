

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
