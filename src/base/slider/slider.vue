<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      threshold: {
        type: Number,
        default: 0.3
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted () {
      setTimeout(() => {
        this._setSliderWidth()

        // 顺序顺序顺序！！！
        // 在初始化slider前初始化dot
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20) // 20ms经验值

      // 监听窗口大小
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    activated() {
      if (this.autoPlay) {
        this._play()
      }
    },

    deactivated() { // 当一个保持活动的组件被停用时调用
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    // destroyed() {
    //   clearTimeout(this.timer)
    // },
    methods: {
      _setSliderWidth (isResize) {
        // 设置slider容器的宽度
        this.children = this.$refs.sliderGroup.children

        let width = 0

        // slider 可见宽度
        let sliderWidth = this.$refs.slider.clientWidth

        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          // 设置每个子元素的样式及高度
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            Threshold: 0.3,
            threshold: this.threshold,
            speed: this.speed
          }
          // snap: true,
          // snapLoop: this.loop,
          // snapThreshold: 0.3,
          // snapSpeed: 400
          // click: true
        })

        this.slider.on('scrollEnd', this._onScrollEnd)
        this.slider.on('touchEnd', () => {
          if (this.autoPlay) {
            this._play()
          }
        })
        // this.slider.on('scrollEnd', () => {
        //   // 第一轮1（第一张图） 2 3 4 0（最后一张图索引为0 因为放在了最前面）  1 2 3 4 0
        //   let pageIndex = this.slider.getCurrentPage().pageX
        //   if (this.loop) {
        //     // 当前索引值
        //     pageIndex -= 1
        //   }
        //   this.currentPageIndex = pageIndex
        //
        //   if (this.autoPlay) {
        //     // clearTimeout(this.timer)
        //     this._play()
        //   }
        // })

        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _initDots () {
        this.dots = new Array(this.children.length)
      },
      _onScrollEnd() {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex // 第一轮1（第一张图） 2 3 4 0（最后一张图索引为0 因为放在了最前面）  1 2 3 4 0
        if (this.autoPlay) {
          this._play()
        }
      },
      _play () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.interval)
      }
      // _play () {
      //   let pageIndex = this.currentPageIndex + 1
      //   console.log('当前页数' + pageIndex)
      //   if (this.loop) {
      //     pageIndex += 1
      //   }
      //   this.timer = setTimeout(() => {
      //     this.slider.goToPage(pageIndex, 0, 400)
      //   }, this.interval)
      // }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"
  .slider
    min-height 1px
    .slider-group
      position relative
      overflow hidden
      white-space nowrap
      .slider-item
        float left
        box-sizing border-box
        overflow hidden
        text-align center
        a
          display block
          width 100%
          overflow hidden
          text-decoration none
        img
          display block
          width 100%
    .dots
      position absolute
      right 0
      left 0
      bottom 12px
      text-align center
      font-size 0
      .dot
        display inline-block
        margin 0 4px
        width 8px
        height 8px
        border-radius 50%
        background $color-text-l
        &.active
          width 20px
          border-radius 5px
          background $color-text-ll
</style>
