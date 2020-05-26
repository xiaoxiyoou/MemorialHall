<template>
  <div class="container">
    <div class="crop-con" v-if="showCrop">
      <div class="return" @click="hideCrop">返回</div>
      <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full" :fixed="fixed" :fixed-number="fixedNumber"
        :can-move="option.canMove" :can-scale="option.canScale" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original"
        :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox"
        @real-time="realTime" :high="option.high"
        @img-load="imgLoad" mode="cover"></vue-cropper>
      <div class="bottom-button row j-b">
        <div class="selectImg" @click="uploadImg">
          <span class="text">选择图片</span>
        </div>
        <button @click="rotateLeft" class="btn">向左旋转</button>
        <button @click="rotateRight" class="btn">向右旋转</button>
        <div class="uploading" @click="finish()">确认上传</div>
      </div>
    </div>
    <div class="select row a-c j-c">
      <div class="itemList">
        <div
          class="item"
          :class="{ on: item.selected }"
          v-for="(item, index) in tabList"
          :key="index"
          @click="switchTab(index, item.selected)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <cube-scroll ref="scroll">
      <div class="inputList">
        <div class="oneList">
          <div class="item row a-c j-b border-bottom-1px">
            <span class="title">逝者姓名</span>
            <input type="text" placeholder="请输入逝者姓名" v-model="oneName"/>
          </div>
          <div class="item row a-c j-b border-bottom-1px">
            <span class="title">性别</span>
            <div class="sex" @click="showSex(1)">{{sex1Text}}</div>
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
          <div class="avatar row a-c j-b border-bottom-1px">
            <span class="title">遗像</span>
            <div class="right row a-c"  @click="showAvatar(1)">
              <img :src='avatarImg1 ? avatarImg1 : require("./cjjnt_10.png")' alt="" />
            </div>
          </div>
        </div>
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div class="twoList" v-if="showTwo">
            <div class="item row a-c j-b border-bottom-1px">
              <span class="title">逝者姓名</span>
              <input type="text" placeholder="请输入逝者姓名" v-model="twoName"/>
            </div>
            <div class="item row a-c j-b border-bottom-1px">
              <span class="title">性别</span>
              <div class="sex" @click="showSex(2)">{{sex2Text}}</div>
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
              <input type="text" placeholder="请输入出生地点"  v-model="addressStart2"/>
            </div>
            <div class="item row a-c j-b border-bottom-1px">
              <span class="title">安葬地点</span>
              <input type="text" placeholder="请输入安葬地点"  v-model="addressEnd2"/>
            </div>
            <div class="avatar row a-c j-b border-bottom-1px">
              <span class="title">遗像</span>
              <div class="right row a-c"  @click="showAvatar(2)">
                <img :src='avatarImg2 ? avatarImg2 : require("./cjjnt_10.png")' alt="" />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </cube-scroll>
    <div class="setUp" @click="toSetUp">创建</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSdkData,postMediaId,setHall } from 'api/index'
