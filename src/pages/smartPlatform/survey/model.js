import { message } from 'antd/lib/index';
import { queryHistogramData, getMapInfo } from './services';

function dealData(data, dataItem) {

  const dataObj = { dateArr: []};
  dataItem.map((item,i)=>dataObj[`dataArr${[i+1]}`]=[]);
  data.forEach(item => {
    dataObj.dateArr.push(item.date);
    dataItem.forEach((item1,index1)=>{
      let val = item[dataItem[index1]];
      if('admissionFillRatio' === dataItem[index1] ||'reachRatio' === dataItem[index1]){
        val = (val*100).toFixed(2);
      }
      dataObj[`dataArr${[index1+1]}`].push(val);
    })
  });
  return dataObj;
}
export default {
  namespace: 'survey',

  state: {
    dataList: [],
    mapInfo: [],
  },

  effects: {
    *queryHistogramData({ payload }, { call, put }) {
      const data = yield call(queryHistogramData, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'saveDataList' , payload: { dataList: data.data },});
      } else {
        message.error(data.msg);
      }
    },
    *getMapInfo(_, { call, put }) {
      const response = yield call(getMapInfo);
      if (response.code === 20000) {
        yield put({
          type: 'saveMapInfo',
          payload: { mapInfo: response.data },
        })

      } else {
        message.error(response.msg)
      }
    }
  },

  reducers: {
    saveDataList(state, { payload }) {
      const { dataList } = payload;
      // let wxData = dataList.filter(item => item.type === 1);
      // let admissionData = dataList.filter(item => item.type === 2);
      // wxData = wxData.sort(function (a, b) {
      //   return Date.parse(a.date) - Date.parse(b.date);//时间正序
      // });
      //  admissionData = admissionData.sort(function (a, b) {
      //   return Date.parse(a.date) - Date.parse(b.date);//时间正序
      // });
     // console.log(JSON.stringify(dataList) === "{}") ;
      const data1 =dataList[1]? dealData(dataList[1], ['examPlanNum', 'pushNum', 'readNum','reachRatio']):{};
      const data2 =dataList[2]? dealData(dataList[2], ['examPlanNum', 'admissionFillNum', 'admissionFillRatio']):{};
      return { ...state, dataList: { data1, data2 } };
    },
    saveMapInfo(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {
  },
};
