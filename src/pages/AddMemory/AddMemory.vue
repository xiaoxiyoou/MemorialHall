<template>
  <div class="container col a-c">
    <div class="imgList" ref="imgList">
      <cube-scroll ref="scroll" :options="options" :data="imgList">
        <div class="item" v-for="(item, index) in imgList" :key="index">
          <img class="titleImg" :src="item" alt="" @load="loadImage">
          <img class="close" @click="deleteItem(index)" src="./close.png" alt="">
        </div>
        <img class="tip" v-if="showTip" src="./tip.png" alt="">
        <div class="bar"></div>
      </cube-scroll>
    </div>
    <!-- <div class="imgCon row j-c a-c">
      <img class="img" src='./camera.png' alt="" @click="addImage">
    </div> -->
    <div class="imgCon row j-c a-c" @click="addImage()">上传</div>
    <div class="barTwo"></div>
    <div class="btm row j-c a-c" @click="_addRecall()">保存</div>
    <div class="barThere"></div>
  </div>

</template>
<script type="text/ecmascript-6">
import { getSdkData, recallDetail, postMediaId, addRecall } from 'api/index'
import { config } from 'assets/js/share.js'
var wx = require('weixin-js-sdk')
export default {
  data() {
    return {
      showTip:false,
      localIds: [],
      i: 0,
      imgList: [],
      options: {
        probeType: 3,
        click: true
      }
    }
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
        this.$refs.imgList.style.height = document.documentElement.clientHeight - '198px'
      }, 10)
    },
    deleteItem(index) {
      this.imgList.splice(index, 1)
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
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
        console.log(res)
        if (res.code === 0) {
          let list = res.data.MemorialImgList
          list.forEach((item, index) => {
            this.imgList.push(item.src)
          })
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
        }else{
           this.showTip = true
        }
      })
    },
    doConfig() {
      getSdkData({
        tempurl: encodeURIComponent(location.href.split('#')[0])
      }).then(res => {
        console.log(res)
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
            this.showTip = false
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
        // alert(this.imgList.length)
        this.imgList = this.imgList.concat(res.data)
        // alert(this.imgList.length)
        this.$refs.scroll.refresh()
      })
    },
    _addRecall() {
      addRecall({
        recallFilepath: this.imgList,
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
  display flex
  flex-direction row
  flex-wrap wrap
  justify-content space-between
  padding 0 30px
.container
  position absolute
  height 100%
  width 100%
  background-color #ffffff
  top 0px
  .imgList
    width 100%
    height 100%
    .item
      width 45%
      margin-top 20px
      border-radius 6px
      position relative
      .titleImg
        width 100%
        height 300px
        border-radius 10px
        // box-shadow 0 0 10px rgba(0, 0, 0, 0.5)
      .close
        position absolute
        right -20px
        top -20px
        width 36px
    .bar
        width 100%
        height 400px
    .tip
      width 85%
      height 100%
      display block
      margin auto
  .imgCon
    position absolute
    bottom 150px
    left 50%
    margin-left -345px
    width 690px
    height 90px
    background #24437a
    margin-top 30px
    border-radius 10px
    color #ffffff
    font-size 35px
    z-index 100
    .img
      height 166px
      width 242px
  .barTwo
    width 100%
    height 20px
    bottom 130px 
    background #ffffff
    position absolute
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
    z-index 100
  .barThere
    width 100%
    height 40px
    bottom 0px 
    background #ffffff
    position absolute
    z-index 100
</style>
