## 搜索页面
1) 数据节流

```javascript
// 搜索的时候进行数据节流

// ./src/base/search-box/search-box.vue

import {debounce} from 'common/js/util'

created() {  // 效果同watch(会有特殊用途)  节流函数
  this.$watch('query', debounce((newQuery) => {
    this.$emit('query', newQuery)
  }, 200))
}

// ./src/common/js/util.js

// 节流延时函数  如果一个函数被反复调用的话会截流，最终只会调用一次
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
```

2) 手机端滚动搜索列表，要关闭搜索框

3) 搜索历史列表

4) 搜素列表的 保存、删除、清空、confirm组件

5) 优化： 搜索列表与播放器的自适应