import { VueCropper } from 'vue-cropper'
import { config } from 'assets/js/share.js'
var wx = require('weixin-js-sdk')
const column1 = [{ text: '男',value: '1' } , { text: '女',value: '0' }]
export default {
  data() {
    return {
      showTwo: false,
      tabList:[
        {
          text:'单人',
          value: '1',
          selected: true
        },
        {
          text:'双人',
          value: '2',
          selected: false
        }
      ],
      sex1Text: '请选择性别',
      sex2Text: '请选择性别',
      sexOptions: ['男','女'],
      num: void 0,
      sexNum: void 0,
      oneName: '',
      twoName: '',
      addressStart1: '',
      addressEnd1:'',
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
        img: require('./imgselect.png'),
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
      avatarNum: void 0
    }
  },
  mounted(){
    this.doConfig()
  },
  methods: {
    doConfig(){
      getSdkData({
        tempurl: encodeURIComponent(location.href.split('#')[0])
      }).then(res=>{
        // alert(res)
        console.log(res)
        config(res.data.data)
      })
    },
    hideCrop(){
      this.showCrop = !this.showCrop
    },
    showAvatar(num){
      this.showCrop = !this.showCrop
      this.avatarNum = num
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
        console.log('完成,' , data)
        if(this.avatarNum === 1){
          this.avatarImg1 = data
          // alert(this.avatarImg1)
        }else{
          this.toBase64()
          this.avatarImg2 = data
          // alert(this.avatarImg2)
        }
        this.showCrop = false
      })
    },
    // 传base64
    toBase64(){
      
    },
    //  实时预览函数
    realTime(data) {
      console.log(data);
      this.previews = data;
    },
    upLoad(localId){          
      wx.uploadImage({
        localId,
        success: (res)=> {
          // alert(res.serverId)
          this._postMediaId(res.serverId)
        },
        fail: function(res) {
          // alert(JSON.stringify(res))
        }
      })
    },
    // 单张上传
    _postMediaId(id){
      postMediaId({
        media_id: id
      }).then(res=>{
        this.option.img = res.data[0]
        // alert(this.option.img)
      })
    },
    // 选择本地图片
    uploadImg() {
      wx.ready(()=>{
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res)=> {
            this.upLoad(res.localIds[0])
          }
        })
      })
    },
    imgLoad(msg) {
      console.log(msg)
    },
    // 提示框
    showToast(txt){
      this.$createToast({
        type: 'warn',
        txt,
        time: 1000
      }).show()
    },
    // 检查信息是否完善并提交
    toSetUp(){
      if(this.tabList[0].selected){
        if(!this.oneName){
          this.showToast('请输入姓名')
          return false
        }else{
          setHall({
            isMuli: 0,
            DieUserName: this.oneName,
            DieUserBirthday: this.startTime1,
            DieUserDate: this.endTime1,
            DieUserAddRess: this.addressStart1,
            DieUserSite: this.addressEnd1,
            DieUserSex: this.sex1,
            DieUserImg: this.avatarImg1
        }).then(res=>{
          console.log(res)
            if(res.code === 0){
              this.$router.replace({
                path: './halllist'              
              })
            }else{
              this.$createToast({
                txt: '创建失败',
                type: 'warn',
                time: 1000
              }).show()
            }
          })
        }
      }else{
        if(!this.oneName){
          this.showToast('请输入姓名')
          return false
        }else if(!this.twoName){
          this.showToast('请输入姓名')
          return false
        }else{
          setHall({
            isMuli: 1,
            DieUserName: this.oneName,
            DieUserBirthday: this.startTime1,
            DieUserDate: this.endTime1,
            DieUserAddRess: this.addressStart1,
            DieUserSite: this.addressEnd1,
            DieUserSex: this.sex1,
            DieUserImg: this.avatarImg1,
            DieUserName2: this.twoName,
            DieUserBirthday2: this.startTime2,
            DieUserDate2: this.endTime2,
            DieUserAddRess2: this.addressStart2,
            DieUserSite2: this.addressEnd2,
            DieUserSex2: this.sex2,
            DieUserImg2: this.avatarImg2
        }).then(res=>{
            console.log(res)
            if(res.code === 0){
              this.$router.replace({
                path: './halllist'              
              })
            }else{
              this.$createToast({
                txt: '创建失败',
                type: 'warn',
                time: 1000,
                onTimeout:()=>{
                  this.$router.go(-1)
                }
              }).show()
            }
          })
        }
      }
    },
    //     toSetUp(){
    //   if(this.tabList[0].selected){
    //     if(!this.oneName){
    //       this.showToast('请输入姓名')
    //       return false
    //     }else if(!this.endTime1){
    //       this.showToast('请选择逝世日期')
    //       return false
    //     }else if(!this.addressEnd1){
    //       this.showToast('请选择安葬地点')
    //       return false
    //     }else if(!this.sex1){
    //       this.showToast('请选择性别')
    //       return false
    //     }else if(!this.avatarImg1){
    //       this.showToast('请选择头像')
    //       return false
    //     }else{
    //       setHall({
    //         isMuli: 0,
    //         DieUserName: this.oneName,
    //         DieUserBirthday: this.startTime1,
    //         DieUserDate: this.endTime1,
    //         DieUserAddRess: this.addressStart1,
    //         DieUserSite: this.addressEnd1,
    //         DieUserSex: this.sex1,
    //         DieUserImg: this.avatarImg1
    //     }).then(res=>{
    //       console.log(res)
    //         if(res.code === 0){
    //           this.$router.replace({
    //             path: './halllist'              
    //           })
    //         }else{
    //           this.$createToast({
    //             txt: '创建失败',
    //             type: 'warn',
    //             time: 1000
    //           }).show()
    //         }
    //     })
    //     }
    //   }else{
    //     if(!this.oneName){
    //       this.showToast('请输入姓名')
    //       return false
    //     }else if(!this.endTime1){
    //       this.showToast('请选择逝世日期')
    //       return false
    //     }else if(!this.addressEnd1){
    //       this.showToast('请选择安葬地点')
    //       return false
    //     }else if(!this.sex1){
    //       this.showToast('请选择性别')
    //       return false
    //     }else if(!this.avatarImg1){
    //       this.showToast('请选择头像')
    //       return false
    //     }else if(!this.twoName){
    //       this.showToast('请输入姓名')
    //       return false
    //     }else if(!this.endTime2){
    //       this.showToast('请选择逝世日期')
    //       return false
    //     }else if(!this.addressEnd2){
    //       this.showToast('请选择安葬地点')
    //       return false
    //     }else if(!this.sex2){
    //       this.showToast('请选择性别')
    //       return false
    //     }else if(!this.avatarImg2){
    //       this.showToast('请选择头像')
    //       return false
    //     }else{
    //       setHall({
    //         isMuli: 1,
    //         DieUserName: this.oneName,
    //         DieUserBirthday: this.startTime1,
    //         DieUserDate: this.endTime1,
    //         DieUserAddRess: this.addressStart1,
    //         DieUserSite: this.addressEnd1,
    //         DieUserSex: this.sex1,
    //         DieUserImg: this.avatarImg1,
    //         DieUserName2: this.twoName,
    //         DieUserBirthday2: this.startTime2,
    //         DieUserDate2: this.endTime2,
    //         DieUserAddRess2: this.addressStart2,
    //         DieUserSite2: this.addressEnd2,
    //         DieUserSex2: this.sex2,
    //         DieUserImg2: this.avatarImg2
    //     }).then(res=>{
    //         console.log(res)
    //         if(res.code === 0){
    //           this.$router.replace({
    //             path: './halllist'              
    //           })
    //         }else{
    //           this.$createToast({
    //             txt: '创建失败',
    //             type: 'warn',
    //             time: 1000,
    //             onTimeout:()=>{
    //               this.$router.go(-1)
    //             }
    //           }).show()
    //         }
    //       })
    //     }
    //   }
    // },
    // 顶部切换
    switchTab(index, selected){
      if(index === 0 && selected === false){
        this.tabList[1].selected = false
        this.tabList[0].selected = true
        this.showTwo = !this.showTwo
        this.$refs.scroll.scrollTo(0,0)
      }else if(index === 1 && selected === false){
        this.tabList[0].selected = false
        this.tabList[1].selected = true
        this.showTwo = !this.showTwo
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
      if(this.sexNum === 1){
        this.sex1 = selectedVal[0]
        this.sex1Text = selectedText[0]
        console.log(this.sex1)
      }else {
        this.sex2 = selectedVal[0]
        this.sex2Text = selectedText[0]
        console.log(this.sex2)
      }
    },
    showStartime(num){
      if (!this.datePicker1) {
        this.datePicker1 = this.$createDatePicker({
          title: '请选择出生日期',
          min: new Date(1900, 7, 8),
          max: new Date(2040, 9, 20),
          value: new Date(),
          onSelect: this.selectStartTime
        })
      }
      this.datePicker1.show()
      this.num = num
    },
    selectStartTime(date, selectedVal, selectedText) {
      if(this.num === 1){
        this.startTimeText1 = `${selectedVal[0]}年${selectedVal[1]}月${selectedVal[2]}日`
        this.startTime1 = `${selectedVal[0]}/${selectedVal[1]}/${selectedVal[2]}`
        console.log(this.startTime1)
      }else if (this.num === 2){
        this.startTimeText2 = `${selectedVal[0]}年${selectedVal[1]}月${selectedVal[2]}日`
        this.startTime2 = `${selectedVal[0]}/${selectedVal[1]}/${selectedVal[2]}`
        console.log(this.startTime2)
      }
    },
    showEndtime(num){
      if (!this.datePicker2) {
        this.datePicker2 = this.$createDatePicker({
          title: '请选择逝世日期',
          min: new Date(1900, 7, 8),
          max: new Date(2040, 9, 20),
          value: new Date(),
          onSelect: this.selectEndTime
        })
      }
      this.datePicker2.show()
      this.num = num
    },
    selectEndTime(date, selectedVal, selectedText) {
      if(this.num === 1){
        this.endTimeText1 = `${selectedVal[0]}年${selectedVal[1]}月${selectedVal[2]}日`
        this.endTime1 = `${selectedVal[0]}/${selectedVal[1]}/${selectedVal[2]}`
        console.log(this.endTime1)
      }else if (this.num === 2){
        this.endTimeText2 = `${selectedVal[0]}年${selectedVal[1]}月${selectedVal[2]}日`
        this.endTime2 = `${selectedVal[0]}/${selectedVal[1]}/${selectedVal[2]}`
        console.log(this.endTime2)
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
// >>>.cube-scroll-content
  // height 100%
.container
  position absolute
  top 0px
  width 100%
  height 100%
  padding-top 90px
  padding-bottom 150px
  .select
    position absolute
    top 0px
    width 100%
    height 90px
    border-bottom 2px solid #f5f5f5
    .itemList
      height 35px
      .item
        display inline-block
        width 120px
        height 100%
        padding-left 50px
        padding-top 4px
        background url('./cjjnt_05.png') no-repeat
        background-size 35px 35px
        font-size 30px
        &:first-child
          margin-right 40px
      .on
        background url('./cjjnt_03.png') no-repeat
        background-size 35px 35px
  .inputList
    width 100%
    height 100%
    .oneList,.twoList
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
          color rgb(85,85,85)
        input
          height 90px
          // line-height 90px
          font-size 30px
          color rgb(51,51,51)
          text-align right
        .selectTime
          width 70%
          text-align right
          background-color #ffffff
          font-size 32px
          color rgb(102,102,102)
          padding 0
          margin 0
      .selected
        color rgb(23,23,23)
      .avatar
        height 180px
        padding 0 30px
        .title
          font-size 30px
          color rgb(85,85,85)
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
    background-color rgb(36,67,122)
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
        // padding 4px 6px
        // background-color #40ce53
        // border-radius 4px
        // font-size 32px
        // color #ffffff
        width: 180px;
        height: 80px;
        line-height: 80px;
        text-align center
        background: #40ce53;
        color: white;
        border-radius: 10px;
        font-size: 32px;
      .uploading 
        width: 180px;
        height: 80px;
        line-height: 80px;
        text-align center
        background: #40ce53;
        color: white;
        border-radius: 10px;
        font-size: 32px;
      .selectImg 
        width: 180px;
        height: 80px;
        line-height: 80px;
        text-align center
        color: white;
        font-size: 32px;
        background: #65a2e7;
        border-radius: 10px;
        position: relative;
        .text
          z-index: 5;
        .uploads 
          opacity: 0;
          position: absolute;
          top:0
          left: 0
          z-index: 99;
          width: 100%;
          height: 100%;
          cursor: pointer;
</style>
