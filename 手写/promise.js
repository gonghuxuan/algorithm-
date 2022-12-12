//  1.新建类，参数为函数，函数参数为resolve，reject

//  2.新建方法resolve，reject

//  3.创建状态及保存状态的属性

//  4.注意this指向

//  5.添加then（参数，处理参数）

//  6.then内部onFulfilled和onRejected函数，注意必须为函数才处理

//  7.then内部状态为pending时，存储onFulfilled和onRejected函数应该为异步，加上setTimeout

class A {
  constructor(fun) {
    this.fun = fun;
  }
}

const a = new A(2);
console.log(a);
