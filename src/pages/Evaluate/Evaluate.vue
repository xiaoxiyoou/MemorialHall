<template>
  <div class="container">
    <p  class="title">{{this.$route.query.name}}</p>
    <div class="grade row a-c">
      <span class="title">评分</span>
      <div class="starList row a-c">
        <img v-for="(item,index) in starList" 
          :src="item.showOne ? item.on : item.in" 
          alt="" :key="index" 
          @click="clickStar(index)"
        />
      </div>
    </div>
    <textarea class="text" v-model="notedata"></textarea>
    <button class="submit" @click="submit">提交</button>
  </div>
</template>

<script type="text/ecmascript-6">
import { sendPersonEva,sendCompanyEva } from  'api/index'

export default {
  data() {
    return {
      starList:[{
        in: require('./star-in.png'),
        on: require('./star-on.png'),
        showOne: false
      },
      {
        in: require('./star-in.png'),
        on: require('./star-on.png'),
        showOne: false
      },
      {
        in: require('./star-in.png'),
        on: require('./star-on.png'),
        showOne: false
      },
      {
        in: require('./star-in.png'),
        on: require('./star-on.png'),
        showOne: false
      },
      {
        in: require('./star-in.png'),
        on: require('./star-on.png'),
        showOne: false
      }],
      notedata: '',
      score: Number
    }
  },
  mounted(){

  },
  methods:{
    clickStar(index){
      console.log(index)
      let starList = JSON.parse(JSON.stringify(this.starList))
        if(index === 0){
          this.switchShow(0,starList)
        }else if(index === 1){
          this.switchShow(1,starList)
        }else if(index === 2){
          this.switchShow(2,starList)
        }else if(index === 3){
          this.switchShow(3,starList)
        }else if(index === 4){
          this.switchShow(4,starList)
        }
    },
    switchShow(index, starList){
      if(starList[index].showOne === false){
        for(var i = 0; i <= index; i++){
          starList[i].showOne = true
        }
      }else{
        for(var j = index; j < starList.length; j++){
          starList[j].showOne = false
        }
      }
      this.starList = starList
    },
    _sendCompanyEva(){
      sendCompanyEva({
        companyId: this.$route.query.id,
        score: this.score,
        msgcontent: this.notedata
      }).then(res=>{
        console.log(res)
        this.$router.go(-1)
      })
    },
    _sendPersonEva(){
      sendPersonEva({
        id: this.$route.query.id,
        msgscore: this.score,
        msgcontent: this.notedata
      }).then(res=>{
        console.log(res)
        this.$router.go(-1)
      })
    },
    submit(){
      const starList = JSON.parse(JSON.stringify(this.starList))
      let list = starList.filter((item,index) =>{
        return item.showOne === true
      })
      this.score = list.length
      console.log(this.score)
      
      if(!this.notedata){
        this.$createToast({
          time: 1000,
          txt: '请输入评价内容',
          type: 'warn'
        }).show()
        return false
      }else{
        if(this.$route.query.from === '0'){
          this._sendCompanyEva()
        }else{
          this._sendPersonEva()
          // http://192.168.8.150:8098/FuneralResident/AddResidentMsg?msgcontent=fd年后ccccddssdddd&id=1&msgscore=3
        }
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
  top 0
  width 100%
  height 100%
  padding 60px 30px 0
  background-color #ffffff
  .title
    font-size 39px
    color rgb(51,51,51)
  .grade
    width 100%
    height 64px
    margin-top 38px
    .title
      font-size 35px
      color rgb(68,68,68)
      margin-right 44px
    .starList
      img
        width 66px
        margin-right 18px
  .text
    width 690px
    height 240px
    padding 20px
    margin-top 36px
    font-size 30px
    color rgb(51,51,51)
    background-color rgb(247,247,247)
    border-radius 10px
  .submit
    width 690px
    height 90px
    line-height 90px
    margin 0 auto
    margin-top 30px
    font-size 35px
    color #ffffff
    border-radius 10px
    text-align center
    background-color rgb(36,67,122)
</style>
