import { message } from 'antd';
import { sankeySuperApi } from '@/pages/ko/behaviorAnalyze/services';

// 处理成柱状图需要的数据（dataList:整合过的数据源,dataArr：柱状图数据分类)
function getData(dataList, dataArr) {
  const dataObj = {};
  dataArr.forEach(item => {
    dataObj[item] = [];
    dataList.forEach((item1) => {
      if(item==='choiceLessonPercent'){
        item1[item]=item1[item].split('%')[0]
      }
      dataObj[item].push({ name: item1, value: item1[item] })
    });
  })
  return dataObj;
}
// 学习页：需要把 直播重播等数据求和
function dealStudyPage (behaviourData,dealObj){
  const newbehaviourData=[];
  dealObj.forEach(items=>{
    let newKey = {actionKey:items.name,clickNum:0,choicePerson:0,clickTotalPerson:0};
    items.list.forEach((el)=>{
      behaviourData.forEach((item)=>{
        if(el===item.actionKeyId){
          newKey.name=item.name
          newKey.clickNum+=Number(item.clickNum)
          newKey.choicePerson+=Number(item.choicePerson)
          newKey.clickTotalPerson+=Number(item.clickTotalPerson)
        }
      })
    })
    newKey.choiceLessonPercent = !newKey.clickTotalPerson?'0%':`${((newKey.choicePerson/newKey.clickTotalPerson)*100).toFixed(2)}%`;
    newbehaviourData.push(newKey);
  })
  return newbehaviourData
}

export default {
  namespace: 'behavior',

  state: {
    pvuvData: {},   // 仪表盘
    hotDataList: {},   // 热力图数据
    upPage: {},        // 桑吉图上游数据
    downPage: {},      // 桑吉图下游数据
    behaviourData: [], // 柱状图
    currentPage: '',   // 当前页面
    currentActionName: '',   // 当前二级页面名称
    userSize:0,   //用户数量
  },
  effects: {
    *getSankeyList({ payload }, { call, put }) {
      const params = payload.params;
      const formParams = payload.formParams;
      const otherParams = payload.otherParams;
      const result = yield call(sankeySuperApi, { params, formParams, otherParams });
      if (result&&result.code === 20000) {
        const { behaviourData = [], sankeyData = {}, pvuvData, currentPage,currentActionName,userSize } = result.data;
        const upPage = sankeyData.upPageData||{};
        const downPage = sankeyData.downPageData||{};
        yield put({ type: 'saveDataList', payload: { hotDataList: behaviourData,pvuvData,currentPage,currentActionName } });
        yield put({ type: 'saveBehaviourData', payload: { behaviourData ,currentPage} });
        yield put({ type: 'save', payload: {userSize,pvuvData, upPage, downPage, currentPage} });
        yield put({
          type: 'koPlan/saveUserData',
          payload: { usersData: { totalCount: userSize } }
        })
      } else {
        message.error(result.msg);
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveBehaviourData(state, { payload }) {
      const { behaviourData,currentPage } = payload;
      //  ['name', 'clickNum', 'choiceLessonPercent']数组的字符串跟接口返回的字段一致，否则option那块取值报错
      let newData = []
      if (behaviourData&&behaviourData.length) {
        let newbehaviourData = [];
        const studyList = [
          {name:'click_golesson',list:['studypage_click_golesson$-1','studypage_click_golesson_free$-1']},
          {name:'click_livebroadcast',list:['studypage_click_livebroadcast_free$-1','studypage_click_livebroadcast-1']},
          {name:'click_record',list:['studypage_click_record_free$-1','studypage_click_record$-1']}
        ]
        if(currentPage==='studypage'){
          newbehaviourData=dealStudyPage(behaviourData,studyList)
        }else{
          newbehaviourData=behaviourData
        }
        newbehaviourData = newbehaviourData.sort((a,b)=>(b.clickNum-a.clickNum ));
        newData = getData(newbehaviourData.slice(0, 10), ['name', 'clickNum', 'choiceLessonPercent'])
      }
      return { ...state, behaviourData: newData };
    },
    saveDataList(state, { payload }) {
      const { hotDataList,pvuvData } = payload;
      hotDataList.forEach(item=>{
        item.clickPeople = Number(item.choicePerson);
        item.clickPeoplePro = item.choicePerson&&pvuvData.uv?item.choicePerson/pvuvData.uv*100:0;//人数占比
        item.clickNumPro = item.clickNum&&pvuvData.pv?item.clickNum/pvuvData.pv*100:0;//次数占比
      })
      return { ...state, ...payload };
    }
  },

  subscriptions: {},
};
