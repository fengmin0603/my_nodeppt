DOM规范是运行在浏览器上的规范，比如navigator,只在dom上有，在node上没有；而ECMAScript规范，不仅在浏览器中可以使用，也可以在node.js中使用。


大家好，首先谢谢大家百忙之中来听我的分享。
今天分享的主题是关于前端对异步的一些处理。
今天的分享没有文博上期的three.js那么具有趣味性，主要是分享一些学习es6的语法糖。

之所以想做这个分享呢，是因为，在项目中，前后端分离的基础就是异步。js一直在完善对异步的一些处理方式，我也非常喜欢跟随着前端大牛的脚步，让自己的异步代码处理的越来越优雅。相信很多小伙伴已经尝试过es6新语法了，在后面的分享中，有理解有出入的地方，还请大家积极的反馈出来。大家一起学习。

首先，咱们先回想一下异步的一些特点：
大家都知道，js是单线程的，如果没有回调和异步，可以说是没办法投入使用的。从硬盘上读取文件是比较耗时的，所以js认为文件处理也是一个异步的过程，nodejs封装的fs模块，读文件和写文件都各有一个同步方法和一个异步方法。给大家演示一下读文件的两种方法（readStream.js），还有一种异步处理就是大家常用的网络请求了。

所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。

比如，有一个任务是读取文件进行处理，任务的第一段是向操作系统发出请求，要求读取文件。然后，程序执行其他任务，等到操作系统返回文件，再接着执行任务的第二段（处理文件）。这种不连续的执行，就叫做异步。然后这里会有个概念叫协程，协程coroutine（多个线程互相协作，完成异步任务）
相应地，连续的执行就叫做同步。由于是连续执行，不能插入其他任务，所以选择同步从操作系统从硬盘读取文件的这段时间，程序只能干等着。


传统的JavaScript 语言对异步编程的实现，就是回调函数。所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。
记得有人说过，异步编程的语法目标，就是思考怎样让它用起来更像同步编程，那么怎么让自己的异步代码更加优雅呢，这就是咱们今天分享的es7的新语法async/await的使用了。

async的返回值就是一个promise对象，首先大家先回想一下promise，这个构造函数是es2015纳入标准的。
promise本质上是一个有限状态机，状态机指的是根据特定的条件按照一定的顺序进行转换，而且过程不可逆，promise有三种状态，当被new出来的时候属于pending状态，使用resolve则是fulfill状态，使用reject则是fail状态。在状态机中，需要某些条件才能将自己的状态触发。promise状态的切换只有两种：从初始状态到成功：pending->fulfill;从初始状态到失败：pending->fail。promise原型上的then或catch方法的执行触发promise实例状态机状态的变化。
下面给大家列举了promise的常用的api
然后看个小demo(promise.js)
这里我用定时器模拟了几个异步的过程，让大家可以直观的查看promise api的几种方法


然后，async函数其实是generator函数的语法糖，generator函数翻译过来就是生成器，其实也是一个状态机，可以有多种状态。
和普通函数相比有两个明显的特点，一个是关键词function和函数名之间有个*号，另外一个是函数体内部用yield表达式来定义不同的状态。ppt上有个小demo，大家可以先读一下。这个gen函数执行后，第一次调用，Generator 函数开始执行，直到遇到第一个yield表达式为止，返回的是一个遍历器对象（iterator）,有关遍历器的具体语法，我们就先不说了，这里我们只需要使用遍历器的next方法，使指针移动到下一个状态。这里逐步给大家运行代码看下效果。

然后为什么说Generator 函数是 ES6 提供的一种异步编程解决方案呢，就是因为yield表达式可以暂停执行函数体，也就是咱们前面提到的协程在es上的一种实现。

然后在阮一峰老师的博客上看到说Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。
有一部分代码可能还是没理解的太透彻，这里就先说下我get到的一些点。
对于生成器内部的同步的yield表达式，我们可以用while循环，只要判断返回状态对象的done不为true就继续执行next方法，这样就可以把整个生成器执行完。但是这种方法不适用于异步的yield表达式，因为等到上一个异步方法执行完成后再执行下一个yield表达式，无疑是浪费时间的，所以当用生成器处理多个异步时，执行到yield表达式交出执行权后，还应立刻将执行权再交回来。


async函数返回一个 Promise 对象，可以使用then方法添加回调函数。函数前面的async关键字，表明该函数内部有异步操作。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句,










async相当于是generator+promise+co，是es7的新语法，目前没有浏览器实现，所以需要用webpack+babel编译一下才可以运行。既然是Generator 函数的语法糖，所以我们先来回顾一下generator的语法吧。

Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行,
必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。
                                                                                                                         整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。


