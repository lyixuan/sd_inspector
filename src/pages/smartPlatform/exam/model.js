import { message } from 'antd/lib/index';
import { province, examTotal } from './services';
import { examOrg } from './services';

export default {
  namespace: 'exam',

  state: {
    porDataList: [],
    famDataMap: [],
    colDataList: [],
    groDataList: [],
    examTotal: [],
    examOrg: [],
    isShowAll: false
  },

  effects: {
    *province({ payload }, { call, put }) {
      const data = yield call(province, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'saveDataList', payload: { porDataList: data.data }, });
      } else {
        message.error(data.msg);
      }
    },
    *examTotal(_, { call, put }) {
      const response = yield call(examTotal);
      if (response.code === 20000) {
        yield put({
          type: 'saveExamTotal',
          payload: { examTotal: response.data },
        })

      } else {
        message.error(response.msg)
      }
    },
    *examOrg({ payload }, { call, put }) {
      const { orgType } = payload;
      const response = yield call(examOrg, payload);
      if (response.code === 20000) {
        if (orgType === 'college') {
          yield put({
            type: 'saveColDataList',
            payload: { colDataList: response.data },
          })
        } else if (orgType === 'family') {
          yield put({
            type: 'saveFamDataList',
            payload: { famDataList: response.data },
          })
        } else {
          yield put({
            type: 'saveGroDataList',
            payload: { isShowAll: false, groDataList: response.data },
          })
        }
      } else {
        message.error(response.msg)
      }
    },
    *allGroData({ payload }, { call, put }) {
      const response = yield call(examOrg, payload);
      if (response.code === 20000) {
        yield put({
          type: 'saveGroDataList',
          payload: { isShowAll: true, groDataList: response.data },
        });
      }
    }
  },

  reducers: {
    saveExamTotal(state, { payload }) {
      const { examTotal } = payload;
      const data = {
        examNotice: [],
        examPlan: [],
        examTicket: [],
      };
      data.examPlan = [
        {
          name: '全国考试计划人数：共',
          value: `${examTotal.examPlanNum}人`,
        }, {
          name: '老生考试计划人数：',
          value: `${examTotal.oldExamPlanNum}人`,
        }, {
          name: '新生考试计划人数：',
          value: `${examTotal.newExamPlanNum}人`,
        }, {
          name: '人均服务老生：',
          value: `${examTotal.oldAvgServiceNum}人`,
        }, {
          name: '人均服务新生：',
          value: `${examTotal.newAvgServiceNum}人`,
        }
      ];
      data.examNotice = [
        {
          name: '全国报考通知人数：共',
          value: `${examTotal.examPlanNum}人`,
        }, {
          name: '触达人数：',
          value: `${examTotal.readNum}人`,
        }, {
          name: '触达率：',
          value: `${(examTotal.readRatio * 100).toFixed(2)}%`,
        }, {
          name: '应通知新生：',
          value: `${examTotal.newReadNum}人`,
        }, {
          name: '新生触达率：',
          value: `${(examTotal.newReadRatio * 100).toFixed(2)}%`,
        }, {
          name: '应通知老生：',
          value: `${examTotal.oldReadNum}人`,
        }, {
          name: '老生触达率：',
          value: `${(examTotal.oldReadRatio * 100).toFixed(2)}%`,
        }
      ];
      data.examTicket = [
        {
          name: '全国准考证填写人数：共',
          value: `${examTotal.examPlanNum}人`,
        }, {
          name: '填写人数：',
          value: `${examTotal.admissionFillNum}人`,
        }, {
          name: '填写率：',
          value: `${(examTotal.admissionFillRatio * 100).toFixed(2)}%`,
        }, {
          name: '新生填写：',
          value: `${examTotal.newAdmissionFillNum}人`,
        }, {
          name: '新生填写率：',
          value: `${(examTotal.newAdmissionFillRatio * 100).toFixed(2)}%`,
        }, {
          name: '老生填写：',
          value: `${examTotal.oldAdmissionFillNum}人`,
        }, {
          name: '老生填写率：',
          value: `${(examTotal.oldAdmissionFillRatio * 100).toFixed(2)}%`,
        }
      ];
      return { ...state, examTotal: data };
    },
    saveDataList(state, { payload }) {
      const { porDataList } = payload;
      const dataMap = {
        examNotice: {
          province: [],
          data3: [],
          data4: [],
          data1: [],
          data2: [],
        },
        examPlan: {
          province: [],
          data3: [],
          data4: [],
          data1: [],
          data2: [],
        },
        examTicket: {
          province: [],
          data3: [],
          data4: [],
          data1: [],
          data2: [],
        },
      };

      if (porDataList) {
        porDataList.forEach(item => {
          dataMap.examPlan.province.push(item.province);
          dataMap.examPlan.data1.push(item.oldAvgServiceNum);
          dataMap.examPlan.data2.push(item.newAvgServiceNum);
          dataMap.examPlan.data3.push(item.oldExamPlanNum);
          dataMap.examPlan.data4.push(item.newExamPlanNum);
        });
        porDataList.forEach((v) => {
          dataMap.examNotice.province.push(v.province);
          dataMap.examNotice.data1.push(`${(v.oldReadRatio * 100).toFixed(2)}`);
          dataMap.examNotice.data2.push(`${(v.newReadRatio * 100).toFixed(2)}`);
          dataMap.examNotice.data3.push(v.oldReadNum);
          dataMap.examNotice.data4.push(v.newReadNum);
        });
        porDataList.forEach((v) => {
          dataMap.examTicket.province.push(v.province);
          dataMap.examTicket.data1.push(`${(v.oldAdmissionFillRatio * 100).toFixed(2)}`);
          dataMap.examTicket.data2.push(`${(v.newAdmissionFillRatio * 100).toFixed(2)}`);
          dataMap.examTicket.data3.push(v.oldAdmissionFillNum);
          dataMap.examTicket.data4.push(v.newAdmissionFillNum);
        });
      }


      return { ...state, porDataList: dataMap };
    },
    saveColDataList(state, { payload }) {
      const { colDataList } = payload;

      const mapInfo = {
        examNotice: {
          province: [],
          data3: [],
          data4: [],
          data1: [],
          data2: [],
        },
        examPlan: {
          province: [],
          data3: [],
          data4: [],
          data1: [],
          data2: [],
        },
        examTicket: {
          province: [],
          data3: [],
          data4: [],
          data1: [],
          data2: [],
        },
      };

      if (colDataList) {
        colDataList.forEach((v) => {
          mapInfo.examNotice.province.push(v.collegeName);
          mapInfo.examNotice.data1.push(`${(v.oldReadRatio * 100).toFixed(2)}`);
          mapInfo.examNotice.data2.push(`${(v.newReadRatio * 100).toFixed(2)}`);
          mapInfo.examNotice.data3.push(v.oldReadNum);
          mapInfo.examNotice.data4.push(v.newReadNum);
        });
        colDataList.forEach((v) => {
          mapInfo.examPlan.province.push(v.collegeName);
          mapInfo.examPlan.data1.push(v.oldAvgServiceNum);
          mapInfo.examPlan.data2.push(v.newAvgServiceNum);
          mapInfo.examPlan.data3.push(v.oldExamPlanNum);
          mapInfo.examPlan.data4.push(v.newExamPlanNum);
        });
        colDataList.forEach((v) => {
          mapInfo.examTicket.province.push(v.collegeName);
          mapInfo.examTicket.data1.push(`${(v.oldAdmissionFillRatio * 100).toFixed(2)}`);
          mapInfo.examTicket.data2.push(`${(v.newAdmissionFillRatio * 100).toFixed(2)}`);
          mapInfo.examTicket.data3.push(v.oldAdmissionFillNum);
          mapInfo.examTicket.data4.push(v.newAdmissionFillNum);
        });
      }


      return { ...state, colDataList: mapInfo };
    },
    saveFamDataList(state, { payload }) {
      const dataList = payload.famDataList || [];
      const mapInfo = {
        examNotice: {
          province: [],
          familyName:[],
          data3: [],
          data4: [],
          data1: [],
          data2: [],
        },
        examPlan: {
          province: [],
          familyName:[],
          data3: [],
          data4: [],
          data1: [],
          data2: [],
        },
        examTicket: {
          province: [],
          familyName:[],
          data3: [],
          data4: [],
          data1: [],
          data2: [],
        },
      };
      dataList.forEach((v) => {
        mapInfo.examNotice.province.push(v.collegeName);
        mapInfo.examNotice.familyName.push(v.familyName);
        mapInfo.examNotice.data1.push(`${(v.oldReadRatio * 100).toFixed(2)}`);
        mapInfo.examNotice.data2.push(`${(v.newReadRatio * 100).toFixed(2)}`);
        mapInfo.examNotice.data3.push(v.oldReadNum);
        mapInfo.examNotice.data4.push(v.newReadNum);
      });
      dataList.forEach((v) => {
        mapInfo.examPlan.province.push(v.collegeName);
        mapInfo.examPlan.familyName.push(v.familyName);
        mapInfo.examPlan.data1.push(v.oldAvgServiceNum);
        mapInfo.examPlan.data2.push(v.newAvgServiceNum);
        mapInfo.examPlan.data3.push(v.oldExamPlanNum);
        mapInfo.examPlan.data4.push(v.newExamPlanNum);
      });
      dataList.forEach((v) => {
        mapInfo.examTicket.province.push(v.collegeName);
        mapInfo.examTicket.familyName.push(v.familyName);
        mapInfo.examTicket.data1.push(`${(v.oldAdmissionFillRatio * 100).toFixed(2)}`);
        mapInfo.examTicket.data2.push(`${(v.newAdmissionFillRatio * 100).toFixed(2)}`);
        mapInfo.examTicket.data3.push(v.oldAdmissionFillNum);
        mapInfo.examTicket.data4.push(v.newAdmissionFillNum);
      });
      return { ...state, famDataMap: mapInfo };
    },
    saveGroDataList(state, { payload }) {
      const { groDataList, isShowAll } = payload;
      const mapInfo = {
        examNotice: {
          dataPro: [],
          data3: [],
          data1: [],
          data2: [],
        },
        examPlan: {
          dataPro: [],
          data3: [],
          data1: [],
          data2: [],
        },
        examTicket: {
          dataPro: [],
          data3: [],
          data1: [],
          data2: [],
        },
      };
      let deepGroDataList = groDataList.concat();
      if (!isShowAll) {
        deepGroDataList = deepGroDataList.slice(0, 20)
      }
      if (groDataList) {
        deepGroDataList.forEach((item) => {
          mapInfo.examNotice.dataPro.push({ name: `${item.collegeName}|${item.familyName}|${item.groupName}`, value: 100 });
          mapInfo.examNotice.data1.push({ name: (item.newReadRatio*100).toFixed(2), value: item.newExamPlanNum });
          mapInfo.examNotice.data2.push({ name: (item.oldReadRatio*100).toFixed(2), value: item.oldExamPlanNum });
          mapInfo.examNotice.data3.push({ name: (100-item.readRatio*100).toFixed(2), value: item.oldExamPlanNum });
        });
        deepGroDataList.forEach((item) => {
          mapInfo.examPlan.dataPro.push({ name: `${item.collegeName}|${item.familyName}|${item.groupName}`, value: 100 });
          mapInfo.examPlan.data1.push({ name: item.newAvgServiceNum, value: item.newExamPlanNum });
          mapInfo.examPlan.data2.push({ name: item.oldAvgServiceNum, value: item.oldExamPlanNum });
        });
        deepGroDataList.forEach((item) => {
          mapInfo.examTicket.dataPro.push({ name: `${item.collegeName}|${item.familyName}|${item.groupName}`, value: 100 });
          mapInfo.examTicket.data1.push({ name: (item.newAdmissionFillRatio*100).toFixed(2), value: item.newExamPlanNum });
          mapInfo.examTicket.data2.push({ name: (item.oldAdmissionFillRatio*100).toFixed(2), value: item.oldExamPlanNum });
          mapInfo.examTicket.data3.push({ name: (100-item.admissionFillRatio*100).toFixed(2), value: item.newAvgServiceNum });
        });
      }
      return { ...state, groDataList: mapInfo };
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {
  },
};
