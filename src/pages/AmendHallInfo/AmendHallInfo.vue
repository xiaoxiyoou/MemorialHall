<template>
  <div class="container">
    <div class="crop-con" v-if="showCrop">
      <div class="return" @click="hideCrop">返回</div>
      <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full" :fixed="fixed" :fixed-number="fixedNumber" :can-move="option.canMove" :can-scale="option.canScale" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox" @real-time="realTime" :high="option.high" @img-load="imgLoad" mode="cover"></vue-cropper>
      <div class="bottom-button row j-b">
        <div class="selectImg" @click="uploadImg()">
          <span class="text">选择图片</span>
        </div>
        <button @click="rotateLeft" class="btn">向左旋转</button>
        <button @click="rotateRight" class="btn">向右旋转</button>
        <div class="uploading" @click="finish()">上传头像</div>
      </div>
    </div>
    <cube-scroll ref="scroll">
      <div class="inputList">
        <div class="oneList">
          <div class="item row a-c j-b border-bottom-1px">
            <span class="title">逝者姓名</span>
            <input type="text" placeholder="请输入逝者姓名" v-model="oneName" />
          </div>
          <div class="item row a-c j-b border-bottom-1px">
            <span class="title">出生日期</span>
            <cube-button class="selectTime selected" @click="showStartime(1)">{{ startTimeText1 }}</cube-button>
          </div>
          <div class="item row a-c j-b border-bottom-1px">
            <span class="title">逝世日期</span>
            <cube-button class="selectTime selected" @click="showEndtime(1)">{{ endTimeText1 }}</cube-button>
          </div>
          <div class="item row a-c j-b border-bottom-1px">
            <span class="title">出生地点</span>
            <input type="text" placeholder="请输入出生地点" v-model="addressStart1" />
          </div>
          <div class="item row a-c j-b border-bottom-1px">
            <span class="title">安葬地点</span>
            <input type="text" placeholder="请输入安葬地点" v-model="addressEnd1" />
          </div>
          <div class="item row a-c j-b border-bottom-1px">
            <span class="title">性别</span>
            <div class="sex" @click="showSex(1)">{{sex1Text}}</div>
          </div>
          <div class="avatar row a-c j-b border-bottom-1px">
            <span class="title">遗像</span>
            <div class="right row a-c" @click="showAvatar(1)">
              <img :src='avatarImg1 ? avatarImg1 : require("./cjjnt_10.png")' alt="" />
            </div>
          </div>
        </div>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div class="twoList" v-if="showTwo">
            <div class="item row a-c j-b border-bottom-1px">
              <span class="title">逝者姓名</span>
              <input type="text" placeholder="请输入逝者姓名" v-model="twoName" />
            </div>
            <div class="item row a-c j-b border-bottom-1px">
              <span class="title">出生日期</span>
              <cube-button class="selectTime selected" @click="showStartime(2)">{{ startTimeText2 }}</cube-button>
            </div>
            <div class="item row a-c j-b border-bottom-1px">
              <span class="title">逝世日期</span>
              <cube-button class="selectTime selected" @click="showEndtime(2)">{{ endTimeText2 }}</cube-button>
            </div>
            <div class="item row a-c j-b border-bottom-1px">
              <span class="title">出生地点</span>
              <input type="text" placeholder="请输入出生地点" v-model="addressStart2" />
            </div>
            <div class="item row a-c j-b border-bottom-1px">
              <span class="title">安葬地点</span>
              <input type="text" placeholder="请输入安葬地点" v-model="addressEnd2" />
            </div>
            <div class="item row a-c j-b border-bottom-1px">
              <span class="title">性别</span>
              <div class="sex" @click="showSex(2)">{{sex2Text}}</div>
            </div>
            <div class="avatar row a-c j-b border-bottom-1px">
              <span class="title">遗像</span>
              <div class="right row a-c" @click="showAvatar(2)">
                <img :src='avatarImg2 ? avatarImg2 : require("./cjjnt_10.png")' alt="" />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </cube-scroll>
    <div class="setUp" @click="toSetUp">确定</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getUserInfo, getSdkData, postMediaId, sendAmendInfo } from 'api/index'
