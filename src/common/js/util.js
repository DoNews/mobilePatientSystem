export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function throttle(func, wait) {
  let timer = null
  let lastTime
  return function () {
    const context = this
    const args = arguments
    const currentTime = +new Date()

    if (!lastTime) {
      lastTime = currentTime
    }

    clearTimeout(timer)

    if (currentTime - lastTime >= wait) {
      func.apply(context, args)
      lastTime = currentTime
    } else {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

export function urlSearch(href) {
  let name, value
  let str = href // 取得整个地址栏
  let num = str.indexOf('?')
  str = str.substr(num + 1) // 取得所有参数
  let arr = str.split('&') // 各个参数放到数组里
  let json = {}
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf('=')
    if (num > 0) {
      name = arr[i].substring(0, num)
      value = arr[i].substr(num + 1)
      json[name] = value
    }
  }
  return json
}
