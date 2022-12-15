//  1.新建类，参数为函数，函数参数为resolve，reject

//  2.新建方法resolve，reject

//  3.创建状态及保存状态的属性

//  4.注意this指向

//  5.添加then（参数，处理参数）

//  6.then返回一个新的promise，将状态为pending存入下一个处理的数组中

//  7.对onFulfilled函数和onRjected函数进行try  catch错误处理，错误的话将状态设为reject，正确的话使用resolvePromise设置promise2状态

//  8.resolvePromise判断几种条件（promise2和x相等，x为promsie的实力，x是其他类型的promise，x是其他）

class A {
    constructor(fun) {
        this.fun = fun
    }
}

const a = new A(2)
console.log(a)