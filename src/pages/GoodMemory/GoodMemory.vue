<template>
  <div class="container">
    <div class="imgList" ref="imgList">
      <cube-scroll ref="scroll" :data="leftItems" :options="options">
        <ul class="left-waterfall" ref="left">
          <li class="item" v-for="(item,index) in leftItems" :key="index">
            <img :src="item.src" alt="">
          </li>
        </ul>
        <ul class="right-waterfall" ref="right">
          <li class="item" v-for="(item,index) in rightItems" :key="index">
            <img :src="item.src" alt="">
          </li>
        </ul>
        <img class="tip" v-if="showTip" src="./tip.png" alt="">
        <div class="bar"></div>
      </cube-scroll>
    </div>
    <div class="btm row j-c a-c" @click="toAddMemory">添加美好回忆</div>
  </div>
</template>
<script type="text/ecmascript-6">
import { recallDetail } from 'api/index'
export default {
  data() {
    return {
      leftItems: [],
      rightItems: [],
      showTip:false,
      imgsArr: [],
      options: {
        probeType: 3,
        click: true,
        mouseWheel: true,
        disableMouse: false,
        disableTouch: false
      }
    }
  },
  mounted() {
    this._recallDetail()
    this.computedHeight()
    window.addEventListener('resize', () => {
      this.computedHeight()
    })
    setTimeout(() => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }, 1000)
  },
  methods: {
    updateWaterfall() {
      const leftHeight = this.$refs.left.clientHeight
      const rightHeight = this.$refs.right.clientHeight
      let item = this.imgsArr.shift()
      console.log(leftHeight)
      console.log(rightHeight)
      console.log(item)

      if (item == null) {
        return
      }
      if (leftHeight <= rightHeight) {
        this.leftItems.push(item)
      } else {
        this.rightItems.push(item)
      }
      this.$nextTick(function () {
        this.updateWaterfall()
      })
      console.log(this.leftItems)
      console.log(this.rightItems)
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    computedHeight() {
      let awaitTimer = setTimeout(() => {
        clearTimeout(awaitTimer)
        this.$refs.imgList.style.height = document.documentElement.clientHeight - '60' + 'px'
      }, 10)
    },
    _recallDetail() {
      recallDetail({
        memorialId: this.$route.query.id
      }).then(res => {
        console.log('美好回忆图片', res)
        if (res.code === 0) {
          this.imgsArr = res.data.MemorialImgList
          // this.$nextTick(() => {
          //   this.$refs.scroll.refresh()
          // })
          this.updateWaterfall()
        }else{
          this.showTip = true
        }
      })
    },
    toAddMemory() {
      this.$router.push({
        path: './addmemory',
        query: {
          id: this.$route.query.id
        }
      })
    }
  },
  components: {
  }
}
</script>

<style scoped lang='stylus'>
>>>.cube-scroll-list-wrapper
  min-height 800px !important
>>>.vue-waterfall-easy-container
  position fixed !important
>>>#app .loading
  z-index -99 !important
.container
  position absolute
  top 0px
  left 0
  height 100%
  width 100%
  padding 0 30px
  padding-bottom 100px
  background-color #ffffff
  box-sizing border-box
  .imgList
    width 100%
    height 100%
    box-sizing border-box
    .left-waterfall
      float left
      .item
        width 100%
        img
          height auto
          margin-top 10px
    .right-waterfall
      float right
      .item
        width 100%
        img
          height auto
          margin-top 10px
    img
      width 320px
      border-radius 10px
    .bar
      height 100px
      width 100%
      float left
    .tip
      width 85%
      height 100%
      display block
      margin auto
  .btm
    position absolute
    left 50%
    bottom 40px
    transform translate(-50%, 0)
    width 690px
    height 90px
    background #24437a
    border-radius 10px
    color #ffffff
    font-size 35px
    z-index 100
</style>
