<template>
  <div class="search-container" @click="toSearch">
    <div class="input">输入要搜索的内容</div>
    <img class="search-icon" src="./search-icon1.png" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  methods:{
    toSearch(){
      this.$emit('toSearch')
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
  .search-container
    position absolute
    top 20px  
    left 5%
    right 5%
    width 90%
    height 70px
    z-index 99
    .input 
      width 690px
      height 70px
      line-height 70px
      border-radius 10px
      padding-left 20px
      font-size 30px
      background-color rgba(255,255,255,.5)
      box-sizing border-box
      color: #ffffff
    .search-icon
      position absolute
      top 20px
      right 20px
      width 34px
</style>
