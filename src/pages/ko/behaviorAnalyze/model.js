import { message } from 'antd';
import { sankeySuperApi } from '@/pages/ko/behaviorAnalyze/services';

function getByteLen(val) {
  var len = 0;
  for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null){
      len += 2;
    }else{
      len += 1;
    }
  }
    return len;
}
function format(name){
  let newName = '';
  if(getByteLen(name)>16){
    newName = name.replace('点击','');
    console.log(newName)
    if(getByteLen(newName)>16){
      console.log(newName)
      return `${newName.substring(0,8)}...`
    }
  }else{
    return name
  }
}
function getData(dataList, dataArr) {
  const dataObj = {};
  dataArr.forEach(item => {
    dataObj[item] = [];
    dataList.forEach((item1) => {
      if(item==='choiceLessonPercent'){
        item1[item]=item1[item].split('%')[0]
      }
      if(item==='name'){
        item1[item]=format(item1[item])
      }
      dataObj[item].push({ name: item1, value: item1[item] })
    });
  })
  return dataObj;
}
function sortId(a,b){  
  return a.clickNum-b.clickNum 
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
  },
  effects: {
    *getSankeyList({ payload }, { call, put }) {
      const params = payload.params;
      const formParams = payload.formParams;
      const otherParams = payload.otherParams;
      const result = yield call(sankeySuperApi, { params, formParams, otherParams });
      if (result) {
        const { behaviourData = {}, sankeyData = {}, pvuvData, userSize } = result.data || [];
        yield put({ type: 'saveDataList', payload: { hotDataList: sankeyData.currentPageObj } });
        yield put({ type: 'saveBehaviourData', payload: { behaviourData } });
        yield put({ type: 'save', payload: {pvuvData, upPage: sankeyData.upPage, downPage: sankeyData.downPage, currentPage: sankeyData.currentPage } });
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
      const { behaviourData } = payload;
      // 数组的字符串跟接口返回的字段一致，否则option那块取值报错
      let newData = []
      if (behaviourData) {
        let newbehaviourData = behaviourData.sort(sortId);
        newData = getData(newbehaviourData.slice(0, 10), ['name', 'clickNum', 'choiceLessonPercent'])
      }

      return { ...state, behaviourData: newData };
    },
    saveDataList(state, { payload }) {
      const { hotDataList } = payload;
      const { actionKeyIds } = hotDataList;
      if (actionKeyIds && actionKeyIds.length) {
        hotDataList.newIds = [];
        actionKeyIds.forEach((item, i) => {
          hotDataList.newIds.push({
            actionKey: item.actionKey,
            name: item.actionName,
            actionKeyId: item.actionKeyId,
            clickPeople: item.clickPeople,//点击人数
            clickPeoplePro: item.clickPeoplePro,//人数占比
            clickNum: item.clickNum,//点击次数
            clickNumPro: item.clickNumPro,//次数占比
          })
        })
      }
      return { ...state, hotDataList };
    }
  },

  subscriptions: {},
};
