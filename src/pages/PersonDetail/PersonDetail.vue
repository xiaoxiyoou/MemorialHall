<template>
  <div class="container">
    <cube-scroll>
      <div class="detailInfo row">
        <img :src="personData.ResidentImg" alt="" class="avatar">
        <div class="info col">
          <span class="name">{{personData.ResidentName}}</span>
          <span class="level">{{personData.ResidentQualification}}</span>
          <Star class="topStar" :grade="personData.ResidentScore"/>
        </div>
      </div>
      <p class="title">基本信息</p>
      <div class="detail">
        <div class="item row a-c">
          <p class="left">联系电话</p>
          <p class="right">{{personData.ResidentTel}}</p>
        </div>
        <div class="item row a-c">
          <p class="left">身份证号码</p>
          <p class="right">{{personData.ResidentPersonCode}}</p>
        </div>
        <div class="item row a-c">
          <p class="left">所获资质</p>
          <p class="right yColor">{{personData.ResidentQualification}}</p>
        </div>
        <div class="item row a-c">
          <p class="left">资质证书编号</p>
          <p class="right">{{personData.ResidentCode}}</p>
        </div>
        <div class="item row a-c">
          <p class="left">获得时间</p>
          <p class="right">{{personData.ResidentGetDate}}</p>
        </div>
        <div class="item row a-c">
          <p class="left">从业年限</p>
          <p class="right">{{personData.ResidentYearNum}}</p>
        </div>
        <div class="item row a-c">
          <p class="left">主要工作内容</p>
        </div>
        <p class="context">
          {{personData.ResidentWorkMain}}
        </p>
        <div class="item row a-c">
          <p class="left">所在企业</p>
          <p class="right">{{personData.companyname}}</p>
        </div>
      </div>
      <div style="width:100%;height:100px"></div>
    </cube-scroll>
    <button class="toEvaluate row a-c j-c" @click="toEvaluate()">
      <img src="./msg.png" alt="">
      <span>市民评价</span>
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from 'components/Star/Star.vue'
import { getPersonDetail } from  'api/index'

export default {
  data() {
    return {
      personData: {}
    }
  },
  mounted(){
    this._getPerSonDetail(this.$route.query.id)
  },
  methods: {
    _getPerSonDetail(id){
      getPersonDetail({
        id
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.personData = Object.assign({},res.data)
        }
      })
    },
    toEvaluate(id){
      this.$router.push({
        path:'./personevaluate',
        query:{
          from: 1,
          id: this.$route.query.id,
          name: this.personData.ResidentName
        }
      })
    }
  },
  components: {
    Star
  }
}
</script>

<style scoped lang="stylus">
>>> .topStar .star
      width 33px
>>> .topStar .text
      font-size 45px
      font-weight bold
.container
  position absolute
  top 0px
  width 100%
  height 100%
  // overflow auto
  .detailInfo
    width 100%
    height 480px
    background-color #ffffff
    padding 60px 50px
    .avatar
      display block
      width 308px
      height 360px
      border-radius 6px
      flex-shrink 1
    .info
      margin-left 36px
      .name
        font-size 52px
        color rgb(51,51,51)
        font-weight bold
      .level
        // display inline-block
        padding 10px 28px
        border-radius 5px
        color #ffffff
        background-color  rgb(255,162,0)
        font-size 36px
        margin-top 34px
        margin-bottom 30px
  .title
    font-size 33px
    color rgb(102,102,102)
    height 80px
    line-height 80px
    padding-left 30px
  .detail
    width 100%
    background-color #ffffff
    padding 30px
    .item
      width 100%
      height 70px
      .left
        width 40%
        font-size 30px
        color rgb(102,102,102)
      .right
        font-size 32px
        color rgb(23,23,23)
      .yColor
        color rgb(255,162,0)
    .context
      font-size 32px
      color rgb(23,23,23)
      line-height 44px
  .toEvaluate
    position fixed 
    bottom 0
    width 100%
    height 100px
    background-color rgb(36,67,122)
    font-size 35px
    color #ffffff
    z-index 99
    img
      width 38px
    span 
      margin-left 20px
</style>