import { VueCropper } from 'vue-cropper'
import { config } from 'assets/js/share.js'
var wx = require('weixin-js-sdk')
const column1 = [{ text: '男', value: '1' }, { text: '女', value: '0' }]
export default {
  data() {
    return {
      showTwo: false,
      DieUserId: void 0,
      DieUserId2: void 0,
      tabList: [
        {
          text: '单人',
          value: '1',
          selected: true
        },
        {
          text: '双人',
          value: '2',
          selected: false
        }
      ],
      sex1Text: '请选择性别',
      sex2Text: '请选择性别',
      sexOptions: ['男', '女'],
      num: void 0,
      sexNum: void 0,
      oneName: '',
      twoName: '',
      addressStart1: '',
      addressEnd1: '',
      addressStart2: '',
      addressEnd2: '',
      startTimeText1: '请选择出生日期',
      startTimeText2: '请选择出生日期',
      endTimeText1: '请选择逝世日期',
      endTimeText2: '请选择逝世日期',
      startTime1: '',
      startTime2: '',
      endTime1: '',
      endTime2: '',
      sex1: '',
      sex2: '',
      avatarImg1: '',
      avatarImg2: '',
      // 剪切图片上传
      previews: {},
      option: {
        // img: 'https://qn-qn-kibey-static-cdn.app-echo.com/goodboy-weixin.PNG',
        img: '',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: true,
        original: false,
        canMoveBox: false,
        canScale: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300,
        // autoCropHeight: ,
        centerBox: false,
        high: true
      },
      show: true,
      fixed: true,
      fixedNumber: [1, 1.2],
      fileName: '', // 本机文件地址，
      showCrop: false,
      avatarNum: void 0, // 头像是第几个,
      updateNum: 1
    }
  },
  mounted() {
    this._getUserInfo()
    this.doConfig()
  },
  methods: {
    hideCrop() {
      this.showCrop = !this.showCrop
    },
    doConfig() {
      getSdkData({
        tempurl: encodeURIComponent(location.href.split('#')[0])
      }).then(res => {
        // alert(res)
        console.log(res)
        config(res.data.data)
      })
    },
    _getUserInfo() {
      getUserInfo({
        memorialId: this.$route.query.id
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          let dataList = res.data
          if (dataList.length === 1) {
            let dataInfo = dataList[0]
            this.DieUserId = dataInfo.DieUserId
            this.oneName = dataInfo.DieUserName
            this.startTime1 = dataInfo.DieUserBirthday
            this.startTimeText1 = dataInfo.DieUserBirthdayView
            this.endTime1 = dataInfo.DieUserDate
            this.endTimeText1 = dataInfo.DieUserDateView
            this.addressStart1 = dataInfo.DieUserAddRess
            this.addressEnd1 = dataInfo.DieUserSite
            this.sex1 = dataInfo.DieUserSex
            if (dataInfo.DieUserSex === 1) {
              this.sex1Text = '男'
            } else if (dataInfo.DieUserSex === 0) {
              this.sex1Text = '女'
            } else {
              this.sex1Text = '请选择性别'
            }
            // this.sex1Text = dataInfo.DieUserSex === 1 ? '男' : '女'
            this.avatarImg1 = dataInfo.DieUserImg
          } else if (dataList.length === 2) {
            this.updateNum = 2
            this.showTwo = true
            let dataInfo = dataList[0]
            this.DieUserId = dataInfo.DieUserId
            this.oneName = dataInfo.DieUserName
            this.startTime1 = dataInfo.DieUserBirthday
            this.startTimeText1 = dataInfo.DieUserBirthdayView
            this.endTime1 = dataInfo.DieUserDate
            this.endTimeText1 = dataInfo.DieUserDateView
            this.addressStart1 = dataInfo.DieUserAddRess
            this.addressEnd1 = dataInfo.DieUserSite
            this.sex1 = dataInfo.DieUserSex
            if (dataInfo.DieUserSex === 1) {
              this.sex1Text = '男'
            } else if (dataInfo.DieUserSex === 0) {
              this.sex1Text = '女'
            } else {
              this.sex1Text = '请选择性别'
            }
            // this.sex1Text = dataInfo.DieUserSex === 1 ? '男' : '女'
            this.avatarImg1 = dataInfo.DieUserImg

            let dataInfo2 = dataList[1]
            this.DieUserId2 = dataInfo2.DieUserId
            this.twoName = dataInfo2.DieUserName
            this.startTime2 = dataInfo2.DieUserBirthday
            this.startTimeText2 = dataInfo2.DieUserBirthdayView
            this.endTime2 = dataInfo2.DieUserDate
            this.endTimeText2 = dataInfo2.DieUserDateView
            this.addressStart2 = dataInfo2.DieUserAddRess
            this.addressEnd2 = dataInfo2.DieUserSite
            this.sex2 = dataInfo2.DieUserSex
            if (dataInfo2.DieUserSex === 1) {
              this.sex2Text = '男'
            } else if (dataInfo2.DieUserSex === 0) {
              this.sex2Text = '女'
            } else {
              this.sex2Text = '请选择性别'
            }
            // this.sex2Text = dataInfo2.DieUserSex === 1 ? '男' : '女'
            this.avatarImg2 = dataInfo2.DieUserImg
          }
        }
      })
    },
    showAvatar(num) {
      this.showCrop = !this.showCrop
      this.avatarNum = num
      if (num === 1) {
        this.option.img = this.avatarImg1
      } else {
        this.option.img = this.avatarImg2
      }
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    // 上传图片（点击上传按钮）
    finish() {
      this.$refs.cropper.getCropData((data) => {
        // do something
        console.log('完成,', data)
        if (this.avatarNum === 1) {
          this.avatarImg1 = data
        } else {
          this.avatarImg2 = data
        }
        this.showCrop = false
      })
    },
    //  实时预览函数
    realTime(data) {
      console.log(data);
      this.previews = data;
    },
    upLoad(localId) {
      wx.uploadImage({
        localId,
        success: (res) => {
          // alert(res.serverId)
          this._postMediaId(res.serverId)
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
        this.option.img = res.data[0]
      })
    },
    // 选择本地图片
    uploadImg() {
      wx.ready(() => {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            this.upLoad(res.localIds[0])
          }
        })
      })
    },
    imgLoad(msg) {
      console.log(msg)
    },
    // 提示框
    showToast(txt) {
      let toast = this.$createToast({
        type: 'warn',
        txt,
        time: 1000
      })
      toast.show()
    },
    // 检查信息是否完善并提交
    toSetUp() {
      console.log('this.avatarImg1',this.avatarImg1)
      console.log('this.avatarImg2',this.avatarImg2)
      if (this.updateNum === 1) {
        if (!this.oneName) {
          this.showToast('请输入姓名')
          return false
        } else {
          sendAmendInfo({
            isMuli: 0,
            memorialId: this.$route.query.id,
            DieUserId: this.DieUserId,
            DieUserName: this.oneName,
            DieUserBirthday: this.startTime1,
            DieUserDate: this.endTime1,
            DieUserAddRess: this.addressStart1,
            DieUserSite: this.addressEnd1,
            DieUserSex: this.sex1,
            DieUserImg: this.avatarImg1
          }).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.$router.go(-1)
            }
          })
        }
      } else {
        if (!this.oneName) {
          this.showToast('请输入姓名')
          return false
        } else if (!this.twoName) {
          this.showToast('请输入姓名')
          return false
        } else {
          sendAmendInfo({
            isMuli: 1,
            memorialId: this.$route.query.id,

            DieUserId: this.DieUserId,
            DieUserName: this.oneName,
            DieUserBirthday: this.startTime1,
            DieUserDate: this.endTime1,
            DieUserAddRess: this.addressStart1,
            DieUserSite: this.addressEnd1,
            DieUserSex: this.sex1,
            DieUserImg: this.avatarImg1,

            DieUserId2: this.DieUserId2,
            DieUserName2: this.twoName,
            DieUserBirthday2: this.startTime2,
            DieUserDate2: this.endTime2,
            DieUserAddRess2: this.addressStart2,
            DieUserSite2: this.addressEnd2,
            DieUserSex2: this.sex2,
            DieUserImg2: this.avatarImg2
          }).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.$router.go(-1)
            }
          })
        }
      }
    },
    showSex(sexNum) {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '请选择性别',
          data: [column1],
          onSelect: this.selectSex
        })
      }
      this.picker.show()
      this.sexNum = sexNum
    },
    selectSex(selectedVal, selectedIndex, selectedText) {
      if (this.sexNum === 1) {
        this.sex1 = selectedVal[0]
        this.sex1Text = selectedText[0]
      } else {
        this.sex2 = selectedVal[0]
        this.sex2Text = selectedText[0]
      }
    },
    showStartime(num) {
      if (!this.datePicker1) {
        this.datePicker1 = this.$createDatePicker({
          title: '请选择日期',
          min: new Date(1900, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: this.selectStartTime
        })
      }
      this.datePicker1.show()
      this.num = num
    },
    selectStartTime(date, selectedVal, selectedText) {
      if (this.num === 1) {
        this.startTimeText1 = `${selectedVal[0]}年${selectedVal[1]}月${selectedVal[2]}日`
        this.startTime1 = `${selectedVal[0]}/${selectedVal[1]}/${selectedVal[2]}`
      } else if (this.num === 2) {
        this.startTimeText2 = `${selectedVal[0]}年${selectedVal[1]}月${selectedVal[2]}日`
        this.startTime2 = `${selectedVal[0]}/${selectedVal[1]}/${selectedVal[2]}`
      }
    },
    showEndtime(num) {
      if (!this.datePicker2) {
        this.datePicker2 = this.$createDatePicker({
          title: '请选择日期',
          min: new Date(1900, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: this.selectEndTime
        })
      }
      this.datePicker2.show()
      this.num = num
    },
    selectEndTime(date, selectedVal, selectedText) {
      if (this.num === 1) {
        this.endTimeText1 = `${selectedVal[0]}年${selectedVal[1]}月${selectedVal[2]}日`
        this.endTime1 = `${selectedVal[0]}/${selectedVal[1]}/${selectedVal[2]}`
      } else if (this.num === 2) {
        this.endTimeText2 = `${selectedVal[0]}年${selectedVal[1]}月${selectedVal[2]}日`
        this.endTime2 = `${selectedVal[0]}/${selectedVal[1]}/${selectedVal[2]}`
      }
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style scoped lang="stylus">
>>>.cropper-box
  background-color #333
.container
  position absolute
  top 0px
  width 100%
  height 100%
  padding-bottom 150px
  .inputList
    width 100%
    height 100%
    .oneList, .twoList
      width 100%
      display block
      background-color #ffffff
      .item
        width 100%
        height 90px
        padding 0 30px
        .title
          height 90px
          line-height 90px
          font-size 30px
          color rgb(85, 85, 85)
        input
          height 90px
          // line-height 90px
          font-size 30px
          color rgb(102, 102, 102)
          text-align right
        .selectTime
          width 70%
          text-align right
          background-color #ffffff
          font-size 30px
          color rgb(102, 102, 102)
          padding 0
          margin 0
        .sex
          font-size 30px
          color rgb(102, 102, 102)
      .selected
        color rgb(23, 23, 23)
      .avatar
        height 180px
        padding 0 30px
        .title
          font-size 30px
          color rgb(85, 85, 85)
        .right
          padding-right 30px
          background url('./sz_10.png') no-repeat right center
          background-size 15px 26px
          img
            width 124px
    .twoList
      margin-top 20px
      &.show
        display block
        opacity 1
  .setUp
    position fixed
    bottom 30px
    left 30px
    right 30px
    width 690px
    height 90px
    line-height 90px
    text-align center
    color #ffffff
    font-size 35px
    border-radius 10px
    background-color rgb(36, 67, 122)
  .crop-con
    position absolute
    top 0
    width 100%
    height 100%
    z-index 999
    .return
      position absolute
      right 20px
      top 20px
      padding 12px 16px
      background-color #65a2e7
      border-radius 4px
      font-size 32px
      color #ffffff
      z-index 100
    .bottom-button
      position fixed
      bottom 0
      width 100%
      height 140px
      display flex
      align-items center
      justify-content space-between
      // padding 0 10px
      .btn
        width 180px
        height 80px
        line-height 80px
        text-align center
        background #40ce53
        color white
        border-radius 10px
        font-size 32px
      .uploading
        width 180px
        height 80px
        line-height 80px
        text-align center
        background #40ce53
        color white
        border-radius 10px
        font-size 32px
      .selectImg
        width 180px
        height 80px
        line-height 80px
        text-align center
        color white
        font-size 32px
        background #65a2e7
        border-radius 10px
        position relative
        .text
          z-index 5
        .uploads
          opacity 0
          position absolute
          top 0
          left 0
          z-index 99
          width 100%
          height 100%
          cursor pointer
</style>
