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
}
