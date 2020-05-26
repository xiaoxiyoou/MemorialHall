<template>
  <div id="app">
    <transition
      :enter-active-class="enterTransition"
      :leave-active-class="leaveTransition">
      <router-view/>
   </transition>
   <!-- <cube-loading v-if="getLoading" class="loading" :size="40"></cube-loading> -->
   <div v-if="$route.meta.requireLoad">
    <SemipolarSpinner v-if="getLoading" class="loading" :animation-duration="2000" :size="40" color="#24437a" />
   </div>
  </div>
</template>

<script>
import { SemipolarSpinner } from 'epic-spinners'

export default {
  data(){
    return{
      enterTransition: 'animated fadeIn',
      leaveTransition: 'animated fadeOut'
    }
  },
  computed: {
    getLoading(){
      return this.$store.state.loadStatus
    }
  },
  watch: {
    '$route' (to, from) {
      let toDepth = to.meta.depth;
      let fromDepth = from.meta.depth;
      if (fromDepth > toDepth) {
        this.enterTransition = 'animated fadeInLeft';
        this.leaveTransition = 'animated fadeOutRight';
      } else if (fromDepth < toDepth) {
        this.enterTransition = 'animated fadeInRight';
        this.leaveTransition = 'animated fadeOutLeft';
      } else {
        this.enterTransition = 'animated fadeIn';
        this.leaveTransition = 'animated fadeOut';
      }
    }  
  },
  components: {
    SemipolarSpinner
  }
}
</script>

<style lang="stylus">
#app
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background-color #f5f5f5
  .loading
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    z-index 999
</style>
