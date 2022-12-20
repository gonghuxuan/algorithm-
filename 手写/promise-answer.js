/**
 * 在 myPromise.js 基础上，根据规范实现了 Promise 的全部方法：
 * - Promise.resolve()
 * - Promise.reject()
 * - Promise.prototype.catch()
 * - Promise.prototype.finally()
 * - Promise.all()
 * - Promise.allSettled()
 * - Promise.any()
 * - Promise.race()
 */
 class myPromise {
    //  1.创建promise，生成初始状态和constructor函数
    //  promise的三种状态，为类的静态状态
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    constructor(func) {
        //  初始状态为pending
        this.PromiseState = myPromise.PENDING;
        //  构造函数的执行结果
        this.PromiseResult = null;
        //  当运行then时，状态为pending，将回调函数存储在数组
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        //  参数为函数，并将函数的函数参数绑定为promise执行，并对promise的参数函数执行报错时进行错误处理，直接状态变为reject
        try {
            func(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }

    //  将状态变为fulfiiled，将结果填充，将回调函数全部执行
    resolve(result) {
        if (this.PromiseState === myPromise.PENDING) {
            this.PromiseState = myPromise.FULFILLED;
            this.PromiseResult = result;
            this.onFulfilledCallbacks.forEach(callback => {
                callback(result)
            })
        }
    }

    //  将状态变为rejected，将结果填充，将回调函数全部执行
    reject(reason) {
        if (this.PromiseState === myPromise.PENDING) {
            this.PromiseState = myPromise.REJECTED;
            this.PromiseResult = reason;
            this.onRejectedCallbacks.forEach(callback => {
                callback(reason)
            })
        }
    }

    /**
     * [注册fulfilled状态/rejected状态对应的回调函数] 
     * @param {function} onFulfilled  fulfilled状态时 执行的函数
     * @param {function} onRejected  rejected状态时 执行的函数 
     * @returns {function} newPromsie  返回一个新的promise对象
     */
    then(onFulfilled, onRejected) {
        //  返回一个新的promise，即为then的链式调用
        let promise2 = new myPromise((resolve, reject) => {
            //  当执行到then时，状态已经为完成改变，为fulfilled，则执行onFuldilled函数，并生成promise的最后状态，进行错误处理
            //  里面的this指最外面的promise
            if (this.PromiseState === myPromise.FULFILLED) {
                setTimeout(() => {
                    try {
                        //  判断参数是否为函数
                        if (typeof onFulfilled !== 'function') {
                            resolve(this.PromiseResult);
                        } else {
                            //  执行回调函数
                            let x = onFulfilled(this.PromiseResult);
                            //  设置返回promise的状态
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            //  当执行到then时，状态已经为完成改变，为rejected，则执行onRejected函数，并生成promise的最后状态，进行错误处理
            } else if (this.PromiseState === myPromise.REJECTED) {
                setTimeout(() => {
                    try {
                        if (typeof onRejected !== 'function') {
                            reject(this.PromiseResult);
                        } else {
                            //  执行回调函数
                            let x = onRejected(this.PromiseResult);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (e) {
                        reject(e)
                    }
                });
                //  如果执行到then的状态为pending（即构造函数内部有异步，例如向后台请求接口），并将相对应的函数填充到回调数组里
            } else if (this.PromiseState === myPromise.PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof onFulfilled !== 'function') {
                                resolve(this.PromiseResult);
                            } else {
                                let x = onFulfilled(this.PromiseResult);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof onRejected !== 'function') {
                                reject(this.PromiseResult);
                            } else {
                                let x = onRejected(this.PromiseResult);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            }
        })
        //  返回promise，形成链式调用
        return promise2
    }

    /**
     * Promise.resolve()
     * @param {[type]} value 要解析为 Promise 对象的值 
     */
    // promsie类的静态resolve函数，把一个值变成promise对象
    static resolve(value) {
        if (value instanceof myPromise) {
            return value;
    //  若是有thenable对象，跟随
        } else if (value instanceof Object && 'then' in value) {
            return new myPromise((resolve, reject) => {
                value.then(resolve, reject);
            })
        }

        return new myPromise((resolve) => {
            resolve(value)
        })
    }

    /**
     * Promise.reject()
     * @param {*} reason 表示Promise被拒绝的原因
     * @returns 
     */
    //  生成拒绝的promise
    static reject(reason) {
        return new myPromise((resolve, reject) => {
            reject(reason);
        })
    }

    /**
     * Promise.prototype.catch()
     * @param {*} onRejected 
     * @returns 
     */
    catch (onRejected) {
        return this.then(undefined, onRejected)
    }

    /**
     * Promise.prototype.finally()
     * @param {*} callBack 无论结果是fulfilled或者是rejected，都会执行的回调函数
     * @returns 
     */
    finally(callBack) {
        return this.then(callBack, callBack)
    }

    /**
     * Promise.all()
     * @param {iterable} promises 一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入
     * @returns 
     */
    //  所有的都完成，或者第一个失败
    static all(promises) {
        return new myPromise((resolve, reject) => {
            // 参数校验
            if (Array.isArray(promises)) {
                let result = []; // 存储结果
                let count = 0; // 计数器

                if (promises.length === 0) {
                    return resolve(promises);
                }

                promises.forEach((item, index) => {
                    myPromise.resolve(item).then(
                        value => {
                            count++;
                            result[index] = value;
                            count === promises.length && resolve(result);
                        },
                        reason => {
                            reject(reason);
                        }
                    )
                })
            } else {
                return reject(new TypeError('Argument is not iterable'))
            }
        })
    }

    /**
     * Promise.allSettled()
     * @param {iterable} promises 一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入
     * @returns 
     */
    //  全部的promise都执行完
    static allSettled(promises) {
        return new myPromise((resolve, reject) => {
            if (Array.isArray(promises)) {
                let result = []; // 存储结果
                let count = 0; // 计数器

                if (promises.length === 0) return resolve(promises);

                promises.forEach((item, index) => {
                    myPromise.resolve(item).then(
                        value => {
                            count++;
                            result[index] = {
                                status: 'fulfilled',
                                value
                            }
                            count === promises.length && resolve(result);
                        },
                        reason => {
                            count++;
                            result[index] = {
                                status: 'rejected',
                                reason
                            }
                            count === promises.length && resolve(result);
                        }
                    )
                })
            } else {
                return reject(new TypeError('Argument is not iterable'))
            }
        })
    }

    /**
     * Promise.any()
     * @param {iterable} promises 一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入
     * @returns 
     */
    //  一个成功或者全部失败
    static any(promises) {
        return new myPromise((resolve, reject) => {
            // 参数校验
            if (Array.isArray(promises)) {
                let errors = []; // 
                let count = 0; // 计数器

                if (promises.length === 0) return reject(new AggregateError([], 'All promises were rejected'));

                promises.forEach(item => {
                    myPromise.resolve(item).then(
                        value => {
                            resolve(value);
                        },
                        reason => {
                            count++;
                            errors.push(reason);
                            count === promises.length && reject(new AggregateError(errors, 'All promises were rejected'));
                        }
                    )
                })
            } else {
                return reject(new TypeError('Argument is not iterable'))
            }
        })
    }

    /**
     * Promise.race()
     * @param {iterable} promises 可迭代对象，类似Array。详见 iterable。
     * @returns 
     */
    static race(promises) {
        return new myPromise((resolve, reject) => {
            if (Array.isArray(promises)) {
                if (promises.length > 0) {
                    promises.forEach(item => {
                        myPromise.resolve(item).then(resolve, reject);
                    })
                }
            } else {
                return reject(new TypeError('Argument is not iterable'))
            }
        })
    }
}

/**
 * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */

//  将promise的状态变为最终形态fulfilled或者rejected
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        throw new TypeError('Chaining cycle detected for promise');
    }

    if (x instanceof myPromise) {
        x.then(y => {
            resolvePromise(promise2, y, resolve, reject)
        }, reject);
    } else if (x !== null && ((typeof x === 'object' || (typeof x === 'function')))) {
        try {
            var then = x.then;
        } catch (e) {
            return reject(e);
        }

        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(
                    x,
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                )
            } catch (e) {
                if (called) return;
                called = true;

                reject(e);
            }
        } else {
            resolve(x);
        }
    } else {
        return resolve(x);
    }
}

myPromise.deferred = function () {
    let result = {};
    result.promise = new myPromise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
}

module.exports = myPromise;