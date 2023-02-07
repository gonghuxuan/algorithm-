//  construtor

const { reject } = require("./promise-answer")

//  resolve

//  reject

//  relovePromise

//  9.1  resolve

//  9.2  reject

//  9.3  finally

//  9.4  catch

//  9.5  all

//  9.6  allsetled

//  9.7  any

//  9.8  rece


class myPromise {
  //  定义状态
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  static PENDING = 'pending'

  //  构造函数
  constructor(func) {
    //  初始化四个变量
    this.promiseState = myPromise.PENDING
    this.promiseResult = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    try{
      func(resove.bind(this), reject.bind(this))
    } catch(error) {
      reject(error)
    }
  }

  // resolve
  resolve(result) {
    if(this.promiseState === myPromise.PENDING) {
      this.promiseState = myPromise.FULFILLED
      this.promiseResult = result
      this.onFulfilledCallbacks.forEach((callback) => {
        callback(result)
      })
    }
  }

  //  reject
  reject(error) {
    if(this.promiseState === myPromise.PENDING) {
      this.promiseState = myPromise.REJECTED
      this.promiseResult = error
      this.onRejectedCallbacks.forEach(callback => {
        callback(error)
      })
    }
  }

  resolvePromise(promise, x, resolve, reject) {
    if(promise === x) {
      throw Error('should not same')
    }
    if(x instanceof promise) {
      x.then((result => {
        this.resolvePromise(promise, result, resolve, reject)
      }))
    } else if(x !== null && (typeof x === 'object' || typeof x === 'function' )) {
      try{
        let then = x.then
     } catch(error) {
      reject(error)
     }
     if(typeof then === 'function') {
      try{
      let called = false
        then.call(this, result => {
          if(called) return
          called = true
          this.resolvePromise(promise, result, resolve, reject)
        }),
        error => {
          if(called) return
          called = true
          reject(error)
        }
      }catch(error) {

      }
     } else {
      resolve(x)
     }
    } else {
      return resolve(x)
    }
  }

  static resolve(value) {
    if(value instanceof myPromise) {
      return value
    } else {
      return new myPromise((this.resolve, reject) => {
        
      }) 
    }
    
  }
}
