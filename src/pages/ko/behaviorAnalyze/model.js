import { message } from 'antd';

export default {
  namespace: 'behavior',

  state: {
    hotDataList:[]
  },

  effects: {
    *getHotDataList({ payload }, { call, put }) {
      // const data = yield call(province, { ...payload });
      // if (data.code === 20000) {
        yield put({ type: 'saveDataList', payload: { hotDataList:[]}, });
      // } else {
        // message.error(msgF(data.msg,data.msgDetail));
      // }
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
