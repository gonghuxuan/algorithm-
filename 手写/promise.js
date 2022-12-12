//  1.新建类，参数为函数，函数参数为resolve，reject

//  2.新建方法resolve，reject

//  3.创建状态及保存状态的属性

//  4.注意this指向

//  5.添加then（参数，处理参数）

class A {
    constructor(fun) {
        this.fun = fun
    }
}

const a = new A(2)
console.log(a)