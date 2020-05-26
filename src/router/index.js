import Vue from 'vue'
import VueRouter from 'vue-router'

import Info from '../pages/Info/Info.vue'
import InfoDetail from '../pages/InfoDetail/InfoDetail.vue'
import CompanyIndex from '../pages/CompanyIndex/CompanyIndex.vue'
import PersonIndex from '../pages/PersonIndex/PersonIndex.vue'
import PersonDetail from '../pages/PersonDetail/PersonDetail.vue'
import PersonJoin from '../pages/PersonJoin/PersonJoin.vue'
import CompanyDetail from '../pages/CompanyDetail/CompanyDetail.vue'
import CompanyEvaluate from '../pages/CompanyEvaluate/CompanyEvaluate.vue'
import PersonEvaluate from '../pages/PersonEvaluate/PersonEvaluate.vue'
import CompanyJoin from '../pages/CompanyJoin/CompanyJoin.vue'
import Evaluate from '../pages/Evaluate/Evaluate.vue'
import Search from '../pages/Search/Search.vue'
import MemorialHall from '../pages/MemorialHall/MemorialHall.vue'
import HallList from '../pages/HallList/HallList.vue'
import SetHall from '../pages/SetHall/SetHall.vue'
import Hall from '../pages/Hall/Hall.vue'
import DiaryList from '../pages/DiaryList/DiaryList.vue'
import MessageList from '../pages/MessageList/MessageList.vue'
import MemoryList from '../pages/MemoryList/MemoryList.vue'
import SelectMusic from '../pages/SelectMusic/SelectMusic.vue'
import SelectTpl from '../pages/SelectTpl/SelectTpl.vue'
import Login from '../pages/Login/Login.vue'
import Setting from '../pages/Setting/Setting.vue'
import GoodMemory from '../pages/GoodMemory/GoodMemory.vue'
import AddMemory from '../pages/AddMemory/AddMemory.vue'
import ThinkbackInfo from '../pages/ThinkbackInfo/ThinkbackInfo.vue'
import AmendHallInfo from '../pages/AmendHallInfo/AmendHallInfo.vue'
import MessageAdd from '../pages/MessageAdd/MessageAdd.vue'
import DiaryAdd from '../pages/DiaryAdd/DiaryAdd.vue'
import MemorialCard from '../pages/MemorialCard/MemorialCard.vue'

