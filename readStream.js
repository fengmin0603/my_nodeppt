
// File System
var fs = require('fs');
function afterRead(err,data){
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }

}
/**
 * 1.异步方法需要把回调函数传入
 * 2. 回调函数会在同步方法执行完毕之后才执行异步回调
 * 3.异步方法不能阻塞主线程，不会影响后续代码的执行
 */
console.time('异步方法')
/*fs.readFile('./index.txt','utf8',function(err,data){
    if(err){
        console.error(err);
    }else{
        console.log('读到了数据：：',data);
        console.timeEnd('异步方法')
    }
});*/
console.time('同步方法')
var data = fs.readFileSync('./index.txt','utf8');//同步方法
console.log(data);
console.timeEnd('同步方法')

// console.time('其他同步代码')
console.log('b');
console.log('c');
// console.timeEnd('其他同步代码')