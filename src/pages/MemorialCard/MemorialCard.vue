<template>
  <div class="container">
    <div class="top-con"  ref="imageWrapper">
      <img class="bgImg" :src="bgSrc" alt=""/>
      <div class="qrCodeCon col j-c a-c">
        <img class="qrCode" :src="qrCode" alt="">
      </div>
    </div>
    <div class="desc" >
      *长按图片发送给朋友
    </div>
    <img v-if="completeStatus" class="lastImg" :src="imgUrl" alt="" />
    <div class="img-list">
      <cube-scroll ref="scroll"  direction="horizontal">
        <div class="item" :class="{on: item.active}" v-for="(item,index) in cardList" :key="item.id" @click="switchItem(item.ShareCardTplId,index)">
          <img :src="item.ShareCardTplSmallImg" alt="" />
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getCardList,cardDetail,getQrcode } from 'api/index'
import html2canvas from 'html2canvas'

export default {
  data() {
    return {
      cardList:[],
      completeStatus: false,
      imgUrl: '',
      cardObj: Object,
      bgSrc: '',
      qrCode: '',
      isClick: true
    }
  },
  mounted() {
    this._getCardList()
    this._getQrcode()
  },
  methods: {
    _getCardList(){
      getCardList().then(res=>{
        console.log(res)
        this._cardDetail(res.data[0].ShareCardTplId)
        if(res.code === 0){
          this.cardList = res.data
          this.cardList.forEach((item,index)=>{
            item['active'] = false
          })
          this.cardList[0].active = true
        }
      })
    },
    _getQrcode(){
      getQrcode({
        memorialId: this.$route.query.id
      }).then(res=>{
        console.log(res)
        this.qrCode = res
      })
    },
    _cardDetail(tplId){
      this.$createToast({
        type: 'loading',
        txt: '邀请卡生成中',
        time: 0
      }).show()
      cardDetail({
        tplId,
        memorialId: this.$route.query.id
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.bgSrc = res.data.ShareCardTplImg
          let awaiter =  setTimeout(()=>{
            clearTimeout(awaiter)
            this.createImg()
          },1000)
        }
      })
    },
    // 生成canvas图片
    createImg(){
      html2canvas(this.$refs.imageWrapper,{
        backgroundColor: null,
        useCORS: true, // （图片跨域相关）
        allowTaint: true // 允许跨域（图片跨域相关）
      }).then(canvas => {
        this.imgUrl = canvas.toDataURL('image/png');
        console.log(this.imgUrl)
        this.$nextTick(()=>{
          this.completeStatus = true
          this.isClick = true
          this.$createToast({
            type: 'loading',
            time: 0
          }).hide()
        })
      });
    },
    switchItem(tplId,index){
      if(this.isClick){
        this.isClick = false
        this.cardList.forEach((item,index)=>{
          item.active = false
        })
        this.cardList[index].active = true
        this._cardDetail(tplId)
      }
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
>>>.cube-scroll-content
    display: inline-block
.container
  position absolute
  top 0px
  width 100%
  height 100%
  background-color #ffffff
  .top-con
    position absolute
    top 20px
    left 62px
    right 62px
    width 626px
    height 834px
    .bgImg
      width 626px
      height 834px
    .qrCodeCon
      position absolute
      border 1px solid #f5f5f5
      left 50%
      transform translateX(-50%)
      background-color #ffffff
      width 215px
      height 215px
      bottom 40px
      .qrCode    
        width 96%
        height 96%    
  .desc
    position absolute
    bottom 200px
    color rgb(119,119,119)
    width 100%
    text-align center
  .lastImg
    position absolute
    top 20px
    left 50%
    margin-left -313px
    width 626px
    height 834px
    z-index 99
  .img-list
    position: fixed;
    bottom: 0;
    width: 100%;
    height 190px
    line-height 190px
    padding: 0 26px;
    border-top 1px solid rgba(0,0,0,.3)
    box-shadow: 0 1px 3px rgba(50,6,105,04);
    white-space nowrap
    .item
      display inline-block
      width: 126px;
      height: 150px;
      vertical-align middle
      border: 1px solid rgb(226,226,226);
      margin-right: 20px;
      z-index: 99;
      position relative
    .item>img
      position absolute
      margin-left 50%
      margin-top 60%
      transform translate(-50%,-50%)
      width: 90px;
      height: 120px;
      z-index: 20;
    .on
      background: url('./hover.png') no-repeat right top;
      background-size: 30px 30px;
      border: 1px solid rgb(134,78,206);
</style>
