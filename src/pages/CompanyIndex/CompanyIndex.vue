<template>
  <div class="container">
    <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
      <MaskCon v-if="showClassifyList" class="mask" @closeClassifyList="closeClassifyList"/>
    </transition>
    <SearchInput @toSearch="toSearch"/>
    <header class="top">
      <swiper :options="swiperOption" class="swiper-wrap"  ref="mySwiper">
        <swiper-slide v-for="(item,index) in banner" :key="index" >
          <img :src="item.AdImg" alt="" />
        </swiper-slide>
      </swiper>
    </header>
    <div class="tabList row a-c border-bottom-1px">
      <div class="near" @click="_getLonAndLau">附近</div>
      <div class="classify" @click="switchClassifyList">
        <span>分类</span> 
        <img class="arrow" :class="showArrow ? 'downArrow' :'upArrow'" src="./img/down-arrow.png" alt="" />
      </div>
      <div class="recommend" @click="handleRecommend">推荐</div>
      <div class="goodEvaluate" @click="goodEvaluate">好评</div>
    </div>
    <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
      <ul class="classifyList" v-if="showClassifyList">
        <li @click="closeClassifyList(index,item.CompanyCateId)" 
            class="item border-bottom-1px" 
            :class="{colorOn:index === number}"
            v-for="(item,index) in classifyList" 
            :key="item.CompanyCateId">
          {{item.CompanyCateName}}
        </li>         
      </ul>
    </transition>
    <ul class="companyList" ref="companyList">
      <cube-scroll ref="scroll" :data="companyList" :options="options" @pulling-up="onPullingUp">
        <li class="item col j-b" v-for="(item, index) in companyList" :key="index" @click="toCompanyDetail(item.CompanyId)">
          <a class="tel" :href="'tel:' + item.CompanyTel" @click="prevent"><img src="./img/phone.png" alt=""></a>
          <p class="title">{{item.CompanyName}}</p>
          <div class="grade row a-c">
            <span class="title">服务指数</span>
            <Star :grade="item.CompanyScore" />
          </div>
          <div class="address row a-c">
            <img class="icon" src="./img/address-icon.png" alt="">
            <p class="text">{{item.CompanyAddress}}</p>
          </div>
        </li>
      </cube-scroll>
    </ul>
    <img v-if="noText" class="no-text" src="./img/no-text.png" />
  </div>
</template>

