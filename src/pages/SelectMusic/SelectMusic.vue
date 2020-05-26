<template>
  <div class="container">
    <ly-tab v-if="this.items.length>0" v-model="selectedId" :items="items" :options="options" @change="switchItem"></ly-tab>
    <div class="musicList">
      <cube-scroll>
        <div class="item row a-c j-b border-bottom-1px" v-for="item in musicList" :key="item.MemorialMusicId" >
          <span class="title">{{item.MemorialMusicName}}</span>
          <div class="row a-c">
            <img class="musicIcon" :src="item.musicStatus ? require('./xzyy_03.png') : require('./xzyy_07.png')" alt="" @click="selectItem(item)">
            <button class="confirm" @click="handleConfirm(item.MemorialMusicId)">选择</button>
          </div>
        </div>
      </cube-scroll>
      <audio ref="audio"></audio>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMusicRecommend,getMusicList,confirmMusic } from 'api/index'
export default {
  data() {
    return {
      selectedId: 0,
      items:[],
      options: {
        activeColor: 'rgb(36,67,122)',
        labelKey: 'MemorialMusicCateName'
      },
      pageIndex: 1,
      pageSize: 100,
      musicList: [],
      musicStatus: false,
      memorialId: void 0
    }
  },
  mounted(){
    this.memorialId = this.$route.query.id
    this._getMusicRecommend()
  },
  methods: {
    // 选择音乐
    handleConfirm(memorialMusicId){
      confirmMusic({
        memorialId: this.memorialId,
        memorialMusicId
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.$router.go(-1)
        }
      })
    },
    // 顶部音乐分类切换
    switchItem(item,index){
      console.log(item)
      this._getMusicList(item.MemorialMusicCateId,this.pageIndex,this.pageSize)
    },
    // 选择播放音乐
    selectItem(item){
      console.log(item)
      if(!item.musicStatus){
        this.musicList.forEach((ele,index)=>{
          ele.musicStatus = false
        })
        item.musicStatus = true
        this.$refs.audio.src = `http://sanhe.made.fg1413.com${item.MemorialMusicLink}`
				this.$refs.audio.load()
        this.$refs.audio.play()
      }else{
        item.musicStatus = false
				this.$refs.audio.pause()
      }
    },
    _getMusicRecommend(){
      getMusicRecommend().then(res=>{
        console.log(res)
        if(res.code === 0){
          this.$nextTick(()=>{
            this.items = res.data
            this._getMusicList(0,this.pageIndex,this.pageSize)
          })
        }
      })
    },
    _getMusicList(cateId,pageIndex,pageSize){
      getMusicList({
        cateId,
        pageIndex,
        pageSize
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          let musicList = res.data
          musicList.forEach((item,index)=>{
            item.musicStatus = false
          })
          console.log(musicList)
          this.musicList = musicList
        }
      })
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
>>>.ly-tabbar
    height 112px
>>>.ly-tab-item
    width 184px
    font-size 30px
    color rgb(102,102,102)
.container
  position absolute
  top 0px
  width 100%
  height 100%
  background-color #fff
  .musicList
    width 100%
    height 90%
    .item
      width 100%
      height 116px
      padding 30px
      .title
        font-size 31px
        color rgb(85,85,85)
      .musicIcon
        width 41px
        margin-right 30px
      .confirm
        width 100px
        height 48px
        line-height 48px
        color #fff
        background-color rgb(36,67,122)
        border-radius 14px
        font-size 32px
</style>
