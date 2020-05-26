<template>
  <div class="mask-container" @click="closeClassifyList">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  methods:{
    closeClassifyList(){
      this.$emit('closeClassifyList')
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.mask-container
  position absolute
  top 0px
  left 0px 
  width 100%
  height 100%
  background-color rgba(0,0,0,.5)
</style>
