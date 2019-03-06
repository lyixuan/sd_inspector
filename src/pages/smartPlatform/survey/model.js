import { message } from 'antd/lib/index';
import { queryHistogramData, getMapInfo } from './services';

function dealData(data, dataItem) {

  const dataObj = { dateArr: []};
  dataItem.map((item,i)=>dataObj[`dataArr${[i+1]}`]=[]);
  data.forEach(item => {
    dataObj.dateArr.push(item.date);
    dataItem.forEach((item1,index1)=>{
      dataObj[`dataArr${[index1+1]}`].push(item[dataItem[index1]]);
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
        yield put({ type: 'saveDataList' });
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
      // const dataList = {
      //   0:[
      //     {date:'81',examPlanNum:1,pushNum:2,readNum:3,unpushNum:4},
      //     {date:'82',examPlanNum:1,pushNum:2,readNum:3,unpushNum:4},
      //     {date:'83',examPlanNum:1,pushNum:2,readNum:3,unpushNum:4},
      //     {date:'84',examPlanNum:1,pushNum:2,readNum:3,unpushNum:4},
      //     {date:'85',examPlanNum:1,pushNum:2,readNum:3,unpushNum:4},
      //     {date:'87',examPlanNum:1,pushNum:2,readNum:3,unpushNum:4},
      //     {date:'96',examPlanNum:1,pushNum:2,readNum:3,unpushNum:4}
      //     ],
      //   1:[{date:'88',admissionFillNum:1,admissionFillRatio:2,examPlanNum:3},{date:'8',admissionFillNum:1,admissionFillRatio:2,examPlanNum:3}]
      // }
      const { dataList } = payload;
      // let wxData = dataList.filter(item => item.type === 1);
      // let admissionData = dataList.filter(item => item.type === 2);
      // wxData = wxData.sort(function (a, b) {
      //   return Date.parse(a.date) - Date.parse(b.date);//时间正序
      // });
      //  admissionData = admissionData.sort(function (a, b) {
      //   return Date.parse(a.date) - Date.parse(b.date);//时间正序
      // });
      const data1 = dealData(dataList[1], ['examPlanNum', 'pushNum', 'readNum','unpushNum']);
      const data2 = dealData(dataList[2], ['examPlanNum', 'admissionFillNum', 'admissionFillRatio']);
      return { ...state, dataList: { data1, data2 } };
    },
    saveMapInfo(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {
  },
};
