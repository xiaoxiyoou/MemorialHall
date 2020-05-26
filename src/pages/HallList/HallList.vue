<template>
  <div class="container">
    <ul class="hallList" ref="hallList">
      <cube-scroll ref="scroll" :data="hallList" :options="options">
        <li class="item row a-c j-b" v-for="item in hallList" :key="item.MemorialId" @click="toHall(item.MemorialId)">
          <span class="title">{{item.MemorialName}}</span>
          <span class="toBtn">进入纪念堂</span>
        </li>
        <img class="noDataImg" v-if="showImg" src="./jiniantang.png" alt="">
        <div class="bar"></div>
      </cube-scroll>
    </ul>
    <div class="setupHall" @click="setupHall">创建纪念堂</div>
    <div class="barTwo"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getHallList } from 'api/index'

export default {
  data() {
    return {
      options: {
        probeType: 3,
        click: true
      },
      pageIndex: 1,
      pageSize: 1000,
      hallList: [],
      showImg: false
    }
  },
  mounted() {
    this._getHallList()
    this.computedHeight()
    window.addEventListener('resize', () => {
      this.computedHeight()
    })
  },
  methods: {
    computedHeight() {
      let awaitTimer = setTimeout(() => {
        clearTimeout(awaitTimer)
        this.$refs.hallList.style.height = document.documentElement.clientHeight - '198px'
      }, 10)
    },
    _getHallList() {
      getHallList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.hallList = res.data
        } else {
          this.showImg = true
        }
      })
    },
    setupHall() {
      this.$router.push({
        path: './sethall'
      })
    },
    toHall(id) {
      this.$router.push({
        path: './hall',
        query: {
          id
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
  width 100%
  height 100%
  background-color #ffffff
  .hallList
    width 100%
    height 100%
    .item
      width 100%
      height 130px
      padding 0 30px
      // background-color rgb(224, 224, 224)
      border-bottom 1px solid #f2f2f5
      .title
        width 70%
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        font-size 40px
        color rgb(68, 68, 68)
      .toBtn
        font-size 35px
        color rgb(68, 68, 68)
    .bar
      height 200px
      width 100%
      // background-color #e0e0e0
  .noDataImg
    width 100%
    height 100%
  .setupHall
    position fixed
    bottom 30px
    left 30px
    width 690px
    height 90px
    line-height 90px
    text-align center
    background-color rgb(36, 67, 122)
    font-size 35px
    color #ffffff
    border-radius 10px
    z-index 1
  .barTwo
    width 100%
    height 30px
    position fixed
    bottom 0
    background-color #ffffff
    z-index 1
</style>
