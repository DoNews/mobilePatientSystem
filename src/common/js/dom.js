export function hasClass(el, className) {
  // (^|\\s) -> 开头 或者 是前面有空白字符
  // (\\s|$) -> 后面是空白字符 或者 直接结尾
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass(el, cls) {
  if (hasClass(el, cls)) {
    let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    el.className = el.className.replace(reg, ' ')
  }
}
