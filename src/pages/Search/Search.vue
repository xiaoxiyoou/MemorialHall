<template>
  <div class="container">
    <div class="inputCon clear-fix">
      <form action="javascript:return true" @submit.prevent="formSubmit">
        <input type="text" class="searchInput fl" :placeholder="placeholderTxt" v-model="searchText"  @keydown="searchTo($event, searchText)">
      </form>
      <span class="seachBtn fr" @click="getList">搜索</span>
    </div>
    <div class="recommendCon" v-show="companyCount>0" ref="listCon">
      <cube-scroll ref="scroll" :options="options" :data="companyList"  @pulling-up="onPullingUp">
        <li class="item col j-b" v-for="(item, index) in companyList" :key="index" @click="toCompanyDetail(item.CompanyId)">
          <a class="tel" :href="'tel:' + item.CompanyTel"><img src="./phone.png" alt=""></a>
          <p class="title">{{item.CompanyName}}</p>
          <div class="grade row a-c">
            <span class="title">服务指数</span>
            <Star :grade="item.CompanyScore" />
          </div>
          <div class="address row a-c">
            <img class="icon" src="./address-icon.png" alt="">
            <p class="text">{{item.CompanyAddress}}</p>
          </div>
        </li>
      </cube-scroll>
    </div>
    <div class="personCon" v-show="personCount>0"  ref="listCon">
      <cube-scroll ref="scroll" :data="personList" :options="options" @pulling-up="onPullingUp">
        <ul class="personList row j-b f-w">
          <li class="item" @click="toDetail(item.ResidentId)" v-for="(item, index) in personList" :key="index">
            <img class="avatar" :src="item.ResidentImg" alt="">
            <div class="itemDesc">
              <p class="name">{{item.ResidentName}}</p>
              <p class="level">{{item.ResidentQualification}}</p>
              <Star class="topStar" :grade="Number(item.msgavage)"/>
            </div>
            <a class="tel" href="tel:13800138000"></a>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <button class="toJoin" @click="toJoin">{{btnTxt}}</button>
  </div>
</template>

<script type="text/ecmascript-6">
import { getCompanyList,getPersonList } from  'api/index'
import Star from 'components/Star/Star.vue'

