## 歌曲列表

1）歌单列表的显示
  打开列表默认选中正在播放的歌曲  要根据播放模式来匹配  随机模式比较特殊
  当前正在播放的歌曲在第一个显示 滚动到那个位置
  ```javascript
  // 滚动到正在播放的歌曲位置
  scrollToCurrentIndex(current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id
      })
      // this.$refs.listContent.scrollToElement(this.$refs.list.$el.children[index], 300)
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
  },
  
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return
      }
  
      setTimeout(() => {
        this.scrollToCurrentIndex(newSong)
      }, 20)
    }
  }
  ```
  
  2) 删除歌曲，派发actions 的操作  边界条件的判断

