<template>
  <div class="container">
    <Music :musicSrc="musicSrc" v-if="musicSrc"/>
    <!-- 鲜花动作 -->
    <img v-if="showFlower" class="doFlower" src="./img/flower.png" alt="">
    <!-- 打扫动作 -->
    <img v-if="showClean" class="cleanImg" src="./img/clean.png" alt="">
    <div class="topCon">
      <p class="title">{{ memoryObj.MemorialName }}</p>
      <p class="desc">
        该纪念堂由{{ memoryObj.NickName }}于{{
          memoryObj.CreateDate
        }}创建，已有{{ memoryObj.viewtotal }}人访问。
      </p>
      <img v-if="IsMyself" class="setIcon" src="./img/jntd_03.png" alt="" @click="toSetting" />
    </div>
    <div class="btmCon">
      <cube-scroll ref="scroll">
        <div v-if="tplObj.IsMuli === 1" class="midImgOne">
          <img class="tplImg" :src="tplObj.TemplateImg" alt="" />
          <img :class="'a' + tplObj.TemplateId" :src="tplObj.avatarOne" alt="" />
          <div :class="'p' + tplObj.TemplateId">{{ tplObj.nameOne }}</div>
          <div v-if="flower">
            <img class="animated fadeIn" :class="'fL' + tplObj.TemplateId" :src="tplObj.flower1" alt="" />
            <img class="animated fadeIn" :class="'fM' + tplObj.TemplateId" :src="tplObj.flower2" alt="" />
            <img class="animated fadeIn" :class="'fR' + tplObj.TemplateId" :src="tplObj.flower3" alt="" />
          </div>
          <div v-if="fruits">
            <img class=" animated fadeIn" :class="'RL' + tplObj.TemplateId" :src="tplObj.fruit1" alt="" />
            <img class=" animated fadeIn" :class="'RR' + tplObj.TemplateId" :src="tplObj.fruit2" alt="" />
          </div>
          <img v-if="censer" class=" animated fadeIn" :class="'s' + tplObj.TemplateId" :src="tplObj.censer" alt="" />
        </div>
        <div v-else class="midImgTwo">
          <img class="tplImg" :src="tplObj.TemplateImg" alt="" />
          <img :class="'aL' + tplObj.TemplateId" :src="tplObj.avatarTwoL" alt="" />
          <img :class="'aR' + tplObj.TemplateId" :src="tplObj.avatarTwoR" alt="" />
          <div :class="'pL' + tplObj.TemplateId">{{ tplObj.nameTwoL }}</div>
          <div :class="'pR' + tplObj.TemplateId">{{ tplObj.nameTwoR }}</div>
          <div v-if="flower">
            <img class="animated fadeIn" :class="'fL' + tplObj.TemplateId" :src="tplObj.flower1" alt="" />
            <img class="animated fadeIn" :class="'fM' + tplObj.TemplateId" :src="tplObj.flower2" alt="" />
            <img class="animated fadeIn" :class="'fR' + tplObj.TemplateId" :src="tplObj.flower3" alt="" />
          </div>
          <div v-if="fruits">
            <img class=" animated fadeIn" :class="'RL' + tplObj.TemplateId" :src="tplObj.fruit1" alt="" />
            <img class=" animated fadeIn" :class="'RR' + tplObj.TemplateId" :src="tplObj.fruit2" alt="" />
          </div>
          <img v-if="censer" class=" animated fadeIn" :class="'s' + tplObj.TemplateId" :src="tplObj.censer" alt="" />
        </div>
        <!-- 点香动作 -->
        <img v-if="showCenser" class="doSenser" src="./img/censer.png" alt="">
        <!-- 鲜果动作 -->
        <img v-if="showFruits" class="doFruits" src="./img/fruits.png" alt="">
        <div class="btnGroup row a-c j-b f-w">
          <div class="item1 row a-c j-c" @click="handleClean">
            <img src="./img/jnt_45.png" alt="" />
            <span>打扫</span>
          </div>
          <div class="item1 row a-c j-c" @click="handleCenser">
            <img src="./img/jnt_39.png" alt="" />
            <span>点香</span>
          </div>
          <div class="item1 row a-c j-c" @click="handleFlower">
            <img src="./img/jnt_42.png" alt="" />
            <span>送花</span>
          </div>
          <div class="item1 row a-c j-c" @click="handleFruits">
            <img src="./img/jnt_48.png" alt="" />
            <span>献果</span>
          </div>
          <div class="item2 row a-c j-c" @click="toGoodMemory">
            美好回忆
          </div>
          <div class="item2 row a-c j-c" @click="toMsgList">
            亲友留言
          </div>
          <div v-if="IsMyself" class="item2 row a-c j-c" @click="toDiaryList">
            追思日记
          </div>
          <div v-else class="item2 row a-c j-c" @click="toMemorialhall">
            我也要创建
          </div>
          <div class="item3 row a-c j-c" @click="toMemoryCard">
            发送给朋友
          </div>
        </div>
      </cube-scroll>
    </div>
    <!-- <audio ref="audio"></audio> -->
  </div>
