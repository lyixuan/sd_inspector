import { message } from 'antd/lib/index';
import { queryHistogramData } from './services';

function dealData(data,key1,key2,key3) {
  const dataObj = {
    dateArr:[],
    dataArr1:[],
    dataArr2:[],
    dataArr3:[],
  };
  data.forEach(item => {
    dataObj.dateArr.push(item.date);
    dataObj.dataArr1.push(item[key1]);
    dataObj.dataArr2.push(item[key2]);
    dataObj.dataArr3.push(item[key3]);
  });
  return dataObj;
}
export default {
  namespace: 'survey',

  state: {
    dataList:[],
  },

  effects: {
    *queryHistogramData({ payload }, { call, put }) {
      const data = yield call(queryHistogramData, {...payload});
      if ( data.code === 20000) {
        yield put({ type: 'saveDataList', payload: { dataList:data.data } });
      } else {
        message.error(data.msg);
      }
    },
  },

  reducers: {
    saveDataList(state, { payload }) {
      let {dataList} = payload;
      let wxData = dataList.filter(item => item.type===1) ;
      let admissionData = dataList.filter(item => item.type===2) ;
      wxData = wxData.sort(function(a,b){
        return Date.parse(a.date) - Date.parse(b.date);//时间正序
      });
      admissionData = admissionData.sort(function(a,b){
        return Date.parse(a.date) - Date.parse(b.date);//时间正序
      });
      const data1 = dealData(wxData,'examPlanNum','pushNum','reachRatio');
      const data2 = dealData(admissionData,'examPlanNum','admissionFillNum','admissionFillRatio');
      return { ...state, dataList:{ data1,data2 } };
    },
  },

  subscriptions: {
  },
};
