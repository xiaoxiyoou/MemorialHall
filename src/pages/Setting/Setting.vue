<template>
  <div class="container">
    <div class="topCon row j-a a-c">
      <div class="titleLeft  row j-a a-c" :class="{ titleHover: titleHover }" @click="setingBtn">设置</div>
      <div class="titleRight row j-a a-c" :class="{ titleHover: !titleHover }" @click="visitorBtn">访客记录</div>
    </div>
    <div class="itemCon" v-if="titleHover">
      <div class="item row j-b a-c">
        <div class="itemText">关闭亲友留言</div>
        <img class="itemSwitchImg" :src='SwitchValue === 1 ? openImg : closeImg' @click="Switch" />
      </div>
      <div class="item row j-b a-c" @click="toSelectMusic">
        <div class="itemText">背景音乐</div>
        <img class="itemImg" :src='moreImg' />
      </div>
      <div class="item row j-b a-c" @click="toSelectTpl">
        <div class="itemText">纪念堂模板</div>
        <img class="itemImg" :src='moreImg' />
      </div>
      <!-- <div class="item row j-b a-c" @click="toThinkBackInfo">
        <div class="itemText">追思信息</div>
        <img class="itemImg" :src='moreImg' />
      </div> -->
      <div class="item row j-b a-c" @click="toAmend">
        <div class="itemText">修改逝者信息</div>
        <img class="itemImg" :src='moreImg' />
      </div>
    </div>
    <div class="btm row j-c a-c" v-if="titleHover" @click="deleteBtn">删除纪念堂</div>
    <div class="visitorCon" v-if="!titleHover">
      <cube-scroll ref="scroll">
        <div class="visitorItem row a-c" v-for="(item, index) in viewUserList" :key="index">
          <img class="visitorImg" :src="item.HeadImgUrl">
          <div class="visitorGroup col j-b">
            <p class="visitorName">{{ item.NickName }}</p>
            <div class="visitorDetail row">
              <p class="visitordate">{{ item.AddDate }}</p>
              <p class="visitortext">访问了您</p>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getViewUserList,setMsgPermit,deleteHall } from 'api/index'

export default {
  data() {
    return {
      SwitchValue: 0,
      openImg: require('./img/open.png'),
      closeImg: require('./img/close.png'),
      moreImg: require('./img/right.png'),
      headImg: require('./img/headImg.jpg'),
      titleHover: true,
      result: [],
      pageSize: 10,
      pageIndex: 1
    }
  },
  mounted(){
    this._getViewUserList()
  },
  methods: {
    // to追思信息
    toThinkBackInfo(){
      this.$router.push({
        path: './thinkbackinfo',
        query: {
          id: this.$route.query.id
        }
      })
    },
    // 访客记录列表
    _getViewUserList(){
      getViewUserList({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        memorialId: this.$route.query.id
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.viewUserList = res.data
          this.SwitchValue = res.extenddata
        }
      })
    },
    // 亲友留言切换
    Switch() {
      if (this.SwitchValue === 0) {
        this.SwitchValue = 1
      } else {
        this.SwitchValue = 0
      }
      setMsgPermit({
        memorialId: this.$route.query.id,
        MsgPermit: this.SwitchValue
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.$createToast({
            type:'correct',
            txt: '设置成功',
            time: 1000
          }).show()
        }else{
          this.$createToast({
            type:'error',
            txt: '设置失败',
            time: 1000
          }).show()
        }
      })
    },
    // 点击访客记录
    visitorBtn() {
      this.titleHover = false
    },
    // 点击设置
    setingBtn() {
      this.titleHover = true
    },
    // 点击删除
    deleteBtn() {
      // alert('删除')
      deleteHall({
        memorialId:this.$route.query.id
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.$router.replace({
            path: './halllist'
          })
        }
      })
    },
    toSelectMusic(){
      this.$router.push({
        path: './selectmusic',
        query:{
          id:this.$route.query.id
        }
      })
    },
    toSelectTpl(){
      this.$router.push({
        path: './selecttpl',
        query:{
          id: this.$route.query.id
        }
      })
    },
    toAmend(){
      this.$router.push({
        path: './amendhallinfo',
        query:{
          id: this.$route.query.id
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
  height 100%
  width 100%
  background-color #ffffff
  padding-top 110px
  .topCon
    position absolute
    top 0
    width 100%
    height 110px
    padding 0 10px
    font-size 30px
    .titleLeft
      font-weight 700
      width 50%
      height 100%
      color #666666
    .titleRight
      font-weight 700
      width 50%
      height 100%
      color #666666
    .titleHover
      border-bottom 2px solid #24437a
      font-size 34px
      color #333333
  .itemCon
    color #555555
    font-size 30px
    .item
      padding 0 30px
      height 90px
      border-bottom 1px solid #eaeaea
      .itemSwitchImg
        width 90px
        height 45px
      .itemImg
        width 15px
        height 26px
  .btm
    position fixed
    bottom 34px
    width 690px
    height 90px
    color #ffffff
    background #e20000
    border-radius 10px
    left 50%
    transform translate(-50%, 0%)
    font-size 35px
  .visitorCon
    height 100%
    width 100%
    background-color #eaeaea
    padding-top 20px
    .visitorItem
      background-color #ffffff
      height 180px
      border-bottom 1px solid #f6f6f6
      padding 0 30px
      .visitorImg
        width 118px
        height 118px
        border-radius 50%
        flex-shrink 0
      .visitorGroup
        height 100px
        margin-left 30px
        .visitorName
          font-size 38px
          color #191919
          font-weight 700
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width 530px
        .visitorDetail
          color #888888
          font-size 30px
          .visitortime
            margin-left 20px
          .visitortext
            margin-left 10px
</style>