</template>

<script type="text/ecmascript-6">
import { getHallDetail, getTplData, clickSenser, clickFlowers, clickFruits, clickClean, getSdkData } from 'api/index'
import Music from 'components/Music/Music'
import { config } from 'assets/js/share.js'
var wx = require('weixin-js-sdk');
export default {
  data() {
    return {
      musicSrc: '',
      tplNum: void 0,
      memorialId: '',
      memorialTplId: '',
      tplObj: Object,
      memoryObj: Object,
      showFlower: false,
      showFruits: false,
      showCenser: false,
      showClean: false,
      censer: false,
      flower: false,
      fruits: false,
      MsgPermit: Number,
      IsMyself: Number,
      canClick: false,
      musicStatus: true
    }
  },
  mounted() {
    console.log(this.$route.query.id)
    this._getHallDetail(this.$route.query.id)
    this.doConfig()
  },
  methods: {
    // palySwitch() {
    //   if (this.musicStatus) {
    //     this.musicStatus = false
    //     this.$refs.audio.pause()
    //   }else {
    //     this.musicStatus = true
    //     this.$refs.audio.load()
    //     this.$refs.audio.play()
    //   }
    // },
    // automation() {
    //   console.log('this.musicSrc', this.musicSrc)
    //   this.$refs.audio.src = this.musicSrc
    //   this.$refs.audio.load()
    //   this.$refs.audio.play()
    // },
    toMemorialhall() {
      this.$router.push({
        path: './memorialhall'
      })
    },
    doConfig() {
      getSdkData({
        tempurl: encodeURIComponent(location.href.split('#')[0]),
        memorialId: this.$route.query.id
      }).then(res => {
        // alert(res)
        console.log(res)
        let data = res.data.data
        config(data)
        wx.ready(() => {
          wx.onMenuShareTimeline({
            title: data.shareContent, // 分享标题
            link: data.shareHtmlUrl, // 分享链接
            imgUrl: data.shareImgUrl, // 分享图标
            success: (res) => {
            },
            cancel() {
              // 用户取消分享后执行的回调函数
            }
          })
          wx.onMenuShareAppMessage({
            title: '纪念堂', // 分享标题
            link: data.shareHtmlUrl, // 分享链接
            imgUrl: data.shareImgUrl, // 分享图标
            desc: data.shareContent, // 分享描述
            success: (res) => {
            },
            cancel() {
              // 用户取消分享后执行的回调函数
            }
          })
        })
      })
    },
    handleClean() {
      if (!this.canClick) {
        this.canClick = true
        clickClean({
          memorialId: this.$route.query.id
        }).then(res => {
          // console.log(res)
          this.showClean = true
          setTimeout(() => {
            this.showClean = false
            this.canClick = false
          }, 4000)
        })
      }
    },
    // 点香
    handleCenser() {
      if (!this.censer && !this.canClick) {
        this.showCenser = true
        this.canClick = true
        clickSenser({
          memorialId: this.$route.query.id
        }).then(res => {
          // console.log(res)
          setTimeout(() => {
            this.censer = true
            this.showCenser = false
            this.canClick = false
          }, 4500)
        })
      } else {
        console.log(this.censer)
      }
    },
    // 送花
    handleFlower() {
      if (!this.flower && !this.canClick) {
        this.showFlower = true
        this.canClick = true
        clickFlowers({
          memorialId: this.$route.query.id
        }).then(res => {
          // console.log(res)
          setTimeout(() => {
            this.flower = true
            this.showFlower = false
            this.canClick = false
          }, 3500)
        })
      }
    },
    handleFruits() {
      if (!this.fruits && !this.canClick) {
        this.showFruits = true
        this.canClick = true
        clickFruits({
          memorialId: this.$route.query.id
        }).then(res => {
          console.log(res)
          setTimeout(() => {
            this.fruits = true
            this.showFruits = false
            this.canClick = false
          }, 2500)
        })
      }
    },
    _getTplData(memorialId, memorialTplId) {
      getTplData({
        memorialId,
        memorialTplId
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tplObj = res.data
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
        }
      })
    },
    toMemoryCard() {
      this.$router.push({
        path: './memorialcard',
        query: {
          id: this.$route.query.id
        }
      })
    },
    toGoodMemory() {
      this.$router.push({
        path: './goodmemory',
        query: {
          id: this.$route.query.id
        }
      })
    },
    toMsgList() {
      if (this.MsgPermit !== 1) {
        this.$router.push({
          path: './messagelist',
          query: {
            id: this.$route.query.id
          }
        })
      } else {
        this.$createToast({
          txt: '已关闭留言功能',
          type: 'warn',
          time: 1000
        }).show()
      }
    },
    toDiaryList() {
      this.$router.push({
        path: './diarylist',
        query: {
          id: this.$route.query.id
        }
      })
    },
    toSetting() {
      this.$router.push({
        path: '/setting',
        query: {
          id: this.$route.query.id
        }
      })
    },
    _getHallDetail(memorialId) {
      getHallDetail({
        memorialId
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          let data = res.data
          if (data.IsMyself && data.IsMyself === 1) {
            this.IsMyself = true
          } else {
            this.IsMyself = false
          }
          if (data.flowertotal === 0) {
            this.flower = false
          } else {
            this.flower = true
          }
          if (data.fruittotal === 0) {
            this.fruits = false
          } else {
            this.fruits = true
          }
          if (data.thustotal === 0) {
            this.censer = false
          } else {
            this.censer = true
          }
          this.memoryObj = res.data
          this.MsgPermit = res.data.MsgPermit
          this.musicSrc = res.data.MemorialMusicLink
          this.$nextTick(() => {
            // this.automation();
          })
          this._getTplData(res.data.MemorialId, res.data.MemorialTplId)
        }
      })
    }
  },
  components: {
    Music
  }
}
</script>

