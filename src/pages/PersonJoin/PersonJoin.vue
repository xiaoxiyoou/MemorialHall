<template>
  <div class="container">
    <div class="crop-con" v-if="showCrop">
      <vue-cropper
        ref="cropper"
        :img="option.img"
        :output-size="option.size"
        :output-type="option.outputType"
        :info="true"
        :full="option.full"
        :fixed="fixed"
        :fixed-number="fixedNumber"
        :can-move="option.canMove"
        :can-scale="option.canScale"
        :can-move-box="option.canMoveBox"
        :fixed-box="option.fixedBox"
        :original="option.original"
        :auto-crop="option.autoCrop"
        :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight"
        :center-box="option.centerBox"
        @real-time="realTime"
        :high="option.high"
        @img-load="imgLoad"
        mode="cover"
      ></vue-cropper>
      <div class="bottom-button">
        <div class="selectImg" @click="uploadImg">
          <span class="text">选择图片</span>
        </div>
        <button @click="rotateLeft" class="btn">向左旋转</button>
        <button @click="rotateRight" class="btn">向右旋转</button>
        <div class="uploading" @click="finish()">上传头像</div>
      </div>
    </div>
    <div class="inputList" ref="inputList">
      <cube-scroll :options="options" ref="scroll">
        <h1 class="title">基本信息</h1>
        <div class="name row j-b ">
          <span class="title">姓名</span>
          <input type="text" placeholder="请输入姓名" v-model="name" />
        </div>
        <div class="tel row j-b">
          <span class="title">联系电话</span>
          <input type="tel" placeholder="请输入联系电话" v-model="tel" />
        </div>
        <div class="code row j-b">
          <span class="title">身份证号码</span>
          <input type="text" placeholder="请输入身份证号码" v-model="codecard" />
        </div>
        <div class="intelligence row j-b">
          <span class="title">所获资质</span>
          <input
            type="text"
            placeholder="请输入所获资质"
            v-model="intelligence"
          />
        </div>
        <div class="number row j-b">
          <span class="title">资质证书编号</span>
          <input
            type="text"
            placeholder="请输入资质证书编号"
            v-model="number"
          />
        </div>
        <div class="time row j-b">
          <span class="title">获得资质时间</span>
          <cube-button
            class="selectTime"
            :class="{ selected: iSelected }"
            @click="showDatePicker"
            >{{ timeText }}</cube-button
          >
        </div>
        <div class="year row j-b">
          <span class="title">从业年限</span>
          <input type="tel" placeholder="请输入从业年限" v-model="year" />
        </div>
        <div class="opreationCon">
          <div class="operationTitle">执宾简介</div>
          <textarea
            class="operationTxt"
            id=""
            placeholder="请输入主要经营内容"
            v-model="operationTxt"
          ></textarea>
        </div>
        <div class="location row j-b">
          <span class="title">所在企业</span>
          <input type="text" placeholder="请输入所在企业" v-model="location" />
        </div>
        <div class="avatar row a-c j-b ">
          <span class="title">头像上传</span>
          <div class="imgCon" @click="showAvatar">
            <img
              class="avatarImg"
              :src="modelSrc ? modelSrc : require('./cjjnt_10.png')"
              @load="loadImg"
            />
          </div>
        </div>
      </cube-scroll>
    </div>
    <div class="btnList" v-show="!showCrop">
      <button class="join" @click="handleJoin">申请加入</button>
      <a class="relation" href="tel:13828172679">联系咨询</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { addPerson,getSdkData,postMediaId } from 'api/index'
