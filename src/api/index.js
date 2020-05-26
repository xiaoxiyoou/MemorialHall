import ajax from './ajax'

// 1. 定义基础路径

// const BASE_URL = 'http://xd99.made.fg1413.com'
// const BASE_URL = 'http://liaobei.made.fg1413.com'
// const BASE_URL = 'http://sanhe.made.fg1413.com'
const BASE_URL = 'http://ttg.made.fg1413.com'
// 登录
export const getOpenId = (params) => ajax(BASE_URL + '/FuneralUser/GetUserInfo',params)
// 获取sdkdata
export const getSdkData = (params) => ajax(BASE_URL + '/FuneralService/JsSdk',params)
// 机构列表
export const getCompanyList = (params) => ajax(BASE_URL + '/FuneralCompany/GetListPage',params)
export const getCompanyAdList = (params) => ajax(BASE_URL + '/FuneralCompany/GetCompanyAdList',params)
// 机构分类
export const getCompanyClassify = (params) => ajax(BASE_URL + '/FuneralCompany/GetCompanyCateTopList',params)
// 机构详情
export const getCompanyDetail = (params) => ajax(BASE_URL + '/FuneralCompany/GetCompanyData',params)
// 机构评论列表
export const getCompanyEvaList = (params) => ajax(BASE_URL + '/FuneralCompany/GetCompanyMsgListDataPage',params)
// 机构发布评论
export const sendCompanyEva = (params) => ajax(BASE_URL + '/FuneralCompany/AddCompanyMsg',params,'POST')
// 机构申请注册
export const sendCompanyRegister = (params) => ajax(BASE_URL + '/FuneralCompany/CompanyRegister',params,'POST')
// 执宾列表数据
export const getPersonList = (params) => ajax(BASE_URL + '/FuneralResident/GetResidentListPage',params)
// 执宾详情数据
export const getPersonDetail = (params) => ajax(BASE_URL + '/FuneralResident/GetResidentData',params)
// 执宾申请加入
export const addPerson = (params) => ajax(BASE_URL + '/FuneralResident/ResidentRegister',params,'POST')
// 执宾评论列表
export const personEvaList = (params) => ajax(BASE_URL + '/FuneralResident/ResidentMsgListPage',params)
// 用户评论执宾
export const sendPersonEva = (params) => ajax(BASE_URL + '/FuneralResident/AddResidentMsg',params,'POST')
// 用户点击推荐
// export const clickRecommend = (params) => ajax(BASE_URL + '/FuneralCompany/GetListPage',params)
// 纪念堂
// 纪念堂列表
export const getHallList = (params) => ajax(BASE_URL + '/FuneralMemorial/GetUserMemorialListDataPage',params)
// 创建纪念堂
export const setHall = (params) => ajax(BASE_URL + '/FuneralMemorial/AddMemorial',params,'POST')
// 纪念堂详情页
export const getHallDetail = (params) => ajax(BASE_URL + '/FuneralMemorial/GetUserMemorialData',params)
// 亲友留言列表
export const getMsgList = (params) => ajax(BASE_URL + '/FuneralMemorial/GetMemorialMsgListPage',params)
// 添加亲友留言
export const addMemorialMsg = (params) => ajax(BASE_URL + '/FuneralMemorial/AddMemorialMsg',params)
// 删除亲友留言
export const delMemorialMsg = (params) => ajax(BASE_URL + '/FuneralMemorial/DeleMemorialMsg',params)
// 追思日记列表
export const getDiaryList = (params) => ajax(BASE_URL + '/FuneralMemorial/GetDiaryListPage',params)
// 删除纪念堂追思日记
export const deleteDiary = (params) => ajax(BASE_URL + '/FuneralMemorial/DeleMemorialDiary',params)
// 添加纪念堂追思日记
export const addDiary = (params) => ajax(BASE_URL + '/FuneralMemorial/AddMemorialDiary',params,'POST')
// 纪念堂追思卡模板列表
export const getCardList = (params) => ajax(BASE_URL + '/FuneralMemorial/GetMemorialCardTplList',params)
// 纪念堂追思卡详情
export const cardDetail = (params) => ajax(BASE_URL + '/FuneralMemorial/GetMemorialCardTplModel',params)
// 纪念堂追思卡二维码
export const getQrcode = (params) => ajax(BASE_URL + '/MemorialCard/CreateQRCode',params)
// 纪念堂模板信息
export const getTplData = (params) => ajax(BASE_URL + '/FuneralMemorial/GetMemorialTplDataById',params)
// 点香
export const clickSenser = (params) => ajax(BASE_URL + '/FuneralMemorial/MemorialThus',params)
// 鲜花
export const clickFlowers = (params) => ajax(BASE_URL + '/FuneralMemorial/MemorialFlower',params)
// 鲜果
export const clickFruits = (params) => ajax(BASE_URL + '/FuneralMemorial/MemorialFruit',params)
// 打扫
export const clickClean = (params) => ajax(BASE_URL + '/FuneralMemorial/MemorialClean',params)

