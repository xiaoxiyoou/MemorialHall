<template>
  <div class="container">
    <div class="btnList col">
      <button class="goIn" @click="toHallList">进入纪念堂</button>
      <button class="setUp" @click="setHall">创建纪念堂</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  methods: {
    toHallList(){
      this.$router.push({
        path:'./halllist'
      })
    },
    setHall(){
      this.$router.push({
        path:'./sethall'
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
  background url('./xszs_02.jpg') no-repeat
  background-size cover
  .btnList
    position fixed
    bottom 30px
    left 30px
    right 30px
    .goIn,.setUp
      width 690px
      height 90px
      line-height 90px
      text-align center
      font-size 35px
      color #ffffff
      background-color rgb(36,67,122)
      border-radius 10px
      margin-top 20px
</style>
