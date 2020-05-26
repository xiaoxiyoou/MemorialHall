<template>
  <div class="container" ref="container">
    <div class="title">{{result.ContentTitle}}</div>
    <div class="date">{{result.AddDate}}</div>
    <div class="content">
      <!-- <cube-scroll :options="options" ref="scroll"> -->
      <div v-html="ContentItemmain"></div>
      <!-- </cube-scroll> -->
    </div>
    <div class="btm row a-c j-b">
      <div class="btm-item" :class="{ btmItemHover:prevContentId }" @click="prevContent">
        <img class="btm-img-left" :src='prevContentId ? hoverLeftImg:leftImg' alt="">
        <p class="btm-prev">上一篇</p>
      </div>
      <div class="btm-item" :class="{ btmItemHover:nextContentId }" @click="nextContent">
        <p class="btm-text">下一篇</p>
        <img class="btm-img-riht" :src='nextContentId ? hovertightImg:rightImg' alt="">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { artcleContent, artcleDetail } from 'api/index'
export default {
  data() {
    return {
      contentId: '',
      PageIndex: 1,
      PageSize: 1,
      hoverLeftImg: require('./leftHover.png'),
      leftImg: require('./left.png'),
      hovertightImg: require('./rightHover.png'),
      rightImg: require('./right.png'),
      nextContentId: 0,
      prevContentId: 0,
      ContentItemmain: '',
      options: {
        probeType: 3,
        click: false
      },
      result: []
    }
  },
  components: {

  },
  mounted() {
    this.contentId = this.$route.query.contentId
    console.log(this.contentId)
    this.artcleContent(this.contentId, this.PageSize, this.PageIndex)
    this.artcleDetail(this.contentId)
  },
  methods: {
    // 文章内容
    artcleContent(contentId, PageSize, PageIndex) {
      artcleContent({
        contentId,
        PageSize,
        PageIndex
      }).then(res => {
        console.log('文章内容', res)
        let code = res.code
        if (code === 0) {
          this.ContentItemmain = res.data[0].ContentItemmain
        }
      })
    },
    // 文章标题及相关
    artcleDetail(contentId) {
      artcleDetail({
        contentId
      }).then(res => {
        console.log('文章标题及相关', res)
        let code = res.code
        if (code === 0) {
          this.result = res.data
          this.nextContentId = res.data.nextContentId
          this.prevContentId = res.data.prevContentId
        }
      })
    },
    // 切换下一篇
    nextContent() {
      console.log(this.nextContentId)
      if (this.nextContentId) {
        this.artcleContent(this.nextContentId, this.PageSize, this.PageIndex)
        this.artcleDetail(this.nextContentId)
        this.$refs.container.scrollTop = 0;
      } else {
        alert('没有更多内容')
      }
    },
    // 切换上一篇
    prevContent() {
      if (this.prevContentId) {
        this.artcleDetail(this.prevContentId)
        this.artcleContent(this.prevContentId, this.PageSize, this.PageIndex)
        this.$refs.container.scrollTop = 0;
      } else {
        alert('没有更多内容')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.container
  position absolute
  top 0px
  width 100%
  height 100%
  padding 30px
  background #ffffff
  overflow-y scroll
  z-index 2
  .title
    font-size 36px
    line-height 50px
    letter-spacing 3px
  .date
    font-size 30px
    margin-top 27px
    color #777777
  .content
    width 100%
    padding-bottom 160px
    line-height 50px
    margin-top 40px
    text-align justify
    font-size 30px
  .btm
    width 100%
    padding 0 30px
    left 0
    padding-top 20px
    background #ffffff
    z-index 20
    position fixed
    padding-bottom 50px
    bottom 0
    .btm-item
      display flex
      flex-direction row
      width 330px
      height 80px
      justify-content center
      align-items center
      background #f2f2f2
      border-radius 8px
      font-size 35px
      .btm-img-left
        width 42px
        height 42px
        margin-right 10px
      .btm-img-riht
        width 42px
        height 42px
        margin-left 10px
    .btmItemHover
      color #ffffff
      background #24437a
</style>
