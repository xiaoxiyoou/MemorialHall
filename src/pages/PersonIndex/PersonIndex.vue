<template>
  <div class="container">
    <input
      class="searchInput"
      type="text"
      placeholder="输入要搜索的内容"
      @click="toSearch"
    />
    <ly-tab
      v-if="this.items.length > 0"
      v-model="selectedId"
      :items="items"
      :options="optionsTow"
      @change="switchItem"
    ></ly-tab>
    <ul class="personList" ref="personList">
      <cube-scroll
        ref="scroll"
        :options="options"
        :data="personList"
        @pulling-up="onPullingUp"
      >
        <li
          class="item"
          @click="toDetail(item.ResidentId)"
          v-for="(item, index) in personList"
          :key="index"
        >
          <img class="avatar" :src="item.ResidentImg" alt="" />
          <div class="itemDesc">
            <p class="name">{{ item.ResidentName }}</p>
            <p class="level">{{ item.ResidentQualification }}</p>
            <Star class="topStar" :grade="Number(item.msgavage)" />
          </div>
          <a class="tel" :href="'tel:' + item.ResidentTel" @click="prevent"></a>
        </li>
      </cube-scroll>
    </ul>
     <img v-if="noText" class="no-text" src="./no-text.png" />
  </div>
</template>

<script type="text/ecmascript-6">
import Star from 'components/Star/Star.vue'
import { getPersonList } from  'api/index'

export default {
  data() {
    return {
      scrollflag:false,
      flag:true,
      noTextflag:true,
      items: [
        { recomm: 0, certificate: 0, praise: 0, MemorialTemplateTitle: '全部' },
        { recomm: 1, certificate: 0, praise: 0, MemorialTemplateTitle: '推荐' },
        { recomm: 0, certificate: 0, praise: 1, MemorialTemplateTitle: '好评' },
        { recomm: 0, certificate: 1, praise: 0, MemorialTemplateTitle: '资质' }
      ], // 分类数组列表
      recomm: 0,
      certificate: 0,
      praise: 0,
      selectedId: 0, // 默认选中分类
      noText: false,
      optionsTow: { // lytab 参数
        activeColor: 'rgb(36,67,122)',
        labelKey: 'MemorialTemplateTitle'
      },
      userName: '',
      pageIndex: 1,
      pageSize: 10,
      personList: [],
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
      }
    }
  },
  mounted(){
    // this._getPersonList(this.userName,this.pageIndex,this.pageSize)
    this._getPersonList(this.userName, this.pageIndex, this.pageSize, this.recomm, this.certificate, this.praise)
    this.computedHeight()
    window.addEventListener('resize', ()=>{
      this.computedHeight()
    })
  },
  methods:{
    prevent(){
      event.stopPropagation()
    },
    computedHeight(){
      let awaitTimer = setTimeout(()=>{
        clearTimeout(awaitTimer)
        console.log(document.documentElement.clientHeight)
        this.$refs.personList.style.height = document.documentElement.clientHeight - '130px'
        console.log(this.$refs.personList.style.height)
      },10)
    },
    onPullingUp(){
      console.log('上拉')
      if(this.scrollflag){
        this.pageIndex = 1
      }else{
        this.pageIndex++
      }
      console.log(this.pageIndex)
      this._getPersonList(this.userName, this.pageIndex, this.pageSize, this.recomm, this.certificate, this.praise)
    },
    _getPersonList(userName,pageIndex,pageSize, recomm, certificate, praise){
      if(this.flag){
        this.flag = false
        getPersonList({
          userName,
          pageIndex,
          pageSize,
          recomm,
          certificate,
          praise
        }).then(res=>{
          console.log(res)
          var code = res.code
          if (code === 0) {
            this.noText = false
            this.noTextflag = false
            let pageCount = Math.ceil(res.count / 10)
            console.log('pageCount', pageCount)
            console.log('pageIndex', this.pageIndex)
            if (this.pageIndex <= pageCount) {
              if (this.pageIndex === 1) {
                this.personList = res.data
              } else {
                this.personList = this.personList.concat(res.data)
                this.$refs.scroll.refresh()
              }
            } else {
              console.log('暂无更多数据')
              this.$refs.scroll.refresh()
              this.$refs.scroll.forceUpdate();
            }
          }else if(code === 1){
            if(this.noTextflag){
              this.noText = true
            }
            this.$refs.scroll.refresh()
            this.$refs.scroll.forceUpdate();
          }
          this.flag = true
          this.scrollflag = false
        })
      }
    },
    toSearch(){
      this.$router.push({
        path:'./search',
        query:{
          from: '1'
        }
      })
    },
    toDetail(id){
      this.$router.push({
        path:'./persondetail',
        query:{
          id
        }
      })
    },
     // 切换顶部分类
    switchItem(item) {
      this.noTextflag = true
      this.flag = true
      this.scrollflag = true
      this.pageIndex = 1
      this.personList = []
      console.log('执行')
      this.recomm = item.recomm
      this.certificate = item.certificate
      this.praise = item.praise
      this.$refs.scroll.scrollTo(0, 0, 200)
      this.$refs.scroll.refresh()
      this._getPersonList(this.userName,this.pageIndex, this.pageSize, this.recomm, this.certificate, this.praise)
    }
  },
  components: {
    Star
  }
}
</script>

<style scoped lang="stylus">
>>>.ly-tabbar
  height 100px
  margin-bottom 30px
>>>.ly-tab-list
  width 690px
>>>.ly-tab-item
  width 160px
  font-size 30px
  color rgb(102, 102, 102)
>>> .topStar
      margin-top 18px
>>> .topStar .star
      width 22px
>>> .topStar .text
      font-size 20px
>>> .cube-scroll-list-wrapper
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content space-between
.container
  position absolute
  top 0
  width 100%
  height 100%
  padding 30px
  padding-top 130px
  padding-bottom 130px
  .searchInput
    position absolute
    top 30px
    left 50%
    transform translate(-50%)
    width 92%
    height 70px
    border-radius 10px
    padding-left 20px
    background url('./ss_03.png') no-repeat
    background-position 96% center
    background-size 32px 32px
    background-color rgba(0,0,0,.1)
  .personList
    width 100%
    height 100%
    .item
      display block
      width 48%
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
   .no-text
    width 700px
    height auto
    position absolute
    margin-top 50px
    top 50%
    transform: translate(0%,-50%);
</style>
