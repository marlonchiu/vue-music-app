function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 定义洗牌函数
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {  // 节流延时函数  如果一个函数被反复调用的话会截流，最终只会调用一次
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
