import { message } from 'antd';
import { getSankeyData } from '@/pages/ko/behaviorAnalyze/services';

export default {
  namespace: 'behavior',

  state: {
    hotDataList:[],    // 热力图数据
    upPage: {},        // 桑吉图上游数据
    downPage: {},      // 桑吉图下游数据
    behaviourData: [], // 柱状图
    currentPage: '',   // 当前页面
  },

  effects: {
    *getSankeyList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getSankeyData, params);
      if (result) {
        const {behaviourData = [],sankeyData={}} = result.data || [];
        yield put({ type: 'saveDataList', payload: { hotDataList: sankeyData.currentPageObj}, });
        yield put({ type: 'save', payload: { behaviourData, upPage: sankeyData.upPage,downPage:sankeyData.downPage,currentPage:'' } });
      } else {
        message.error(result.msg);
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveDataList(state, { payload }) {
      const {hotDataList}=payload;
      for(let i=0;i<15;i++){
        hotDataList.push({
          name:`d${i+1}`,
          textName: `行政管理${i+1}`,// 商城列表的名字
          clickPeople:i*10,//点击人数
          peopoleRate:(i/15*100).toFixed(2),
          clickCountPre:i*20,//点击次数
          countRate:(i/20*100).toFixed(2),//点击次数
        })
      }
      return { ...state, ...payload };
      // const newHotData = [];
      // hotDataList.forEach((item,i) => {
      //   const {actionKey,clickNum,clickPeople} = item.actionEventData;
      //   newHotData.push({
      //     name:actionKey,
      //     clickPeople:item.clickPeople,//点击人数
      //     peopoleRate:(item.clickPeople/clickPeople*100).toFixed(2),//人数占比
      //     clickCountPre:item.clickNum,//点击次数
      //     countRate:(item.clickNum/clickNum*100).toFixed(2),//次数占比
      //   })
      // })
      // return { ...state,hotDataList:newHotData };
    }
  },

  subscriptions: {},
};
