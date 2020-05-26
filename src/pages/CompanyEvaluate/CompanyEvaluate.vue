<template>
  <div class="container">
    <div class="top border-bottom-1px">
      <p class="title">评分及评论</p>
      <div class="grade row a-c">
        <span class="name">商家评分 ：</span>
        <Star class="topStar" :grade="grade"/>
      </div>
      <div class="desc row a-c j-b">
        <span class="name">满分<i class="number">5</i>分</span>
        <span class="discussNum">{{count}}</span>  
      </div>
    </div>
    <ul class="evaluateList">
      <cube-scroll ref="scroll" :options="options">
        <li class="item row" v-for="(item,index) in evalist" :key="index">
            <img class="avatar" :src="item.HeadImgUrl" alt="">
            <div class="context clear-fix">
              <div class="contextTop clear-fix">
                <div class="leftCon col j-b">
                  <p class="name">{{item.NickName}}</p>
                  <p class="time">{{item.CreateDate}}</p>
                </div>
                <div class="rightCon row a-c">
                  <span class="name">打分</span>
                  <Star :grade="item.CompanyCommentScore" />
                </div>
              </div>
              <p class="contextBtm">
                {{item.CompanyComment}}
              </p>
            </div>
        </li>
      </cube-scroll>
    </ul>
    <button class="toEvaluate row a-c j-c" @click="toEvaluate">
      <img class="msgIcon" src="./msg.png" alt="">
      <span>我也说两句...</span>
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from 'components/Star/Star.vue'
import { getCompanyEvaList } from  'api/index'

export default {
  data() {
    return {
      grade: 0,
      options:{
        probeType :3,
        click: true
      },
      evalist: [],
      count: ''
    }
  },
  mounted(){
    this._getCompanyEvaList()
  },
  methods:{
    _getCompanyEvaList(){
      getCompanyEvaList({
        id: this.$route.query.id,
        PageSize: 10,
        PageIndex: 1
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.grade = Number(res.data.MsgAvgage)
          this.evalist = res.data.MsgLIist
          this.count = res.count
        }
      })
    },
    toEvaluate(){
      this.$router.push({
        path:'./evaluate',
        query:{
          from: '0',
          name: this.$route.query.name,
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
>>> .topStar .star
      width 60px
>>> .topStar .text
      font-size 44px
.container
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  padding-top 296px
  margin-bottom 100px
  display flex 
  flex-direction column
  .top
    position absolute 
    top 0 
    width 100%
    height 296px
    background-color #ffffff
    padding 30px
    .title
      font-size 40px
      color rgb(68,68,68)
      margin-bottom 60px
    .grade
      margin-left 10px
      .name
        font-size 35px
        color rgb(102,102,102)
    .desc
      margin-top 50px
      .name
        font-size 31px
        color rgb(102,102,102)
        .number
          color rgb(255,162,0)
          font-style normal
      .discussNum
        font-size 31px
        color rgb(36,67,122)
  .evaluateList
    width 100%
    height 90%
    .item 
      width 100%
      padding 30px
      background-color #ffffff
      margin-bottom 20px
      .avatar
        width 100px
        height 100px
        border-radius 50%
        flex-shrink: 0
      .context
        width 100%
        margin-left 24px
        margin-top 10px
        .contextTop
          .leftCon
            float left
            height 80px
            margin-left 24px
            .name
              font-size 32px
              color rgb(51,51,51)
            .time
              font-size 26px
              color rgb(119,119,119)
          .rightCon
            float right
            .name
              font-size 28px
              color rgb(85,85,85)
              margin-right 16px
        .contextBtm
          display block
          margin-left 25px
          margin-top 38px
          font-size 29px
          color rgb(51,51,51)
          line-height 40px
          text-align justify
  .toEvaluate
    position fixed
    bottom 0px
    width 100%
    height 100px
    background-color rgb(36,67,122)
    font-size 36px
    color #ffffff
    .msgIcon
      width 34px
      margin-right 14px
// @media screen and (max-width: 320px) 
//   .evaluateList
//     height 800px!important
// @media screen and (max-width: 375px) and (min-width:321px)
//   .evaluateList
//     height 880px!important
// @media screen and (max-width: 414px) and (min-width: 376px)
//   .evaluateList
//     height 900px!important
// @media screen and (min-height:812px)
//   .evaluateList
//     height 1000px!important
</style>
