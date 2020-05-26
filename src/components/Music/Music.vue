<template>
  <div class="page">
    <div class="music-wrapper">
      <img ref="musicImg" class="music Rotation" src="./music.png" alt="" @click="switchPlay">
      <audio id="audio" ref="audio" src="http://sanhe.made.fg1413.com/UpLoadImg/UpLoadPic//2019/2019-11-16/bg2.mp3" controls  autoplay="autoplay" hidden="true"></audio>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
		musicStatus: false
    }
	},
	props:{
		musicSrc:{
			type: String,
			default: ''
		}
	},
	mounted(){
		this.$nextTick(()=>{
			this.automation();
		})
  },
	methods:{
		automation(){
			document.addEventListener('DOMContentLoaded',  ()=> {
				document.addEventListener('WeixinJSBridgeReady', ()=> {
					this.$nextTick(()=>{
						console.log(this.musicSrc)
						this.musicStatus = true
						this.$refs.audio.src = this.musicSrc
						this.$refs.audio.load()
						this.$refs.audio.play()
					})
				}, false)
			})
		},
		switchPlay(){
			if(!this.musicStatus){
				this.musicStatus = true
				this.$refs.audio.src = this.musicSrc
				this.$refs.musicImg.classList.add('Rotation')
				this.$refs.audio.load()
				this.$refs.audio.play()
			}else{
				this.musicStatus = false
				this.$refs.musicImg.classList.remove('Rotation')
				this.$refs.audio.pause()
			}
		}  
	}
}
</script>

<style scoped lang="stylus">
@keyframes rotation
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
.music-wrapper
  position absolute
  top 220px
  right 20px
  z-index 19
  .music
    width 50px
    height 50px
    &.Rotation
    //   transform rotate(360deg)
      animation rotation 2s linear infinite
      -moz-animation rotation 2s linear infinite
      -webkit-animation rotation 2s linear infinite
      -o-animation rotation 2s linear infinite
</style>