// 下载美好回忆
export const postMediaId = (params) => ajax(BASE_URL + '/FuneralService/WxImgDown',params)
// 美好回忆详情
export const recallDetail = (params) => ajax(BASE_URL + '/FuneralMemorial/GetMemorialRecallModel',params)
// 数组添加美好回忆
export const addRecall = (params) => ajax(BASE_URL + '/FuneralMemorial/AddMemorialRecall',params)
// 设置页面
// 设置纪念堂是否允许亲友留言
export const setMsgPermit = (params) => ajax(BASE_URL + '/FuneralMemorial/UpdateMsgPermit',params)
// 访客记录列表
export const getViewUserList = (params) => ajax(BASE_URL + '/FuneralMemorial/GetMemorialViewUserListPage',params)
// 获取背景音乐分类列表
export const getMusicRecommend = (params) => ajax(BASE_URL + '/FuneralMemorial/GetMemorialMusicCateList',params)
// 根据分类获取背景音乐列表
export const getMusicList = (params) => ajax(BASE_URL + '/FuneralMemorial/GetMemorialMusicListPage',params)
// 确认背景音乐
export const confirmMusic = (params) => ajax(BASE_URL + '/FuneralMemorial/UpdateMemorialMusice',params)
// 根据模板分类
export const getTplRecommend = (params) => ajax(BASE_URL + '/FuneralMemorial/GetMemorialTplCateList',params)
// 根据分类获取列表
export const getTplList = (params) => ajax(BASE_URL + '/FuneralMemorial/GetMemorialTplListPage',params)
// 确认模板
export const confirmTpl = (params) => ajax(BASE_URL + '/FuneralMemorial/UpdateMemorialTpl',params)
// 确认模板
export const deleteHall = (params) => ajax(BASE_URL + '/FuneralMemorial/LogicDeleMemorial',params)
// 获取追思信息
export const getThinkBackInfo = (params) => ajax(BASE_URL + '/FuneralMemorial/GetMemorialCardModel',params)
// 添加追思信息
export const addThinkBackInfo = (params) => ajax(BASE_URL + '/FuneralMemorial/AddMemorialCard',params, 'POST')
// 获取逝者信息
export const getUserInfo = (params) => ajax(BASE_URL + '/FuneralMemorial/GetMemorielDieUserList',params)
// 提交逝者信息
export const updateUserInfo = (params) => ajax(BASE_URL + '/FuneralMemorial/UpdateMemorial',params,'POST')

// 新闻列表
export const getNewslist = (params) => ajax(BASE_URL + '/FuneralContent/GetContentListPage',params)
// 新闻导航
export const cateList = (params) => ajax(BASE_URL + '/FuneralContent/GetContentCateList',params)
// 新闻内容
export const artcleContent = (params) => ajax(BASE_URL + '/FuneralContent/GetContentItemListPage',params)
// 新闻标题及相关
export const artcleDetail = (params) => ajax(BASE_URL + '/FuneralContent/GetContentById',params)

export const sendAmendInfo = (params) => ajax(BASE_URL + '/FuneralMemorial/UpdateMemorial',params,'POST')