Vue.use(VueRouter)
// 同一个路由多次添加不被允许
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      title:'登录',
      depth: 1
    }
  },
  {
    path: '/personindex',
    name: 'personindex',
    component: PersonIndex,
    meta:{
      title:'优秀执宾',
      requireAuth: true,
      requireLoad: true,
      depth: 1
    }
  },
  {
    path: '/companyindex',
    name: 'companyindex',
    component: CompanyIndex,
    meta:{
      title:'殡服机构',
      requireAuth: true,
      requireLoad: true,
      depth: 1
    }
  },
  {
    path: '/hall',
    name: 'hall',
    component: Hall,
    meta:{
      title:'纪念堂',
      isShowMusic: true,
      requireAuth: true,
      requireLoad: false,
      keepAlive:true,
      depth: 3
    }
  },
  {
    path: '/memorialhall',
    name: 'memorialhall',
    component: MemorialHall,
    meta:{
      title:'纪念堂',
      requireAuth: true,
      requireLoad: true,
      depth: 1
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
    meta:{
      title:'设置',
      requireLoad: true,
      requireAuth: true,
      depth: 4
    }
  },
  {
    path: '/info',
    name: 'info',
    component: Info,
    meta:{
      title:'信息公告',
      requireAuth: true,
      requireLoad: true,
      depth: 1
    }
  },
  {
    path: '/goodmemory',
    name: 'goodmemory',
    component: GoodMemory,
    meta:{
      title:'美好回忆',
      requireLoad: true,
      requireAuth: true,
      depth: 4
    }
  },
  {
    path: '/addmemory',
    name: 'addmemory',
    component: AddMemory,
    meta:{
      title:'添加美好回忆',
      requireLoad: true,
      requireAuth: true,
      depth: 5
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta:{
      title:'搜索',
      requireLoad: true,
      requireAuth: true,
      depth: 2
    }
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: Evaluate,
    meta:{
      title:'评价',
      requireLoad: true,
      requireAuth: true,
      depth: 4
    }
  },
  {
    path: '/infodetail',
    name: 'infodetail',
    component: InfoDetail,
    meta:{
      title:'文章详情',
      requireLoad: true,
      requireAuth: true,
      depth: 2
    }
  },
  {
    path: '/persondetail',
    name: 'persondetail',
    component: PersonDetail,
    meta:{
      title:'优秀执宾',
      requireLoad: true,
      requireAuth: true,
      depth: 2
    }
  },
  {
    path: '/personjoin',
    name: 'personjoin',
    component: PersonJoin,
    meta:{
      requireLoad: true,
      requireAuth: true,
      title:'申请加入',
      depth: 3
    }
  },
  {
    path: '/companydetail',
    name: 'companydetail',
    component: CompanyDetail,
    meta:{
      requireLoad: true,
      requireAuth: true,
      title:'服务机构详情',
      depth: 2
    }
  },
  {
    path: '/companyevaluate',
    name: 'companyevaluate',
    component: CompanyEvaluate,
    meta:{
      requireLoad: true,
      requireAuth: true,
      title:'服务机构评价',
      depth: 3
    }
  },
  {
    path: '/personevaluate',
    name: 'personevaluate',
    component: PersonEvaluate,
    meta:{
      requireLoad: true,
      requireAuth: true,
      title:'优秀执宾评价',
      depth: 3
    }
  },
  {
    path: '/companyjoin',
    name: 'companyjoin',
    component: CompanyJoin,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'申请加入',
      depth: 3
    }
  },
  
  {
    path: '/halllist',
    name: 'halllist',
    component: HallList,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'我的纪念堂',
      depth: 2
    }
  },
  {
    path: '/sethall',
    name: 'sethall',
    component: SetHall,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'纪念堂',
      depth: 3
    }
  },
  {
    path: '/diarylist',
    name: 'diarylist',
    component: DiaryList,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'追思日记',
      depth: 4
    }
  },
  {
    path: '/messagelist',
    name: 'messagelist',
    component: MessageList,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'亲友留言',
      depth: 4
    }
  },
  {
    path: '/memorylist',
    name: 'memorylist',
    component: MemoryList,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'美好回忆',
      depth: 4
    }
  },
  {
    path: '/thinkbackinfo',
    name: 'thinkbackinfo',
    component: ThinkbackInfo,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'追思信息',
      depth: 5
    }
  },
  {
    path: '/selecttpl',
    name: 'selecttpl',
    component: SelectTpl,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'选择模板',
      depth: 5
    }
  },
  {
    path: '/selectmusic',
    name: 'selectmusic',
    component: SelectMusic,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'选择音乐',
      depth: 5
    }
  },
  {
    path: '/amendhallinfo',
    name: 'amendhallinfo',
    component: AmendHallInfo,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'修改逝者信息',
      depth: 5
    }
  },
  {
    path: '/messageadd',
    name: 'messageadd',
    component: MessageAdd,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'添加留言',
      depth: 5
    }
  },
  {
    path: '/diaryadd',
    name: 'diaryadd',
    component: DiaryAdd,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'添加追思日记',
      depth: 5
    }
  },
  {
    path: '/memorialcard',
    name: 'memorialcard',
    component: MemorialCard,
    meta:{
    requireLoad: true,
    requireAuth: true,
    title:'追思卡',
      depth: 5
    }
  }
]

const router = new VueRouter({
  routes
})
export default router
