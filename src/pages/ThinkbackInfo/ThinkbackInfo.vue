<template>
  <div class="container col a-c">
    <p class="title">温馨提示：为去世的亲人创建追思卡并发送给他人，对方点击后可进行在线追思。</p>
    <P class="conTltle">追思卡内容</P>
    <textarea class="neContentText" placeholder="请输入您想说的..." v-model="msg"></textarea>
    <div class="tip" @click="changeMsg">逝者生平：不知道怎么写？戳我看看怎么写吧！</div>
    <div class="btm row j-c a-c" @click="sendBtm">发送给好友</div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getThinkBackInfo,addThinkBackInfo } from 'api/index'
export default {
  data() {
    return {
      msg: '母亲的一生，可以说是艰辛备至，劳苦功高，是经历坎坷、饱经风霜的一生；是勤劳简朴的一生；是平凡无奇、朴实无华的一生；是善良贤明、通情达理坷、饱经风霜的一生；是勤劳简朴的一生；是平凡无奇、朴实无华的一生；是善良贤明、通情达理坷、饱经风霜的一生；是勤劳简朴的一生；是平凡无奇、朴实无华的一生；是善良贤明、通情达理坷、饱经风霜的一生；是勤劳简朴的一生；是平凡无奇、朴实无华的一生；是善良贤明、通情达理黄飞鸿的康师傅接口是否回家看杀菌灯付款后卡萨回复接口是否结尾',
      msgDetale: ['1改变testarea中的值', '2再次改变', '3后方可的说法接口的', '4粉红色刻录机开发第三款']
    }
  },
  mounted(){
    this._getThinkBackInfo()
  },
  methods: {
    _getThinkBackInfo(){
      getThinkBackInfo({
        memorialId: this.$route.query.id
      }).then(res=>{
        console.log(res)
        if(res.code === 1){
          return false
        }else{
          this.msg = res.data.MemorialCardMain
        }
      })
    },
    //   改变文本框内容
    changeMsg() {
      var msgindex = Math.floor(Math.random() * this.msgDetale.length)
      this.msg = this.msgDetale[msgindex]
    },
    // 点击发送给好友
    sendBtm() {
      if (this.msg) {
        addThinkBackInfo({
          MemorialCardMain: this.msg,
          MemorialId: this.$route.query.id
        }).then(res=>{
          console.log(res)
          if(res.code === 0){
            this.$router.go(-1)
          }
        })
      } else {
        this.$createToast({
          txt:'请填写追思信息'
        })
      }
    }
  },
  components: {
  }
}
</script>

<style scoped lang="stylus">
.container
  position absolute
  height 100%
  width 100%
  background-color #ffffff
  top 0px
  .title
    width 690px
    color #f76708
    font-size 30px
    line-height 47px
    margin-top 42px
  .conTltle
    color #333333
    font-weight 700
    font-size 35px
    width 680px
    margin-top 50px
.neContentText
  margin-top 26px
  padding 33px
  text-align justify
  width 690px
  height 372px
  background #f6f6f6
  font-size 30px
  border-radius 10px
  font-family SourceHanSansSC-Regular
  line-height 45px
.tip
  color #24437a
  margin-top 35px
  width 690px
.btm
  position fixed
  top 738px
  width 690px
  height 90px
  background #24437a
  border-radius 10px
  color #ffffff
  font-size 35px
</style>
