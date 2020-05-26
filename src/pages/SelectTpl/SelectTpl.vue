<template>
  <div class="container">
    <ly-tab v-if="this.items.length>0" v-model="selectedId" :items="items" :options="options" @change="switchItem"></ly-tab>
    <div class="tplList clear-fix">
      <cube-scroll>
        <div class="list row f-w">
          <div class="item col a-c" v-for="item in tplList" :key="item.TemplateId" @click="toSelectTpl(item.TemplateId)">
            <img :src="item.TemplateImg" alt="">
            <span>{{item.TemplateName}}</span>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getTplRecommend,getTplList,confirmTpl } from 'api/index'
export default {
  data() {
    return {
      selectedId: 0, // 默认选中分类
      items:[], // 分类数组列表
      options: { // lytab 参数
        activeColor: 'rgb(36,67,122)',
        labelKey: 'MemorialTemplateTitle'
      }, 
      pageSize: 100,
      pageIndex: 1,
      tplList: [], // 模板列表
      memorialId: void 0 // 纪念堂ID
    }
  },
  mounted(){
    this.memorialId = this.$route.query.id
    this._getTplRecommend()
  },
  methods: {
    // 切换顶部分类
    switchItem(item){
      console.log(item)
      this.$refs.scroll.scrollTo(0, 0, 200)
      this.$refs.scroll.refresh()
      this._getTplList(item.MemorialTemplateCateId,this.pageSize,this.pageIndex)
    },
    // 确认模板
    toSelectTpl(memorialTplId){
      confirmTpl({
        memorialId: this.memorialId,
        memorialTplId 
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.$router.go(-1)
        }
      })
    },
    // 默认获取分类以及分类第一个数据
    _getTplRecommend(){
      getTplRecommend().then(res=>{
        console.log(res)
        this.$nextTick(()=>{
          this.items = res.data
          this._getTplList(0,this.pageSize,this.pageIndex)
        })
      })
    },
    _getTplList(cateId,pageSize,pageIndex){
      getTplList({
        cateId,
        pageSize,
        pageIndex,
        memorialId: this.memorialId
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          this.tplList = res.data
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
  .loading
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    z-index 1000
  .tplList
    width 100%
    height 94%
    padding 30px
    .list
      .item
        width 215px
        height 317px
        margin-bottom 34px
        margin-right 15px
        img
          display block
          flex-shrink 0
          width 215px
          height 270px
        span
          margin-top 18px
          font-size 30px
          color rgb(68,68,68)
</style>
