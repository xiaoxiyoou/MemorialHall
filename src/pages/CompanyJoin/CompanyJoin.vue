<template>
  <div class="container">

    <div class="mapCon" v-show="showMap">
      <iframe id="mapPage" 
        width="100%" height="100%" 
        frameborder=0 
        src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&mapdraggable=1&radius=1500&total=20&key=W5MBZ-777C5-VKNI3-QIMDK-U5IIK-SJF35&referer=myapp">
      </iframe>
    </div>
    <cube-scroll :options='options'>
    <h1 class="title">企业信息</h1>
    <div class="inputList">
      <div class="name row">
        <span class="title">企业名称</span>
        <input type="text" placeholder="请输入企业名称" v-model="name"/>
      </div>
      <div class="address row" @click="toMap">
        <span class="title">企业地址</span>
        <div class="addressText">{{ address ? address : '请选择企业地址'}}</div>
      </div>
      <div class="tel row">
        <span class="title">企业电话</span>
        <input type="tel" placeholder="请输入企业电话" v-model="tel" />
      </div>
      <div class="boss row">
        <span class="title">法人名称</span>
        <input type="text" placeholder="请输入法人名称" v-model="boss"/>
      </div>
      <div class="boss row">
        <span class="title">负责人</span>
        <input type="text" placeholder="请输入负责人名称" v-model="fzr"/>
      </div>
      <div class="money row">
        <span class="title">注册资本</span>
        <input type="text" placeholder="请输入注册资本" v-model="money"/>
      </div>
      <div class="time row">
        <span class="title">成立时间</span>
        <cube-button
          class="selectTime"
          :class="{ selected: iSelected }"
          @click="showDatePicker"
          >{{ timeText }}</cube-button
        >
      </div>
      <div class="personnel row">
        <span class="title">职员人数</span>
        <input type="tel" placeholder="请输入职员人数" v-model="personNum"/>
      </div>
      <div class="opreationCon">
        <div class="operationTitle">主要经营内容</div>
        <textarea
          class="operationTxt"
          id=""
          placeholder="请输入主要经营内容"
          v-model="operationTxt"
        ></textarea>
      </div>
    </div>
    </cube-scroll> 
    <div class="btnList">
      <button class="join" @click="handleJoin">申请加入</button>
      <a v-if="!showMap" class="relation" href="tel:13828172679">联系咨询</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { sendCompanyRegister } from 'api/index'
 
export default {
  data() {
    return {
      timeText: '请选择成立时间',
      iSelected: false,
      showMap: false,
      address: '',
      latlng: null,
      name: '',
      tel: '',
      boss: '',
      money: '',
      personNum: '',
      operationTxt: '',
      intelligence: '',
      fzr:'',
      options:{
        probeType :3,
        click: true,
        scrollbar: true
      }
    }
  },
  mounted(){
    this.selectAddress()
  },
  methods:{
    handleJoin(){
      if(!this.name){
        this.$createToast({
          type: 'warn',
          txt: '请输入企业名称',
          time: 1000
        }).show()
      }else if(!this.latlng){
        this.$createToast({
          type: 'warn',
          txt: '请选择企业地址',
          time: 1000
        }).show()
      }else if(!this.tel){
        this.$createToast({
          type: 'warn',
          txt: '请输入企业电话',
          time: 1000
        }).show()
      }else if(!this.money){
        this.$createToast({
          type: 'warn',
          txt: '请输入注册资本',
          time: 1000
        }).show()
      }else if(!this.iSelected){
        this.$createToast({
          type: 'warn',
          txt: '请选择成立时间',
          time: 1000
        }).show()
      }else if(!this.personNum){
         this.$createToast({
          type: 'warn',
          txt: '请输入职员人数',
          time: 1000
        }).show()
      }else if(!this.operationTxt){
        this.$createToast({
          type: 'warn',
          txt: '请输入经营内容',
          time: 1000
        }).show()
      }else {
        this.sendJoin()
      }
    },
    sendJoin(){
      sendCompanyRegister({
        fzr:this.fzr,
        name: this.name,
        address: this.address,
        lat: this.latlng.lat,
        lot: this.latlng.lng,
        tel: this.tel,
        legalperson: this.boss,
        capital: this.money,
        adddate: this.timeDate,
        personnel: Number(this.personNum),
        mainbusiness: this.operationTxt,
        companyCate: this.intelligence
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.$createToast({
            txt: '添加成功',
            type:'correct',
            time: 1000
          }).show()
          this.$router.replace({
            path: './companyindex'
          })
        }else{
           this.$createToast({
            txt: res.msg,
            type:'correct',
            time: 1000
          }).show()
        }
      })
    },
    selectAddress(){
      window.addEventListener('message', (event)=> {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data
        if (loc && loc.module === 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          console.log('location', loc)
          this.address = loc.poiname
          this.latlng = loc.latlng
          console.log(this.latlng)
          this.showMap = false
        }
      }, false);
    },
    toMap(){
      this.showMap = true
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
    },
    cancelHandle() {
      this.$createToast({
        type: 'correct',
        txt: 'Picker canceled',
        time: 1000
      }).show()
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.container
  position absolute
  top 0px
  width 100%
  height 100%
  background-color #ffffff
  padding-bottom 220px
  .mapCon
    position absolute
    top 0px
    left 0px
    width 100%
    height 100%
    z-index 100
  .amap-wrapper
    width 100%
    height 500px
    position relative
    .search-box 
      position absolute
      top 25px
      left 20px
  .title
    width 100%
    height 80px
    line-height 80px
    padding-left 30px
    font-size 33px
    color rgb(102,102,102)
    background-color rgb(234,234,234)
  .inputList
    // margin-top 20px
    width 100%
    // height 830px
    .name,.address,.tel,.boss,.money,.time,.personNum,.personnel,.location
      height 80px
      .title
        width 30%
        font-size 32px
        color rgb(102,102,102)
        background-color #ffffff
      .addressText
        width 70%
        line-height 80px
      input
        width 70%
        padding-right 30px
        color rgb(23,23,23)
      input::placeholder
        font-size 32px
        color rgb(102,102,102)
      .selectTime
        width 70%
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
    height 220px
    padding 0 30px
    background-color rgba(255,255,255,.6)
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
      margin-bottom 20px
</style>