<style scoped lang="stylus">
@import 'assets/css/theme.styl'
@keyframes flower
  0%
    opacity 1
    transform scale(2)
    right 0
  50%
    opacity 1
    transform scale(1.5)
    right 260px
  100%
    opacity 0
    transform scale(0)
    right 260px
@keyframes clean
  0%
    transform rotateZ(-30deg)
  25%
    transform rotateZ(30deg)
  50%
    transform rotateZ(-30deg)
  75%
    transform rotateZ(30deg)
  100%
    transform rotateZ(-30deg)
@keyframes fruits
  0%
    opacity 0
    bottom -100px
    transform scale(2)
  50%
    opacity 1
    bottom 0px
    transform scale(2)
  75%
    opacity 1
    bottom 50px
    transform scale(2)
  100%
    opacity 0
    bottom 50px
    transform scale(1.5)
@keyframes censer
  0%
    opacity 0
    bottom -50px
    transform scale(1.5)
  20%
    opacity 1
    bottom 0px
    transform scale(1.5)
  40%
    opacity 1
    transform scale(1.5)
    bottom 50px
  50%
    opacity 1
    transform scale(1.5)
    bottom 0px
  60%
    opacity 1
    transform scale(1.5)
    bottom 50px
  75%
    opacity 1
    transform scale(1.5)
    bottom 0px
  100%
    opacity 0
    transform scale(0, 0)
.container
  position absolute
  top 0px
  width 100%
  height 100%
  background-color #fff
  padding-top 200px
  .doFlower
    position absolute
    width 250px
    bottom 400px
    animation flower 4s linear
    z-index 99
  .cleanImg
    position absolute
    top 400px
    left 380px
    margin-left -70px
    width 140px
    animation clean 4s linear
    z-index 100
  .none
    display none
  .topCon
    position absolute
    top 0
    width 100%
    height 200px
    padding 30px
    // background-color rgb(224, 224, 224)
    .title
      font-size 36px
      color rgb(68, 68, 68)
      width 80%
    .desc
      width 80%
      line-height 40px
      margin-top 10px
      font-size 30px
      color rgb(119, 119, 119)
    .setIcon
      position absolute
      top 80px
      right 30px
      width 50px
  .btmCon
    width 100%
    height 100%
    z-index 50
    .doFruits
      position absolute
      width 250px
      left 50%
      margin-left -125px
      animation fruits 3s linear
      bottom -400px
      z-index 60
    .doSenser
      position absolute
      width 120px
      left 440px
      margin-left -125px
      bottom -200px
      z-index 99
      animation censer 5s linear
      z-index 60
    .midImgOne
      width 100%
      height 665px
      position relative
      .tplImg
        width 100%
        height 665px
        z-index 10
    .midImgTwo
      width 100%
      height 665px
      position relative
      .tplImg
        width 100%
        height 100%
        z-index 10
    .btnGroup
      // position absolute
      width 100%
      height auto
      padding 15px 8px
      font-size 35px
      color #fff
      background-color #ffffff
      z-index 100
      .item1
        width 23.5%
        height 95px
        border-radius 10px
        background-color rgb(36, 67, 122)
        img
          margin-right 10px
        img:nth-child(1)
          width 54px
        img:nth-child(1)
          width 41px
          margin-top -6px
      .item2
        width 32%
        height 95px
        margin 14px 0
        border-radius 10px
        background-color rgb(36, 67, 122)
      .item3
        width 100%
        height 95px
        border-radius 10px
        background-color rgb(36, 67, 122)
</style>