import { VueCropper } from 'vue-cropper'
import { config } from 'assets/js/share.js'
var wx = require('weixin-js-sdk')
export default {
  data() {
    return {
      modelSrc:'',
      showCrop: false,
      timeText: '请选择成立时间',
      iSelected: false,
      address: '',
      name: '',
      tel: '',
      codecard: '',
      year: '',
      number: '',
      operationTxt: '',
      intelligence: '',
      location:'',
      options:{
        probeType :3,
        click: true,
        scrollbar: true
      },
      // 剪切图片上传
      previews: {},
      option: {
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
      fileName: '' // 本机文件地址
    }
  },
  mounted(){
    this.doConfig()
    this.computedHeight()
    window.addEventListener('resize', ()=>{
      this.computedHeight()
    })
  },
 
  methods:{
    doConfig(){
      getSdkData({
        tempurl: encodeURIComponent(location.href.split('#')[0])
      }).then(res=>{
        // alert(res)
        console.log(res)
        config(res.data.data)
      })
    },
    computedHeight(){
      let awaitTimer = setTimeout(()=>{
        clearTimeout(awaitTimer)
        this.$refs.inputList.style.height = document.documentElement.clientHeight - '120' + 'px'
      },10)
    },
    loadImg(){
      this.$nextTick(()=>{
        this.$refs.scroll.refresh()
      })
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
        this.modelSrc = data
        this.showCrop = false
      })
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
          alert(JSON.stringify(res))
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
    showAvatar(){
      this.showCrop = !this.showCrop
    },
    handleJoin(){
      // let codecard = this.checkCode(this.codecard)
      // console.log('codecard',codecard)
      if(!this.name){
        this.$createToast({
          type: 'warn',
          txt: '请输入姓名',
          time: 1000
        }).show()
      }else if(!this.tel){
        this.$createToast({
          type: 'warn',
          txt: '请输入联系电话',
          time: 1000
        }).show()
      }else if(this.codecard.length !== 18){
        this.$createToast({
          type: 'warn',
          txt: '请输入正确身份证号码',
          time: 1000
        }).show()
      }else if(!this.modelSrc){
        this.$createToast({
          type: 'warn',
          txt: '请上传头像',
          time: 1000
        }).show()
      }else{
        this.sendJoin()
      }
    },
    sendJoin(){
      addPerson({
        name: this.name,
        tel: this.tel,
        codecard: this.codecard,
        qualification: this.intelligence,
        code: this.number,
        qualidate: this.timeDate,
        workyear: this.year,
        workmain: this.operationTxt,
        headimg: this.modelSrc,
        companyId: this.location
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.$createToast({
            txt: '创建成功',
            type: 'warning',
            time: 3000
          }).show()
        }else if(res.code === 2){
            this.$createToast({
            txt: '记录已存在',
            type: 'warning',
            time: 1000
          }).show()
        }else{
          this.$createToast({
            txt: '创建失败',
            type: 'warning',
            time: 1000
          }).show()
        }
      })
    },
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '请选择时间',
          min: new Date(1980, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.datePicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      console.log(date)
      console.log(selectedVal)
      console.log(selectedText)
      this.timeText = `${selectedVal[0]}年${selectedVal[1]}月${selectedVal[2]}日`
      this.timeDate = `${selectedVal[0]}/${selectedVal[1]}/${selectedVal[2]}`
      this.iSelected = true
    }
    // checkCode (val) {
    //   var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    //   var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
    //   var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
    //   var code = val.substring(17);
    //   if(p.test(val)) {
    //     var sum = 0;
    //     for(var i = 0; i < 17; i++) {
    //       sum += val[i] * factor[i];
    //     }
    //     if(parity[sum % 11] === code.toUpperCase()) {
    //       return true;
    //     }else{
    //       return false
    //     }
    //   }else{
    //     return false 
    //   }
    // }
    // checkDate(val) {
    //   var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    //   if(pattern.test(val)) {
    //     var year = val.substring(0, 4);
    //     var month = val.substring(4, 6);
    //     var date = val.substring(6, 8);
    //     var date2 = new Date(year + '-' + month + '-' + date);
    //     if(date2 && date2.getMonth() === (parseInt(month) - 1)) {
    //       return true;
    //     }
    //   }
    // },
    // checkProv (val) {
    //   var pattern = /^[1-9][0-9]/;
    //   var provs = { 11:'北京',12:'天津',13:'河北',14:'山西',15:'内蒙古',21:'辽宁',22:'吉林',23:'黑龙江 ',31:'上海',32:'江苏',33:'浙江',34:'安徽',35:'福建',36:'江西',37:'山东',41:'河南',42:'湖北 ',43:'湖南',44:'广东',45:'广西',46:'海南',50:'重庆',51:'四川',52:'贵州',53:'云南',54:'西藏 ',61:'陕西',62:'甘肃',63:'青海',64:'宁夏',65:'新疆',71:'台湾',81:'香港',82:'澳门' };
    //   if(pattern.test(val)) {
    //     if(provs[val]) {
    //         return true;
    //     }
    //   }
    // },
    // checkID(val) {
    //   console.log(this.checkCode(val))
    //   if(this.checkCode(val)) {
    //     return true 
    //   }else{
    //     return false
    //   }
    // }
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
  background-color #ffffff
  padding-bottom 240px
  .crop-con
    position absolute
    top 0
    width 100%
    height 100%
    z-index 999
    .bottom-button
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      .btn
        padding 4px 6px
        background-color #40ce53
        border-radius 4px
        font-size 32px
        color #ffffff
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
  .title
    width 100%
    height 80px
    line-height 80px
    padding-left 30px
    font-size 33px
    color rgb(102,102,102)
    background-color rgb(234,234,234)
  .inputList
    width 100%
    padding-bottom 20px
    // height 900px
    .avatar
      height 120px
      .title
        width 40%
        font-size 32px
        color rgb(102,102,102)
        background-color #ffffff
      .imgCon
        width 55%
        .avatarImg
          height 120px
    .name,.address,.tel,.code,.time,.intelligence,.number,.year,.location
      height 80px
      .title
        width 34%
        font-size 32px
        color rgb(102,102,102)
        background-color #ffffff
      input
        width 60%
        padding-right 30px
        color rgb(23,23,23)
      input::placeholder
        font-size 32px
        color rgb(102,102,102)
      .selectTime
        width 60%
        text-align left
        background-color #ffffff
        font-size 32px
        color rgb(102,102,102)
        padding 0
        margin 0
      .selected
        color rgb(23,23,23)
    .opreationCon
      padding 0 30px
      .operationTitle
        height 80px
        line-height 80px
        font-size 32px
        color rgb(102,102,102)
        background-color #ffffff
      .operationTxt
        width 100%
        padding 20px
        height 100px
        background-color rgb(234,234,234)
        font-size 32px
        color rgb(23,23,23)
        border-radius 10px
        border none
        &::-webkit-input-placeholder
          font-size 30px
  .btnList
    position absolute
    bottom 0px
    width 100%
    padding 0 30px
    height 240px
    background rgba(255,255,255,0)
    z-index 99
    .join,.relation
      display block
      width 690px
      height 90px
      line-height 90px
      text-align center
      background-color rgb(36,67,122)
      color #ffffff
      font-size 35px
      border-radius 10px
      margin-top 20px
</style>
