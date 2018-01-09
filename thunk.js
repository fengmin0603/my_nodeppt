/*求值策略*/
/*
js中的trunk函数指的是将多参数函数替换为单参数的版本，且只接受回调函数作为参数
比如一个多参数函数，经过转换器处理，变成了一个单参数函数，只接收回调函数作为参数，那么这个单参数版本就叫做trunk函数

任何函数，只要有回调函数，都能写成trunk函数的形式

ES6 有了 Generator 函数，Thunk 函数现在可以用于 Generator 函数的自动流程管理。Generator 函数可以自动执行。
*/

function* gen(x){
    try {
        var y = yield x + 2;
    } catch (e){
        console.log(e);
    }
    return y;
}

var g = gen(1);
g.next();
g.throw('出错了');

