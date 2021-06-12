/*
api相关
  - call(fn, obj, ...args)
  - apply(fn, obj, args)
  - bind(fn, obj, ...args)
函数节流与函数防抖
  - 函数节流 throttle(callback, wait)
  - 函数防抖 debounce(callback, wait)
*/

/* 
自定义函数对象的call方法
  语法: call(fn, obj, ...args)
  功能: 执行fn, 使this为obj, 并将后面的n个参数传给fn(功能等同于函数对象的call方法)
*/
function call(fn, obj, ...args) {
  console.log('call()')

  // 如果obj是undefined/null, this指定为window
  if (obj===undefined || obj===null) {
    // return fn(...args)
    obj = window
  }

  // 给obj添加一个临时方法, 方法指向的函数就是fn
  obj.tempFn = fn
  // 通过obj来调用这个方法 ==> 也就会执行fn函数 ==> 此时fn中的this肯定为obj
  const result = obj.tempFn(...args)
  // 删除obj上的临时方法
  delete obj.tempFn
  // 返回fn执行的结果
  return result
}

/* 
自定义函数对象的apply方法
  语法: apply(fn, obj, args)
  功能: 执行fn, 使this为obj, 并将args数组中的元素传给fn(功能等同于函数对象的apply方法)
*/
function apply(fn, obj, args) {
  console.log('apply()')

  // 如果obj是undefined/null, this指定为window
  if (obj===undefined || obj===null) {
    // return fn(...args)
    obj = window
  }

  // 给obj添加一个临时方法, 方法指向的函数就是fn
  obj.tempFn = fn
  // 通过obj来调用这个方法 ==> 也就会执行fn函数 ==> 此时fn中的this肯定为obj
  const result = obj.tempFn(...args)
  // 删除obj上的临时方法
  delete obj.tempFn
  // 返回fn执行的结果
  return result
}



/* 
自定义函数对象的bind方法
  语法: bind(fn, obj, ...args)
  功能: 给fn绑定this为obj, 并指定参数为后面的n个参数 (功能等同于函数对象的bind方法)
*/
function bind(fn, obj, ...args) {
  console.log('bind()')
  // 返回一个新函数
  return (... args2) => {
    // 通过call调用原函数, 并指定this为obj, 实参为args与args2
    return call(fn, obj, ...args, ...args2)
  }
}


/* 
实现函数节流
- 语法: throttle(callback, wait)
- 功能: 创建一个节流函数，在 wait 毫秒内最多执行 `callback` 一次
*/
function throttle(callback, wait) {
  let start = 0
  // 返回一个事件监听函数(也就是节流函数)
  return function (event) {
    console.log('throttle event')
    // 只有当距离上次处理的时间间隔超过了wait时, 才执行处理事件的函数
    const current = Date.now()
    if ( current - start > wait) {
      callback.call(this, event) // 需要指定this和参数
      start = current
    }
  }
}

/* 
实现函数防抖
- 语法: debounce(callback, wait)
- 功能: 创建一个防抖动函数，该函数会从上一次被调用后，延迟 `wait` 毫秒后调用 `callback`
*/
function debounce (callback, wait) {
  // 用来保存定时器任务的标识id
  let timeoutId = -1 
  // 返回一个事件监听函数(也就是防抖函数)
  return function (event) {
    console.log('debounce event')
    // 清除未执行的定时器任务
    if (timeoutId!==-1) {
      clearTimeout(timeoutId)
    }
    // 启动延迟 await 时间后执行的定时器任务
    timeoutId = setTimeout(() => {
      // 调用 callback 处理事件
      callback.call(this, event)
      // 处理完后重置标识
      timeoutId = -1
    }, wait)
  }
}
