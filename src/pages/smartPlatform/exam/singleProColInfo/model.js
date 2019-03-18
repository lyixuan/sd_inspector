import { message } from 'antd/lib/index';
import { provinceOrg } from './services';

export default {
  namespace: 'examOrg',

  state: {
    dataList: [],
    mapInfo: {},
  },

  effects: {
    *provinceOrg({ payload }, { call, put }) {
      const data = yield call(provinceOrg, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'saveProvinceOrg' , payload: { dataList: data.data },});
      } else {
        message.error(data.msg);
      }
    },
  },

  reducers: {
    saveProvinceOrg(state, { payload }) {
      const {dataList = []} = payload;
      const mapInfo = {
        examNotice:{
          province:[],
          familyName:[],
          data3:[],
          data4:[],
          data1:[],
          data2:[],
        },
        examPlan:{
          province:[],
          familyName:[],
          data3:[],
          data4:[],
          data1:[],
          data2:[],
        },
        examTicket:{
          province:[],
          familyName:[],
          data3:[],
          data4:[],
          data1:[],
          data2:[],
        },
      };
      dataList.forEach((v)=>{
        mapInfo.examNotice.province.push(v.collegeName);
        mapInfo.examNotice.familyName.push(v.familyName);
        mapInfo.examNotice.data1.push(`${(v.oldReadRatio*100).toFixed(2)}`);
        mapInfo.examNotice.data2.push(`${(v.newReadRatio*100).toFixed(2)}`);
        mapInfo.examNotice.data3.push(v.oldReadNum);
        mapInfo.examNotice.data4.push(v.newReadNum);
      });
      dataList.forEach((v)=>{
        mapInfo.examPlan.province.push(v.collegeName);
        mapInfo.examPlan.familyName.push(v.familyName);
        mapInfo.examPlan.data1.push(v.oldAvgServiceNum);
        mapInfo.examPlan.data2.push(v.newAvgServiceNum);
        mapInfo.examPlan.data3.push(v.oldExamPlanNum);
        mapInfo.examPlan.data4.push(v.newExamPlanNum);
      });
      dataList.forEach((v)=>{
        mapInfo.examTicket.province.push(v.collegeName);
        mapInfo.examTicket.familyName.push(v.familyName);
        mapInfo.examTicket.data1.push(`${(v.oldAdmissionFillRatio*100).toFixed(2)}`);
        mapInfo.examTicket.data2.push(`${(v.newAdmissionFillRatio*100).toFixed(2)}`);
        mapInfo.examTicket.data3.push(v.oldAdmissionFillNum);
        mapInfo.examTicket.data4.push(v.newAdmissionFillNum);
      });

      return { ...state, mapInfo };
    }
  },

  subscriptions: {
  },
};
