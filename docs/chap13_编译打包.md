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
2) 组件异步加载
3) `assetsPublicPath: '/',`  线上环境设置cdn

4) vuejs 升级到最新版本
```markdown
2019.8.18 号版本
 vuejs 2.6.10
 vue-router 3.1.2
 vuex 3.1.1
 
 vue-template-compiler  要与vue版本号一致
 
 所以要修改以上四个  package.json
```
