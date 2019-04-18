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
      for(let i=0;i<10;i++){
        hotDataList.push({
          name:`d${i+1}`,
          clickPeople:i*10,//点击人数
          peopoleRate:(i/15*100).toFixed(2),
          clickCountPre:i*20,//点击次数
          countRate:(i/20*100).toFixed(2),//点击次数
        })
      }

      return { ...state, ...payload };
    }
  },

  subscriptions: {},
};
