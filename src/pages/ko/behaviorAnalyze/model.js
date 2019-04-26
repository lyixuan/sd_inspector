import { message } from 'antd';
import { sankeySuperApi } from '@/pages/ko/behaviorAnalyze/services';

function getData(dataList, dataArr) {
  const re = /[\u4E00-\u9FA5]/g
  let newKey = {clickNum:0,choiceLessonPercent:0};
  const newDatalist = [];
  dataList.forEach((item,i)=>{
    item.choiceLessonPercent=Number(item.choiceLessonPercent.split('%')[0]);
    if(item.actionKeyId.indexOf('homepage')>=0&&item.actionKey==='click_ko_item'){
      newKey.name='课程公开计划选项';
      newKey.actionKey = item.actionKey
      newKey.clickNum+=Number(item.clickNum)
      newKey.choiceLessonPercent+=Number(item.choiceLessonPercent)
    }else{
      // if(item.name){
      //   if(item.name.match(re).length > 8){
      //     item.name=`${item.name.match(re).substring(0,8)}...`
      //   }
      // }
      // console.log(item.name)
      newDatalist.push(item)
    }
  });

  newDatalist.push(newKey);

  const dataObj = {};
  dataArr.forEach(item => {
    dataObj[item] = [];
    newDatalist.forEach((item1,i) => {
      if(i<10)
      dataObj[item].push({ name: item1, value: item1[item] })
    });
  })
  return dataObj;
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
        newData = getData(behaviourData, ['name', 'clickNum', 'choiceLessonPercent'])
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
