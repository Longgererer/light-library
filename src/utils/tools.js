/**
 * 该函数集包含常用的工具函数
 */

/**
 * 判断对象是否为空对象
 * @param object obj
 */
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0
}
/**
 * 防抖函数
 * 多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行
 * 对处理函数进行延时操作，若设定的延时到来之前，再次触发事件，则清除上一次的延时操作定时器，重新定时
 * @param function func
 * @param number delay
 */
function debounce(func, delay) {
  let timer = null
  return function(...params) {
    let self = this
    timer && clearTimeout(timer)
    timer = setTimeout(function() {
      func.apply(self, params)
    }, delay)
  }
}
/**
 * 节流函数
 * 触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用
 * 对处理函数进行延时操作，通过设定时间片，控制事件函数间断性的触发
 * @param function func
 * @param number delay
 */
function throttle(func, delay) {
  let start = 0
  return (...params) => {
    let now = new Date().getTime()
    let self = this
    if (now > start + delay) {
      func.apply(self, params)
      start = nowF
    }
  }
}
export { isObjectEmpty, debounce, throttle }
