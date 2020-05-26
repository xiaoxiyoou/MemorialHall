<template>
  <div class="container">
    <div class="topCon col" ref="topH">
      <div class="info col " v-for="(item,index) in userList" :key="index" >
        <span class="name">{{item.DieUserName}}</span>
        <span class="time">{{item.DieUserBirthday}}-{{item.DieUserDate}}</span>
        <span class="address">{{item.DieUserSite}}</span>
      </div>
      <div class="btn" @click="toMsgAdd">写追思日记</div>
    </div>
        <div class="diaryList" ref="diaryH">
      <cube-scroll :options="options" :data="diaryList" ref="scroll" @pulling-up="onPullingUp">
          <div class="item" v-for="item in diaryList" :key="item.MemorialDiaryId">
            <p class="time">{{item.AddDate}}</p>
            <img class="delete" v-if="item.isDiaryDel === 0" src="./zs_03.png" alt="" @click="deleteItem(item.MemorialDiaryId)">
            <p class="content">
              {{item.MemorialDiaryBody}}
            </p>
          </div>
      </cube-scroll>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getDiaryList,deleteDiary } from 'api/index'
export default {
  data() {
    return {
      options: {
        probeType: 3,
        click: true,
        pullUpLoad: {
          threshold: 0,
          txt: {
            // more: '上拉加载更多',
            noMore: '没有更多数据'
          }
        }
      },
      pageSize: 10,
      pageIndex: 1,
      diaryList: [],
      userList: []
    }
  },
  mounted(){
    this._getDiaryList()
    this.computedHeight()
      window.addEventListener('resize', ()=>{
        this.computedHeight()
      })
    },
  methods:{
    computedHeight(){
      let awaitTimer = setTimeout(()=>{
        clearTimeout(awaitTimer)
        this.$refs.diaryH.style.height = document.documentElement.clientHeight - this.$refs.topH.offsetHeight + 'px'
      },10)
    },
    onPullingUp(){
      console.log('上拉')
      this.pageIndex++ 
      console.log(this.pageIndex)
      this._getDiaryList(this.$route.query.id,this.pageSize,this.pageIndex)
    },
    toMsgAdd(){
      this.$router.push({
        path:'./diaryadd',
        query:{
          id: this.$route.query.id
        }
      })
    },
    deleteItem(MemorialDiaryId){
      deleteDiary({
        MemorialDiaryId
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.$createToast({
            txt: '删除成功',
            type: 'correct',
            time: 200,
            onTimeout:()=>{
              this._getDiaryList()
            }
          }).show()
        }else{
          this.$createToast({
            txt: '删除失败',
            type: 'error',
            time: 200
          }).show()
        }
      })
    },
    _getDiaryList(){
      getDiaryList({
        memorialId: this.$route.query.id,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.userList = res.data.DieUserDataList
          this.diaryList = res.data.MemorialDiaryList
          let pageCount = Math.ceil(res.count / 10)
          console.log('pageCount', pageCount)
          if (this.pageIndex <= pageCount) {
            if (this.pageIndex === 1) {
              this.msgList = res.data
            } else {
              this.msgList = this.msgList.concat(res.data)
              this.$refs.scroll.refresh()
            }
          } else {
            console.log('暂无更多数据')
            this.$refs.scroll.forceUpdate();
          }
        }
      })
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
  left 0
  width 100%
  height 100%
  .topCon
    width 100%
    background-color #fff
    .desc
      position absolute
      right 40px
      bottom 54px
      font-size 30px
      color rgb(153,153,153)
    .info
      padding-top 20px
      margin-left 30px
      .name
        font-size 35px
        color rgb(68,68,68)
        margin-bottom 10px
      .time
        font-size 30px
        color rgb(119,119,119)
        margin-bottom 10px
      .address
        font-size 30px
        color rgb(119,119,119)
    .btn
      width 224px
      height 66px
      margin 20px 0
      margin-left 30px
      line-height 66px
      text-align center
      color #fff
      border-radius 10px
      background-color rgb(36,67,122)
  .diaryList
    width 100%
    // height 488px
    .item
      position relative
      padding 30px
      margin-top 20px
      background-color #fff
      .time
        font-size 30px
        color rgb(153,153,153)
      .delete
        position absolute
        right 30px 
        top 30px
        width 30px
      .content
        margin-top 24px
        line-height 40px
        text-align justify
        word-break:break-word;

</style>
