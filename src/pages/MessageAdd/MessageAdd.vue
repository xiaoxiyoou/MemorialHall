<template>
  <div class="container">
    <div class="content col a-c">
      <textarea
        class="textarea"
        placeholder="请输入您想说的..."
        v-model="msg"
      ></textarea>
      <div class="tip">尊重逝者，请谨慎留言。</div>
      <div class="btm row j-c a-c" @click="confirmBtm">确定</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { addMemorialMsg } from 'api/index'
export default {
  data() {
    return {
      msg:''
    }
  },
  methods: {
    // 点击确定
    confirmBtm(){
      if(this.msg){
        addMemorialMsg({
          memorialId: this.$route.query.id,
          msgbody: this.msg
        }).then(res=>{
          console.log(res)
          if(res.code === 0){
            this.$createToast({
              type: 'warn',
              txt: '留言成功',
              time: 200,
              onTimeout: () => {
                this.$router.go(-1)
              }
            }).show()
          }
        })
      }else{
        this.$createToast({
          type: 'warn',
          txt: '请输入留言内容',
          time: 1000
        }).show()
        return false
      }
    }

  },
  components: {
  },
  mounted: function () {

  }
}
</script>

<style scoped lang="stylus">
.textarea
  width 690px
  height 372px
  background #f6f6f6
  font-size 30px
  border-radius 10px
  margin-top 33px
  padding 33px
  font-family SourceHanSansSC-Regular
.container
  position absolute
  height 100%
  width 100%
  background-color #ffffff
  top 0px
  .content
    .tip
        color #24437a
        margin-top 27px
        width 690px
    .btm
        width 690px
        height 90px
        background #24437a
        border-radius 10px
        color #ffffff
        margin-top 78px
        font-size 35px
</style>
