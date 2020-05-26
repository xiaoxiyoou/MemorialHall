<template>
  <div class="container col a-c">
    <div class="title-con col a-c">
      <div class="search">
        <form action="javascript:return true" @submit.prevent="formSubmit">
          <input
            type="search"
            v-model="inputvalue"
            @keydown="searchTo($event, inputvalue)"
            class="search-input"
            placeholder="请输入要搜索的内容"
          />
        </form>
        <img
          class="search-icon"
          @click="search(inputvalue)"
          src="./search.png"
        />
      </div>
      <div class="scroll-list">
        <cube-scroll
          ref="nextscroll"
          :data="title"
          direction="horizontal"
        >
          <div class="nav">
            <div
              class="item"
              :class="{ itemHover: changeRed == -1 }"
              @click="change(-1, 0)"
            >
              最新资讯
            </div>
            <div
              class="item"
              v-for="(item, index) in title"
              :class="{ itemHover: changeRed == index }"
              @click="change(index, item.ContentCateId)"
              :key="index"
            >
              {{ item.ContentCateName }}
            </div>
          </div>
        </cube-scroll>
      </div>
    </div>
    <div class="infoList" ref="infoList">
      <cube-scroll
        ref="scroll"
        :data="result"
        :options="options"
        @pulling-up="onPullingUp"
      >
        <div
          class="info"
          @click="toInfoDetail(item.ContentId)"
          v-for="(item, index) in result"
          :key="index"
        >
          <div class="info-title">{{ item.ContentTitle }}</div>
          <div class="info-date">{{ item.AddDate }}</div>
        </div>
      </cube-scroll>
    </div>
    <img v-if="noText" class="no-text" src="./no-text.png" />
  </div>
</template>

<script type="text/ecmascript-6">
import { getNewslist, cateList } from 'api/index'
export default {
  data() {
    return {
      searchCateId: 0,
      noText: false,
      title: [],
      changeRed: -1,
      inputvalue: '',
      page: 1,
      PageSize: 10,
      PageIndex:1,
      timers: null,
      totalPages: 3,
      result: [],
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
      ContentCateId: 4,
      scrollflag: false
    }
  },
  mounted() {
    this.getCateList(4)
    this.computedHeight()
    window.addEventListener('resize', ()=>{
      this.computedHeight()
    })
  },
  methods: {
    computedHeight(){
      let awaitTimer = setTimeout(()=>{
        clearTimeout(awaitTimer)
        this.$refs.infoList.style.height = document.documentElement.clientHeight - '198px'
      },10)
    },
    onPullingUp(){
      this.PageIndex++
      if (this.PageIndex <= this.pageCount) {
        console.log(this.PageIndex)
        this.getDatelist(this.PageSize, this.PageIndex, this.ContentCateId, '')
      }else{
        this.$refs.scroll.forceUpdate();
        alert('1')
      }
    },
    // 阻止默认事件
    formSubmit() {
      return false;
    },
    // 跳转详情
    toInfoDetail(ContentId) {
      this.$router.push({
        path: './infodetail',
        query: {
          contentId: ContentId
        }
      })
    },
    // 顶部切换
    change(index, ContentCateId) {
      this.ContentCateId = ContentCateId
      this.scrollflag = true

      this.changeRed = index;
      this.result = []
      this.page = 1
      this.PageIndex = 1
      this.getDatelist(this.PageSize, this.PageIndex, ContentCateId, '')
      this.$refs.scroll.scrollTo(0, 0, 200)
      this.$refs.scroll.refresh()
    },
    // 点击手机搜索键
    searchTo(event, inputvalue) {
      if (event.keyCode === 13) {
        if (inputvalue) {
          this.PageIndex = 1
          this.getDatelist(this.PageSize, this.PageIndex, this.searchCateId, inputvalue)
          this.changeRed = -1
        } else {
          this.$createToast({
            txt:'请输入搜索内容',
            type: 'warn',
            time: 1000
          }).show()
        }
      }
    },
    // 点击搜索按钮
    search(inputvalue) {
      if (inputvalue) {
        this.PageIndex = 1
        this.getDatelist(this.PageSize, this.PageIndex, this.searchCateId, inputvalue)
        this.changeRed = -1
      } else {
          this.$createToast({
            txt:'请输入搜索内容',
            type: 'warn',
            time: 1000
          }).show()
      }
    },
    // 文章列表
    getDatelist(PageSize, PageIndex, cateId, contentName) {
      getNewslist({
        PageSize,
        PageIndex,
        cateId,
        contentName
      }).then(res => {
        console.log('文章列表',res)
        if(res.code === 0){
            this.pageCount = Math.ceil(res.count / 10)
            console.log('pageCount', this.pageCount)
            this.noText = false
            this.result = this.result.concat(res.data)
            this.$refs.scroll.refresh()
        }else {
          console.log('暂无更多数据')
          this.noText = true
          // this.$refs.scroll.forceUpdate();
        }
      })
    },
    // 列表导航
    getCateList(topSize) {
      cateList({
        topSize
      }).then(res => {
        let code = res.code
        console.log('新闻标题', res)
        if (code === 0) {
          this.title = res.data
          this.getDatelist(this.PageSize,this.PageIndex, 0, '')
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
>>>.cube-pullup-wrapper .before-trigger
    padding 0
input, textarea, select, a:focus
  outline none
// 去掉默认input叉号
input::-webkit-search-cancel-button
  display none
.container
  position absolute
  top 0
  width 100%
  height 100%
  padding-top 198px
  .title-con
    position absolute
    top 0
    width 100%
    padding 0 30px
    z-index 1
    background #f5f5f5
    .search
      width 690px
      height 70px
      display flex
      flex-direction row
      align-items center
      background-color #ffffff
      padding 0 20px
      justify-content space-between
      font-size 30px
      margin-top 20px
      border-radius 10px
      box-sizing border-box
      .search-icon
        height 32px
        width 32px
        .search-input
          outline none
     .scroll-list
       width 690px
       >>> .cube-scroll-content
        display inline-block
        .nav
          white-space nowrap
          line-height 60px
          margin-top 20px
        .item
          height 78px
          width 160px
          border-radius 10px
          background-color #ffffff
          text-align center
          display flex
          justify-content center
          align-items center
          line-height 78px
          // 新增
          display inline-block
          margin-right 30px
          &.itemHover
            color #ffffff
            background-color #24437a
      width 690px
      display flex
      flex-direction row
      justify-content space-between
      margin-top 20px
      .item
        height 68px
        width 160px
        border-radius 10px
        background-color #ffffff
        text-align center
        display flex
        justify-content center
        align-items center
        &.itemHover
          color #ffffff
          background-color #24437a
  .infoList
    width 100%
    height 100%
    padding 0 30px
    .info
      display flex
      flex-direction column
      justify-content space-between
      height 190px
      background #ffffff
      border-radius 10px
      margin-bottom 20px
      padding 23px 27px
      box-sizing border-box
      margin-top 10px
      .info-title
        line-height 50px
        font-size 32px
        overflow hidden
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
        text-overflow ellipsis
      .info-date
        color #777777
  .no-text
    position absolute
    top 300px
    width 100%
    height auto
    margin-top 50px
    z-index 999
</style>
