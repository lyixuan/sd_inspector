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
          data5:[],
          data6:[],
          data7:[],
          data1:[],
          data2:[],
        },
        examPlan:{
          province:[],
          familyName:[],
          data3:[],
          data4:[],
          data5:[],
          data6:[],
          data1:[],
          data7:[],
          data2:[],
        },
        examTicket:{
          province:[],
          familyName:[],
          data3:[],
          data4:[],
          data5:[],
          data6:[],
          data7:[],
          data1:[],
          data2:[],
        },
      };
      dataList.sort((a,b)=>b.readRatio-a.readRatio).forEach((v)=>{
        mapInfo.examNotice.province.push(v.collegeName);
        mapInfo.examNotice.familyName.push(v.familyName);
        mapInfo.examNotice.data1.push(`${(v.oldReadRatio*100).toFixed(2)}`);
        mapInfo.examNotice.data2.push(`${(v.newReadRatio*100).toFixed(2)}`);
        mapInfo.examNotice.data3.push(Number(v.oldExamPlanNum));
        mapInfo.examNotice.data4.push(Number(v.newExamPlanNum));
        mapInfo.examNotice.data5.push(`${(v.readRatio * 100).toFixed(2)}`);
        mapInfo.examNotice.data6.push(v.examPlanNum);
        mapInfo.examNotice.data7.push(v.readNum);
      });
      dataList.sort((a,b)=>b.examPlanNum-a.examPlanNum).forEach((v)=>{
        mapInfo.examPlan.province.push(v.collegeName);
        mapInfo.examPlan.familyName.push(v.familyName);
        mapInfo.examPlan.data1.push(Number(v.oldAvgServiceNum));
        mapInfo.examPlan.data2.push(Number(v.newAvgServiceNum));
        mapInfo.examPlan.data3.push(Number(v.oldExamPlanNum));
        mapInfo.examPlan.data4.push(Number(v.newExamPlanNum));
        mapInfo.examPlan.data6.push(Number(v.examPlanNum));
        mapInfo.examPlan.data7.push(v.examPlanNum);
      });
      dataList.sort((a,b)=>b.admissionFillRatio-a.admissionFillRatio).forEach((v)=>{
        mapInfo.examTicket.province.push(v.collegeName);
        mapInfo.examTicket.familyName.push(v.familyName);
        mapInfo.examTicket.data1.push(`${(v.oldAdmissionFillRatio*100).toFixed(2)}`);
        mapInfo.examTicket.data2.push(`${(v.newAdmissionFillRatio*100).toFixed(2)}`);
        mapInfo.examTicket.data3.push(Number(v.oldAdmissionFillNum));
        mapInfo.examTicket.data4.push(Number(v.newAdmissionFillNum));
        mapInfo.examTicket.data5.push(`${(v.admissionFillRatio * 100).toFixed(2)}`);
        mapInfo.examTicket.data6.push(v.examPlanNum);
        mapInfo.examTicket.data7.push(v.admissionFillNum);
      });

      return { ...state, mapInfo };
    }
  },

  subscriptions: {
  },
};
