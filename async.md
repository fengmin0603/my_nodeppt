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

* js认为从硬盘上读取文件是一个异步操作
```javascript
例如：node的核心模块fs操作文件系统的API，都具有同步和异步两个方法
异步读取 readFile
同步读取 readFileSync
异步写入 writeFile
同步写入 writeFileSync
```
* 另外一种是网络请求

[slide style="background-image:url('/img/bg2.png')"]

# 首先介绍一下async函数 {:&.flexbox.vleft}

今天的分享可能没有上一期那么具有趣味性，主要是分享一些学习es6的语法糖。所以给大家准备了一些糖果，下面请大家边吃糖边和我一起回顾这些语法糖吧，😊 {:&.flexbox.vleft}
* ES2017 标准引入了 async，使得异步操作变得更加方便
* Generator 函数的语法糖

* 更多详情，请看阮一峰老师博客：http://es6.ruanyifeng.com/#docs/async

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

[slide style="background-image:url('/img/bg2.png')"]
## 谢谢大家～_～
