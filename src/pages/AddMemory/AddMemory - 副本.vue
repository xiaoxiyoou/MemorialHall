<template>
  <div class="container col a-c">
    <div class="imgList" ref="imgList">
      <cube-scroll ref="scroll" :options="options" :data="imgList">
        <!-- <div class="item" v-for="(item, index) in imgList" :key="index">
          <img :src="item" alt="" @load="loadImage">
          <img class="close" @click="deleteItem(index)" src="./close.png" alt="">
        </div> -->
        <ul class="left-waterfall" ref="left">
          <li class="item" v-for="(item,index) in leftItems" :key="index">
            <img :src="item.src" alt="">
            <img class="close" @click="deleteItem(index)" src="./close.png" alt="">
          </li>
        </ul>
        <ul class="right-waterfall" ref="right">
          <li class="item" v-for="(item,index) in rightItems" :key="index">
            <img :src="item.src" alt="">
            <img class="close" @click="deleteItemTwo(index)" src="./close.png" alt="">
          </li>
        </ul>
      </cube-scroll>
    </div>
    <!-- <div class="imgCon row j-c a-c">
      <img class="img" src='./camera.png' alt="" @click="addImage">
    </div> -->
    <img class="add" src="./add.png" alt="" @click="addImage">
    <div class="btm row j-c a-c" @click="_addRecall()">确定</div>
  </div>

</template>
<script type="text/ecmascript-6">
import { getSdkData, recallDetail, postMediaId, addRecall } from 'api/index'
import { config } from 'assets/js/share.js'
var wx = require('weixin-js-sdk')
export default {
  data() {
    return {
      imgListItem: [],
      leftItems: [],
      rightItems: [],
      localIds: [],
      i: 0,
      imgList: [],
      options: {
        probeType: 3,
        click: true
      }
    }
  },
  computed: {

  },
  mounted: function () {
    this._recallDetail()
    this.doConfig()
    this.computedHeight()
    window.addEventListener('resize', () => {
      this.computedHeight()
    })
  },
  methods: {
    computedHeight() {
      let awaitTimer = setTimeout(() => {
        clearTimeout(awaitTimer)
        this.$refs.imgList.style.height = document.documentElement.clientHeight - '60' + 'px'
      }, 10)
    },
    updateWaterfall() {
      const leftHeight = this.$refs.left.clientHeight
      const rightHeight = this.$refs.right.clientHeight
      let item = this.imgList.shift()
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
    },
    deleteItem(index) {
      this.leftItems.splice(index, 1)
      this.imgList = this.leftItems.concat(this.rightItems)
      console.log(' this.imgList', this.imgList)
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
      // this.updateWaterfall()
    },
    deleteItemTwo(index) {
      this.rightItems.splice(index, 1)
      this.imgList = this.leftItems.concat(this.rightItems)
      console.log(' this.imgList', this.imgList)
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
      // this.updateWaterfall()
    },
    loadImage() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    _recallDetail() {
      recallDetail({
        memorialId: this.$route.query.id
      }).then(res => {
        console.log('回忆图片', res)
        if (res.code === 0) {
          // let list = res.data.MemorialImgList
          // list.forEach((item, index) => {
          //   this.imgList.push(item.src)
          // })
          this.imgList = res.data.MemorialImgList
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
          this.updateWaterfall()
          this.imgListItem.forEach((item, index) => {
            this.imgList.push(item.src)
          })
        }
      })
    },
    doConfig() {
      getSdkData({
        tempurl: encodeURIComponent(location.href.split('#')[0])
      }).then(res => {
        console.log('微信授权', res)
        config(res.data.data)
      })
    },
    addImage() {
      wx.ready(() => {
        wx.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            console.log(res)
            this.localIds = res.localIds
            this.length = res.localIds.length
            this.upLoad()
          }
        })
      })
    },
    upLoad() {
      wx.uploadImage({
        localId: this.localIds[this.i],
        success: (res) => {
          this.i++
          this._postMediaId(res.serverId)
          if (this.i < this.length) {
            this.upLoad()
          } else {
            this.$createToast({
              txt: '全部上传成功',
              type: 'correct',
              time: 1000
            }).show()
            this.i = 0
          }
        },
        fail: function (res) {
          alert(JSON.stringify(res))
        }
      })
    },
    // 单张上传
    _postMediaId(id) {
      postMediaId({
        media_id: id
      }).then(res => {
        console.log('图片上传', res)
        var data = res.data
        var list = { 'src': data }
        this.imgList = this.imgList.concat(list)
        this.$refs.scroll.refresh()
        this.updateWaterfall()
      })
    },
    _addRecall() {
      addRecall({
        recallFilepath: this.imgListItem,
        MemorialId: this.$route.query.id
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$router.replace({
            path: './goodmemory',
            query: {
              id: this.$route.query.id
            }
          })
        } else {
          this.$createToast({
            txt: res.msg,
            type: 'correct',
            time: 1000
          }).show()
        }
      })
    }
  },
  components: {
  }
}
</script>

<style scoped lang="stylus">
>>>.cube-scroll-list-wrapper
  // display flex
  // flex-direction row
  // flex-wrap wrap
  // justify-content space-between
  padding 0 30px
.container
  position absolute
  height 100%
  width 100%
  background-color #ffffff
  top 0px
  .imgList
    width 100%
    // height 560px
    height 100%
    .left-waterfall
      float left
      .item
        width 100%
        margin 10px
        img
          height auto
          margin-top 10px
    .right-waterfall
      float right
      .item
        width 100%
        margin 10px
        img
          height auto
          margin-top 10px
    .item
      width 45%
      margin-top 20px
      border-radius 6px
      position relative
      img
        width 300px
        // box-shadow 0 0 10px rgba(0, 0, 0, 0.5)
      .close
        position absolute
        right -2px
        top -20px
        width 36px
  .imgCon
    position absolute
    bottom 170px
    left 50%
    margin-left -345px
    width 690px
    height 372px
    background #f6f6f6
    margin-top 30px
    .img
      height 166px
      width 242px
  .add
    width 100px
    height 100px
    position absolute
    right 30px
    bottom 150px
    z-index 100
  .btm
    position absolute
    left 50%
    margin-left -345px
    bottom 40px
    width 690px
    height 90px
    background #24437a
    border-radius 10px
    color #ffffff
    font-size 35px
</style>
