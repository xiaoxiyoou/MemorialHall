<template>
  <div class="container">
    <cube-scroll>
      <div class="detail">
        <p class="title">{{name}}</p>
        <div class="grade row a-c">
          <span class="title">服务指数</span>
          <Star :grade="Number(grade)" />
          <div class="tel row a-c">
            <img src="./img/tel.png" alt="">
            <span>{{tel}}</span>
          </div>
        </div>
        <div class="address row ">
          <img class="icon" src="./img/address-icon.png" alt="">
          <p class="text">{{address}}</p>
        </div>
      </div>
      <div class="mainBusiness">
        <p class="title">主要经营</p>
        <p class="text">{{CompanyMain}}</p>
      </div>
      <div class="legalPerson">
        <p class="title">法人名称</p>
        <p class="text">{{CompanyLegalperson}}</p>
      </div>
      <div class="establishedTime">
        <p class="title">成立时间</p>
        <p class="text">{{CompanyAddDate}}</p>
      </div>
      <div class="officeNumber">
        <p class="title">职员人数</p>
        <p class="text">{{CompanyPersonnel}}</p>
      </div>
    </cube-scroll>
    <button class="toEvaluate row a-c j-c" @click="toEvaluate">
      <img src="./img/msg.png" alt="">
      <span>市民评价</span>
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from 'components/Star/Star.vue'
import { getCompanyDetail } from  'api/index'

export default {
  data() {
    return {
      name:'',
      grade: 4.4,
      address: '',
      tel: '',
      CompanyMain:'',
      CompanyLegalperson:'',
      CompanyAddDate: '',
      CompanyPersonnel:'',
      CompanyId: ''
    }
  },
  mounted(){
    this._getCompanyDetail(this.$route.query.id)
  },
  methods:{
    _getCompanyDetail(id){
      getCompanyDetail({
        Id: id
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          let data = res.data
          this.name = data.CompanyName
          this.grade = data.CompanyScore
          this.tel = data.CompanyTel
          this.address = data.CompanyAddress
          this.CompanyMain = data.CompanyMain
          this.CompanyLegalperson = data.CompanyLegalperson
          this.CompanyAddDate = data.CompanyAddDate
          this.CompanyPersonnel = data.CompanyPersonnel
          // this.CompanyId = data.CompanyId
        }
      })
    },
    toEvaluate(){
      this.$router.push({
        path:'./companyevaluate',
        query:{
          from: '0',
          name: this.name,
          id: this.$route.query.id
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
.container
  position absolute
  top 0
  width 100%
  height 100%
  padding-bottom 100px
  .detail
    width 100%
    padding 30px
    background-color #ffffff
    .title
      font-size 40px
      color rgb(68,68,68)
    .grade
      margin-top 30px
      margin-bottom 26px
      .title
        font-size 30px
        color rgb(119,119,119)
        margin-right 14px
        margin-top -4px
      .tel
        margin-left 40px
        img
          width 24px
          margin-right 16px
        span
          font-size 30px
          color rgb(36,67,122)
    .address
      font-size 30px
      color rgb(119,119,119)
      .icon
        width 22px
        height 28px
      .text
        margin-left 10px
        width 90%
        line-height 35px
  .mainBusiness,.legalPerson,.establishedTime,.officeNumber
    width 100%
    padding 30px
    background-color #ffffff
    margin-top 20px
    .title
      font-size 34px
      color rgb(119,119,119)
      margin-bottom 28px
    .text
      font-size 30px
      color rgb(68,68,68)
      line-height 45px
  .toEvaluate
    position fixed 
    bottom 0
    width 100%
    height 100px
    background-color rgb(36,67,122)
    font-size 35px
    color #ffffff
    img
      width 38px
    span 
      margin-left 20px
</style>
