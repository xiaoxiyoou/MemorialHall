<template>
  <div class="container"></div>
</template>

<script type="text/ecmascript-6">
import { getOpenId } from  'api/index'

export default {
  data() {
    return {
      redirect: ''
    }
  },
  mounted(){    
    this._getCode()
  },
  methods: {
     _getCode(redirectUrl){
      let param = this.GetRequest();
      let code = param.code
      if (code === '' || code === undefined){
        this.GetCode()
      }else{
        this.GetOpenId(code)
      }
    },
    GetRequest(){
			let url = location.search
      let theRequest = {}
			if(url.indexOf('?') !== -1){
				let str = url.substr(1)
				let strs = str.split('&')
				for(let i = 0; i < strs.length; i++){
					theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
				}
			}
			return theRequest;
		},
		GetCode:function () {
      let redirectUrl = window.location.href
      // let url = 'http://xd99.made.fg1413.com/FuneralUser/GetWeiXinCode?redirect_uri=' + redirectUrl
      // let url = 'http://liaobei.made.fg1413.com/FuneralUser/GetWeiXinCode?redirect_uri=' + redirectUrl
			// let url = 'http://sanhe.made.fg1413.com/FuneralUser/GetWeiXinCode?redirect_uri=' + redirectUrl
			let url = 'http://ttg.made.fg1413.com/FuneralUser/GetWeiXinCode?redirect_uri=' + redirectUrl
			window.location.href = url
		},
		GetOpenId(code) {
      getOpenId({
        code
      }).then(res=>{
        console.log(res)
        if(res.code === 0){
          localStorage.setItem('UserId', res.data.UserId)
          // this.$cookies.set('UserId', res.data.UserId)
          this.$router.replace({
            path: localStorage.getItem('fromUrl')
          })
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
</style>