<script type="text/ecmascript-6">
import SearchInput from 'components/SearchInput/SearchInput.vue'
import MaskCon from 'components/MaskCon/MaskCon.vue'
import Star from 'components/Star/Star.vue'
import { getCompanyList,getCompanyClassify,getSdkData,getCompanyAdList } from  'api/index'
import { config } from 'assets/js/share.js'
var wx = require('weixin-js-sdk');
export default {
  data() {
    return {
      noText: false,
      companyList: [],
      showClassifyList: false,
      showArrow: true,
      number: Number,
      classifyList:[],
      options: {
        probeType: 3,
        click: true,
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '上拉加载更多',
            noMore: '没有更多数据'
          }
        }
      },
      pageCount:0,
      PageSize: 10,
      PageIndex: 1,
      CompanyCateId: 0,
      CompanyName: '',
      Praise: 0,
      recomm: 0,
      lan: 0,
      lon: 0,
      swiperOption:{
        autoplay: true,
        speed: 1000
      },
      banner:[] 
      
    };
  },
  mounted(){
    this._getInit()
    this._getCompanyAdList()
    this.computedHeight()
    window.addEventListener('resize', ()=>{
      this.$nextTick(()=>{
        this.computedHeight()
      })
    })
  },
  methods:{

    prevent(){
      event.stopPropagation()
    },
    computedHeight(){
      this.$nextTick(()=>{
        this.$refs.companyList.style.height = document.documentElement.clientHeight - '495px'
      })
    },
    onPullingUp(){
      console.log('上拉')
      this.PageIndex++ 
      console.log(this.PageIndex)
      if (this.PageIndex <= this.pageCount) {
        this._getCompanyList(10,this.PageIndex,this.CompanyCateId,this.CompanyName,this.recomm,this.lan,this.lon,this.Praise)
      }else{
        console.log('暂无更多数据')
        this.$refs.scroll.forceUpdate();
      }
    },
    // 获取广告
    _getCompanyAdList(){
      getCompanyAdList({
        rowsize: 5
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.banner = res.data
        }
      })
    },
    // 点击好评
    goodEvaluate(){
      this.companyList = []
      this.recomm = 0
      this.CompanyCateId = 0
      this.PageIndex = 1
      this.Praise = 1
      this.pageCount = 0
      this.lan = 0
      this.lon = 0
      this.$refs.scroll.scrollTo(0, 0, 200)
      this.$refs.scroll.refresh()
      this._getCompanyList(10,this.PageIndex,this.CompanyCateId,this.CompanyName,this.recomm,this.lan,this.lon,this.Praise)
    },
    // 点击推荐
    handleRecommend(){
      this.companyList = []
      this.recomm = 1 
      this.CompanyCateId = 0
      this.Praise = 0
      this.PageIndex = 1
      this.pageCount = 0
      this.lan = 0
      this.lon = 0
      this.$refs.scroll.scrollTo(0, 0, 200)
      this.$refs.scroll.refresh()
      this._getCompanyList(10,this.PageIndex,this.CompanyCateId,this.CompanyName,this.recomm,this.lan,this.lon,this.Praise)
    },
    _getInit(){
      getCompanyClassify({
        topSize: 0
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.classifyList = res.data
        }
      })
      this.lan = 0; 
      this.lon = 0;
      // 初始化请求全部列表
      this._getCompanyList(10,this.PageIndex,this.CompanyCateId,this.CompanyName,this.recomm,this.lan,this.lon,this.Praise)
    },
    // 点击附近
    _getLonAndLau(){
      this.companyList = []
      this.recomm = 0
      this.CompanyCateId = 0
      this.Praise = 0
      this.PageIndex = 1
      this.pageCount = 0
      this.$refs.scroll.scrollTo(0, 0, 200)
      this.$refs.scroll.refresh()
      getSdkData({
        tempurl: encodeURIComponent(location.href.split('#')[0])
      }).then(res=>{
        if(res.code === 0){
          let data = res.data.data
          config(data)
          wx.ready(()=>{
            wx.getLocation({
              success:(res)=> {
                console.log(res)
                this.lan = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                this.lon = res.longitude; // 经度，浮点数，范围为180 ~ -180。 
                this._getCompanyList(10,this.PageIndex,this.CompanyCateId,this.CompanyName,this.recomm,this.lan,this.lon,this.Praise)
              },
              cancel: function (res) {
                alert('用户拒绝授权获取地理位置');
              }
            })
          })
        }
      })
    },
    _getCompanyList(PageSize,PageIndex,CompanyCateId,CompanyName,recomm,lan,lon,Praise){
      getCompanyList({
        PageSize,
        PageIndex,
        CompanyCateId,
        CompanyName,
        recomm,
        lan,
        lon,
        Praise
      }).then(res=>{
        console.log(res)
        if(res.code === 0 && res.data){
          this.pageCount = Math.ceil(res.count / 10)
          console.log('pageCount', this.pageCount)
          this.companyList = this.companyList.concat(res.data)
          this.$nextTick(()=>{
            this.$refs.scroll.refresh()
          })
        }else{
          this.noText = true
          // this.$createToast({
          //   txt: '暂无数据',
          //   type: 'warning',
          //   time: 1000
          // }).show()
        }
      })
    },
    switchClassifyList(){
      this.showArrow = !this.showArrow
      this.showClassifyList = !this.showClassifyList
    },
    // 点击分类
    closeClassifyList(index,id){
      console.log(index)
      this.companyList = []
      this.recomm = 0 
      this.number = Number(index)
      this.Praise = 0
      this.PageIndex = 1
      this.$refs.scroll.scrollTo(0, 0, 200)
      this.$refs.scroll.refresh()
      this.$nextTick(()=>{
        this.showClassifyList = false
      })
      this.lan = 0 
      this.lon = 0
      this._getCompanyList(10,this.PageIndex,id,this.CompanyName,this.recomm,this.lan,this.lon,this.Praise)
    },
    toCompanyDetail(id){
      this.$router.push({
        path: './companydetail',
        query: {
          id: id
        }
      })
    },
    toSearch(){
      this.$router.push({
        path:'./search',
        query: {
          from: '0'
        }
      })
    }
  },
  components: {
    SearchInput,
    MaskCon,
    Star
  }
};
</script>

<style scoped lang="stylus">
>>>.swiper-container 
    height 100%
>>>.swiper-container img
    width 100% 
    height 100%
.container
  position absolute
  top 0
  width 100%
  height 100%
  display flex
  flex-direction column
  padding-top 495px
  .mask
    z-index 10
  .top
    position absolute
    top 0
    left 0
    width 100%
    height 405px
    z-index 20
  .tabList
    position absolute
    top 405px
    width 100%
    height 90px
    background-color #ffffff
    font-size 30px
    color rgb(68,68,68)
    z-index 20
    .near,.recommend,.classify,.goodEvaluate
      width 25%
      height 100%
      line-height 90px
      text-align center
      .arrow
        width 25px
        margin-left 14px
        transition transform 1s 
      .downArrow
        transform rotate(0)
      .upArrow
        transform rotate(-180deg)
  .classifyList
    position absolute
    top 495px
    width 100%
    background-color #ffffff
    z-index 15
    .item
      height 96px
      line-height 96px
      padding-left 30px
    .colorOn
      color rgb(36,67,122)
      // color red
  .companyList
    width 100%
    height 100%
    .item
      position relative
      width 100%
      height 210px
      margin-top 20px
      background-color #ffffff 
      padding 30px
      .tel
        position absolute
        top 66px
        right 30px
        img
          display block
          width 80px
      .title
        font-size 36px
        color rgb(68,68,68) 
      .grade
        .title
          font-size 28px
          color rgb(119,119,119)
          margin-right 14px
      .address
        font-size 28px
        color rgb(119,119,119)
        .icon
          width 22px
          margin-right 4px
        .text
          width 90%
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
  .no-text
    position absolute
    top 500px
    width 100%
    height auto
    margin 0 auto
</style>
