import { message } from 'antd';
import { getSankeyData } from '@/pages/ko/behaviorAnalyze/services';

function getData(dataList,dataArr){
  const dataObj={};
  dataArr.forEach(item=>{
    dataObj[item]=[];
    dataList.forEach(item1=>{
      dataObj[item].push({name:item1,value:item1[item]})
    });
  })
  return dataObj;
}

export default {
  namespace: 'behavior',

  state: {
    hotDataList: [],    // 热力图数据
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
      const result = yield call(getSankeyData, {params,formParams,otherParams});
      if (result) {
        const {behaviourData = {},sankeyData={}} = result.data || [];
        yield put({ type: 'saveDataList', payload: { hotDataList: sankeyData.currentPageObj} });
        yield put({ type: 'saveBehaviourData', payload: { behaviourData:behaviourData.barActionEventData}});
        yield put({ type: 'save', payload: { upPage: sankeyData.upPage,downPage:sankeyData.downPage,currentPage:'' } });
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
      const {behaviourData}=payload;
      console.log(behaviourData)
      // const behaviourData= [ {
      //   "name": "aute fugiat aliquip",
      //   "actionKey": "non ipsum",
      //   "actionKeyId": "exercitation tempor ad commodo ex",
      //   "clickNum": -8881030.618847996,
      //   "choiceLessonPercent": "eiusmod Duis i"
      // },
      // {
      //   "name": "fugiat",
      //   "actionKey": "non sint Duis",
      //   "actionKeyId": "voluptate pariatur laborum v",
      //   "clickNum": -89545102.40833753,
      //   "choiceLessonPercent": "et"
      // }]
      // 数组的字符串跟接口返回的字段一致，否则option那块取值报错
      let newData=[]
      if(behaviourData){
        newData=getData(behaviourData,['name','clickNum','choiceLessonPercent'])
      }
     
      return { ...state,behaviourData:newData };
    },
    saveDataList(state, { payload }) {
      // const {hotDataList}=payload;
      const hotDataList=[]
      for(let i=0;i<15;i++){
        hotDataList.push({
          name: `d${i + 1}`,
          textName: `行政管理${i + 1}`,// 商城列表的名字
          clickPeople: i * 10,//点击人数
          peopoleRate: (i / 15 * 100).toFixed(2),
          clickCountPre: i * 20,//点击次数
          countRate: (i / 20 * 100).toFixed(2),//点击次数
        })
      }
      return { ...state, hotDataList};
      // if(hotDataList&&hotDataList.length){
      //   const newHotData = [];
      //   hotDataList.forEach((item,i) => {
      //     const {actionKey,clickNum,clickPeople} = item.actionEventData;
      //     newHotData.push({
      //       name:actionKey,
      //       clickPeople:item.clickPeople,//点击人数
      //       peopoleRate:(item.clickPeople/clickPeople*100).toFixed(2),//人数占比
      //       clickCountPre:item.clickNum,//点击次数
      //       countRate:(item.clickNum/clickNum*100).toFixed(2),//次数占比
      //     })
      //   })
      // }
      // return { ...state,hotDataList:newHotData };
    }
  },

  subscriptions: {},
};
