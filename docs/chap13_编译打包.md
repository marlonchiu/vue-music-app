## 编译打包

1）播放器内核bug
  * 快速切换歌曲，歌曲额歌词都在播放
  
  ```javascript
  // player 组件监听currentSong
  clearTimeout(this.timer)
  this.timer = setTimeout(() => {
    this.$refs.audio.play()
    this.getLyric()
  }, 1000)
  
  // 在1s中可能上次的延时还在
  ```
