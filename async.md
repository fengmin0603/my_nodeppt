title: 浅谈async/await
speaker: 冯敏
url: https://github.com/ksky521/nodeppt
transition: slide2
files: /js/demo.js,/css/demo.css

theme: moon
highlightStyle: monokai_sublime
headFiles:
usemathjax:
date: 2018年1月5日

[slide style="background-image:url('/img/bg1.png')" data-transition="horizontal3d"]

# 浅谈async/await
## 分享者：冯敏

[slide style="background-image:url('/img/bg2.png')"]

# 异步 {:&.flexbox.vleft}
同步是发起调用后，主线程只能挂起；异步则是发起调用后，主线程可以做其他的事情
* js认为从硬盘上读取文件是一个异步操作，例如：node的核心模块fs操作文件系统的API，都具有同步和异步两个方法 {:&.fadeIn}
```javascript
fs.readFile('./index.txt','utf8',function(err,data){
    if(err){console.error(err);}
    else{console.log(data);}
});
var data = fs.readFileSync('./index.txt','utf8');
console.log('b');console.log('c');
```
* 另外一种是网络请求
```javascript
var xmlHttp = new XMLHttpRequest();
var url = "http://ext-api.info.iii-space.com/api/login_fz"
xmlHttp.open("post",url+"?workcode=068108",true)
xmlHttp.send();
xmlHttp.onreadystatechange= function(){
};
if(xmlHttp.readyState === 4){
    if(xmlHttp.status === 200){
        var responseText =xmlHttp.responseText;
    }
}
```

[slide style="background-image:url('/img/bg2.png')"]

# promise对象 {:&.flexbox.vleft}
异步编程的一种解决方案
* 有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败） {:&.fadeIn}
* 本质上是个有限状态机，状态机根据一定的条件按照特定的顺序进行转换，且过程不可逆
    * 从初始状态到成功：pending->resolve
    * 从初始状态到失败：pending->reject

[slide style="background-image:url('/img/bg2.png')"]

# promise的api {:&.flexbox.vleft}
* promise实例上的方法 {:&.zoomIn}
    * promise.prototype.then()
    * promise.prototype.catch()
* promise构造函数上的方法
    * promise.all(Array) 返回一个promise，等待参数中所有的promise都处于resolve状态后会触发返回的promise实例的resolve状态
    * promise.race(Array) 返回一个promise，参数中第一个执行完成的状态决定出发哪个函数
    * promise.resolve() 立刻返回一个resolve状态的实例
    * promise.reject() 立刻返回一个reject状态的实例
* promise并不是处理异步最好的方法，比如回调金字塔的问题并没有解决，只是看起来更清晰了。解决异步最好的方法是async


[slide style="background-image:url('/img/bg2.png')"]
# 生成器 {:&.flexbox.vleft}
* Generator 函数是 ES6 提供的一种异步编程解决方案  {:&.zoomIn}
    * 协程coroutine（多个线程互相协作，完成异步任务）
* 是一个状态机，封装了多个内部状态
* 两个明显特点：一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态
```javascript
const gen = function* () {
    yield '大家好';
    yield '第二个next执行才会看到我呀';
    return '第三个next执行，状态结束';
};
var result = gen();
result.next();// { value: '大家好', done: false }
result.next();// { value: '第二个next执行才会看到我呀', done: false }
result.next();// { value: '第三个next执行，状态结束', done: true }
```

[slide style="background-image:url('/img/bg2.png')"]
# 生成器的异步应用 {:&.flexbox.vleft}
* Generator 函数可以暂停执行和恢复执行  {:&.zoomIn}
    * yield表达式
    ```javascript
    let url = "http://ext-api.info.iii-space.com/api/login_fz"
    const asyncLogin = function(url){
        return axios({
            method: 'post',
            url: url,
            params:{},
            responseType: 'json'
        });
    }
    function* gen2(){
        var result = yield asyncLogin(url+"?workcode=068108");
    }
    var g = gen2();
    var result = g.next();
    result.value.then(function(data){
        g.next(data.data)
    })
    ```
* Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段)

[slide style="background-image:url('/img/bg2.png')"]
# Generator 函数的流程管理 {:&.flexbox.vleft}
* 同步操作

```javascript
function* gen() {
  // ...
}

var g = gen();
var res = g.next();

while(!res.done){
  console.log(res.value);
  res = g.next();
}
```
* 上述状态管理是不适合异步的

[slide style="background-image:url('/img/bg2.png')"]
# thunk函数 {:&.flexbox.vleft}
thunk 函数是自动执行 Generator 函数的一种方法。
* 在js中，trunk函数是指，把多参数函数替换成一个只接受回调函数作为参数的单参数函数。  {:&.zoomIn}
<div class="columns-1">
<pre><code class="javascript">
function* gen(){
    var url = _url+"?workcode=068108"
    var result1 = yield asyncLogin(url);
    var result2 = yield readFile('index.txt');
}
</code></pre>
<pre><code class="javascript">
var g = gen();
var r1 = g.next();
r1.value(function (err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    g.next(data);
  });
});
</code></pre>
</div>
* Generator 函数的执行过程，其实是将同一个回调函数，反复传入next方法的value属性。用递归来自动完成这个过程。

[slide style="background-image:url('/img/bg2.png')"  data-transition="zoomin"]

# co 模块 {:&.flexbox.vleft}
* co 模块可以让你不用编写 Generator 函数的执行器。Generator 函数只要传入co函数，就会自动执行。co函数返回一个Promise对象，因此可以用then方法添加回调函数
<div class="columns-1.5">
<pre><code class="javascript">
const gen = function* () {
    const f1 = yield readFile('readme.txt');
    const f2 = yield readFile('index.txt');
};
var a = gen();
var result = a.next();
result.value.then(function(data){
    console.log('then1:::',data.toString());
})
var result2 = a.next();
result2.value.then(function(data){
    console.log('then2:::',data.toString());
})
</code></pre>
<pre><code class="javascript">
co(gen).then(function(data){
    console.log('then::',data)
    console.log('generator 执行完成');
})
</code></pre>
</div>

[slide style="background-image:url('/img/bg2.png')"]

# async函数 {:&.flexbox.vleft}

* ES2017 标准引入了 async，使得异步操作变得更加方便  {:&.zoomIn}
* Generator 函数的语法糖
    * async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await
* async函数对 Generator 函数的改进
    * async函数自带执行器
    * async函数的返回值是 Promise 对象,可以用then方法指定下一步的操作
* async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里
* 错误处理机制
    * await放在try...catch结构里面

[slide style="background-image:url('/img/bg2.png')"]

# await {:&.flexbox.vleft}
正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
* 只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行  {:&.zoomIn}
    * 这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
<div class="columns-1">
<pre><code class="javascript">
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
</code></pre>
<pre><code class="javascript">
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}
f()
.then(v => console.log(v))
// hello world
</code></pre>
</div>

[slide style="background-image:url('/img/bg2.png')"]

# await同时触发 {:&.flexbox.vleft}
* 函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句

```javascript
let foo = await getFoo();
let bar = await getBar();
```
> 上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。

```javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```
[slide style="background-image:url('/img/bg1.png')" data-transition="horizontal3d"]
## 谢谢大家～_～
更多详情，请看阮一峰老师博客：http://es6.ruanyifeng.com/#docs/async