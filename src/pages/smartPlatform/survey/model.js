import { message } from 'antd/lib/index';
import { queryHistogramData, getMapInfo, getNodeMsgCount } from './services';
import { examProvinceOrg } from '../services';

function dealData(data, dataItem) {
  const dataObj = { dateArr: [] };
  dataItem.map((item, i) => (dataObj[`dataArr${[i + 1]}`] = []));
  data.forEach(item => {
    dataObj.dateArr.push(`${item.date.split('-')[1]}/${item.date.split('-')[2]}`);
    dataItem.forEach((item1, index1) => {
      let val = item[dataItem[index1]];
      if ('admissionFillRatio' === dataItem[index1] || 'reachRatio' === dataItem[index1]) {
        val = (val * 100).toFixed(2);
      }
      dataObj[`dataArr${[index1 + 1]}`].push(val);
    });
  });
  return dataObj;
}
export default {
  namespace: 'survey',

  state: {
    dataList: [],
    mapInfo: [],
    familyExamOrgData: [], // 排名家族数据
    collegeExamOrgData: [], // 排名学院数据
    examNodes: [],
  },

  effects: {
    *getNodeMsgCount({ payload }, { call, put }) {
      const data = yield call(getNodeMsgCount, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'saveExamNodes', payload: { examNodes: data.data } });
      } else {
        message.error(data.msg + data.msgDetail);
      }
    },
    *queryHistogramData({ payload }, { call, put }) {
      const data = yield call(queryHistogramData, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'saveDataList', payload: { dataList: data.data } });
      } else {
        message.error(data.msg + data.msgDetail);
      }
    },
    *getMapInfo(_, { call, put }) {
      const response = yield call(getMapInfo);
      if (response.code === 20000) {
        yield put({
          type: 'saveMapInfo',
          payload: { mapInfo: response.data },
        });
      } else {
        message.error(response.msg + response.msgDetail);
      }
    },
    *examProvinceOrg({ payload }, { call, put }) {
      const { orgType } = payload;
      let data = {};
      const { province, ...others } = payload;
      const newPayload = province ? payload : { ...others };

      const response = yield call(examProvinceOrg, newPayload);
      if (response.code === 20000) {
        data[`${orgType}ExamOrgData`] = Array.isArray(response.data) ? response.data : [];
        yield put({
          type: 'saveExamOrgData',
          payload: data,
        });
      } else {
        message.error(response.msg + response.msgDetail);
      }
    },
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
      const data1 = dataList[1]
        ? dealData(dataList[1], ['examPlanNum', 'pushNum', 'readNum', 'reachRatio'])
        : {};
      const data2 = dataList[2]
        ? dealData(dataList[2], ['examPlanNum', 'admissionFillNum', 'admissionFillRatio'])
        : {};
      return { ...state, dataList: { data1, data2 } };
    },
    saveExamNodes(state, { payload }) {
      return { ...state, ...payload };
    },
    saveMapInfo(state, { payload }) {
      return { ...state, ...payload };
    },
    saveExamOrgData(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};
