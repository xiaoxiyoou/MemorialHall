<template>
  <div class="container">
    <div class="topCon col" ref="topH">
      <div class="info col" v-for="(item, index) in userList" :key="index">
        <span class="name">{{item.DieUserName}}</span>
        <span class="time">{{item.DieUserBirthday}}-{{item.DieUserDate}}</span>
        <span class="address">{{item.DieUserSite}}</span>
      </div>
      <div class="btn" @click="toAddMsg">写留言</div>
    </div>
    <div class="messageList" ref="msgH">
      <cube-scroll :options="options" :data="msgList" ref="scroll" @pulling-up="onPullingUp">
        <div class="item row" v-for="item in msgList" :key="item.MemorialMsgId">
          <img :src="item.HeadImgUrl" alt="" class="avatar">
          <div class="info col">
            <span class="name">{{item.NickName}}</span>
            <span class="time">{{item.AddDate}}</span>
            <p class="context">
              {{item.MemorialMsgTitle}}
            </p>
          </div>
          <img v-if="item.IsMsgDel === 0" class="delete" src="./zs_03.png" alt="" @click="deleteItem(item.MemorialMsgId)">
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMsgList,delMemorialMsg } from 'api/index'
export default {
  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      msgList: [],
      userList: [],
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
      }
    }
  },
  mounted(){
    this._getMsgList()
    this.computedHeight()
      window.addEventListener('resize', ()=>{
        this.computedHeight()
      })
    },
  methods:{
    computedHeight(){
      let awaitTimer = setTimeout(()=>{
        clearTimeout(awaitTimer)
        this.$refs.msgH.style.height = document.documentElement.clientHeight - this.$refs.topH.style.offsetHeight + 'px'
      },10)
    },
    onPullingUp(){
      console.log('上拉')
      this.pageIndex++ 
      console.log(this.pageIndex)
      this._getMsgList(this.$route.query.id,this.pageSize,this.pageIndex)
    },
    toAddMsg(){
      this.$router.push({
        path: './messageadd',
        query: {
          id:  this.$route.query.id
        }
      })
    },
    _getMsgList(){
      getMsgList({
        memorialId: this.$route.query.id,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.userList = res.data.DieUserDataList
          this.msgList = res.data.MemorialMsgList
          let pageCount = Math.ceil(res.count / 10)
          console.log('pageCount', pageCount)
          if (this.pageIndex <= pageCount) {
            if (this.pageIndex === 1) {
              this.msgList = res.data.MemorialMsgList
            } else {
              this.msgList = this.msgList.concat(res.data.MemorialMsgList)
              this.$refs.scroll.refresh()
            }
          } else {
            console.log('暂无更多数据')
            this.$refs.scroll.forceUpdate();
          }
        }
      })
    },
    deleteItem(memorialMsgId){
      delMemorialMsg({
        memorialMsgId
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this._getMsgList()
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
      width 156px
      height 66px
      margin 20px 0
      margin-left 30px
      line-height 66px
      text-align center
      color #fff
      border-radius 10px
      background-color rgb(36,67,122)
  .messageList
    width 100%
    .item
      position relative
      padding 30px
      margin-top 20px
      background-color #fff
      .avatar
        display block
        width 105px
        height 105px
        border-radius 50%
        flex-shrink 0
      .info
        margin-left 24px
        padding 10px 0
        .name
          font-size 32px
          color rgb(51,51,51)
        .time
          margin-top 14px
          font-size 30px
          color rgb(153,153,153)
        .context
          margin-top 20px
          line-height 40px
          text-align justify
          font-size 30px
          color rgb(51,51,51)
          word-break:break-word;
      .delete
        position absolute
        right 30px 
        top 30px
        width 30px
</style>
