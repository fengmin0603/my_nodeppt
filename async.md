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
* js认为从硬盘上读取文件是一个异步操作，例如：node的核心模块fs操作文件系统的API，都具有同步和异步两个方法
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
* 有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
* 本质上是个有限状态机，状态机根据一定的条件按照特定的顺序进行转换，且过程不可逆

** 从初始状态到成功：pending->resolve ** <br/>
** 从初始状态到失败：pending->reject **

[slide style="background-image:url('/img/bg2.png')"]

# promise的api {:&.flexbox.vleft}
* promise实例上的方法
    * promise.prototype.then()
    * promise.prototype.catch()
* promise构造函数上的方法
    * promise.all(Array) 返回一个promise，等待参数中所有的promise都处于resolve状态后会触发返回的promise实例的resolve状态
    * promise.race(Array) 返回一个promise，参数中第一个执行完成的状态决定出发哪个函数
    * promise.resolve() 立刻返回一个resolve状态的实例
    * promise.reject() 立刻返回一个reject状态的实例

**
 promise并不是处理异步最好的方法，比如回调金字塔的问题并没有解决，只是看起来更清晰了。解决异步最好的方法是async
**

[slide style="background-image:url('/img/bg2.png')"]

# async函数 {:&.flexbox.vleft}

* ES2017 标准引入了 async，使得异步操作变得更加方便
* Generator 函数的语法糖

[slide style="background-image:url('/img/bg2.png')"]
## 生成器
* Generator 函数是 ES6 提供的一种异步编程解决方案
* 是一个状态机，封装了多个内部状态
* 两个明显特点：一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态
-----
```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

[slide style="background-image:url('/img/bg2.png')" data-transition="horizontal3d"]
## 谢谢大家～_～
更多详情，请看阮一峰老师博客：http://es6.ruanyifeng.com/#docs/async