export default {
  data() {
    return {
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
      from: Number,
      companyList: [],
      personList: [],
      searchText: '',
      companyCount: Number,
      personCount: Number,
      placeholderTxt: '',
      btnTxt: '',
      pageIndex: 1
    }
  },
  mounted(){  
    console.log(this.$route.query)
    if(this.$route.query.from === '0'){
      document.title = '搜索企业'
      this.placeholderTxt = '输入要搜索的企业'
      this.btnTxt = '我也是殡葬服务机构'
    }else{
      document.title = '搜索执宾'
      this.placeholderTxt = '输入要搜索的执宾'
      this.btnTxt = '我也是殡葬服务人员'
    }
    this.computedHeight()
    window.addEventListener('resize', ()=>{
      this.computedHeight()
    })
  },
  methods:{
    computedHeight(){
      // let awaitTimer = setTimeout(()=>{
      //   clearTimeout(awaitTimer)
      //   this.$refs.listCon.style.height = document.documentElement.clientHeight - '280px'
      // },10)
      this.$nextTick(()=>{
        this.$refs.listCon.style.height = document.documentElement.clientHeight - '280px'
      })
    },
    onPullingUp(){
      console.log('上拉')
      this.pageIndex++
      if(this.pageIndex <= this.pageCount){
        if(this.$route.query.from === '0'){
          getCompanyList({
            PageSize: 10,
            PageIndex: this.pageIndex,
            CompanyCateId: 0,
            CompanyName: this.searchText,
            recomm: 0,
            lan: 0,
            lon: 0
          }).then(res=>{
            console.log(res)
            if(res.code === 0){
              this.companyList = this.companyList.concat(res.data)
              this.$refs.scroll.refresh()
            }
          })
        }else{
          getPersonList({
            userName: this.searchText,
            pageIndex: this.pageIndex,
            pageSize: 10
          }).then(res=>{
            console.log(res)
            if(res.code === 0){
              this.personList = res.data.concat(this.personList)
              this.$refs.scroll.refresh()
            }
          })
        }
      }else {
        console.log('暂无更多数据')
        this.$refs.scroll.forceUpdate();
      }
    },
    // 阻止默认事件
    formSubmit() {
      return false;
    },
    searchTo(event, inputvalue) {
      if (event.keyCode === 13) {
        if (inputvalue) {
          this.getList()
        } else {
          this.$createToast({
            txt: '请输入搜索内容',
            type: 'warn',
            time: 1000
          }).show()
        }
      }
    },
    toCompanyDetail(id){
      this.$router.push({
        path: './companydetail',
        query: {
          id: id
        }
      })
    },
    getList(){
      if(this.$route.query.from === '0'){
        getCompanyList({
          PageSize: 10,
          PageIndex: 1,
          CompanyCateId: 0,
          CompanyName: this.searchText,
          recomm: 0,
          lan: 0,
          lon: 0
        }).then(res=>{
          console.log(res)
          if(res.code === 0){
            this.pageCount = Math.ceil(res.count / 10)
            this.companyList = res.data.concat(this.companyList)
            this.companyCount = res.count
          }
        })
      }else{
        getPersonList({
          userName: this.searchText,
          pageIndex: 1,
          pageSize: 10
        }).then(res=>{
          console.log(res)
          this.pageCount = Math.ceil(res.count / 10)
          this.personCount = res.count
          this.personList = res.data.concat(this.personList)
        })
      }
    },
    toJoin(){
      if(this.$route.query.from === '0'){
        this.$router.push({
          path: './companyjoin'
        })
      }else{
        this.$router.push({
          path: './personjoin'
        })
      }
    },
    toDetail(id){
      this.$router.push({
        path:'./persondetail',
        query:{
          id
        }
      })
    }
  },
  components: {
    Star
  },
  computed: {
  }
}
</script>

<style scoped lang="stylus">
@import "~cube-ui/src/common/stylus/mixin.styl"

.container
  position absolute
  top 0px
  width 100%
  height 100%
  padding-top 130px
  padding-bottom 150px
  background-color #ffffff
  .inputCon
    position absolute
    top 0px
    left 0px
    width 100%
    padding 30px
    padding-right 24px
    .searchInput
      width 80%
      height 70px
      padding-left 70px
      border-radius 10px
      background-image url('./ss_03.png')
      background-repeat no-repeat
      background-position 20px center
      background-size 32px 32px
      background-color rgba(0,0,0,.1)
    .seachBtn
      font-size 32px
      margin-top 18px
      padding-bottom 4px
      border-bottom 1px solid rgb(51,51,51)     
  .recommendCon 
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
  .personCon
    width 100%
    height 100%
    padding 0 30px
    .item
      display block
      width 328px
      height 568px
      background-color #ffffff
      margin-bottom 30px
      border-radius 10px
      overflow hidden
      position relative
      .avatar
        display block
        width 100%
        height 410px
      .itemDesc
        margin-top 20px
        padding-left 30px
        .name 
          font-size 35px
          color rgb(51,51,51)
          // margin-bottom 10px
          width 80%
          white-space nowrap
          text-overflow ellipsis
          overflow-x hidden
        .level
          display inline-block
          padding 6px 12px
          border-radius 5px
          color #ffffff
          background-color  rgb(255,162,0)
          font-size 22px
          margin-bottom 10px
      .tel
        position absolute
        right 18px
        bottom 40px
        display block
        width 56px
        height 56px
        background url('./tel.png') no-repeat
        background-size 100% 100%
  .toJoin
    position absolute
    left 50%
    transform translate(-50%, 0)
    bottom 30px
    width 690px
    height 90px
    font-size 35px
    color rgb(255,255,255)
    border-radius 10px
    background-color rgb(36,67,122)
</style>
