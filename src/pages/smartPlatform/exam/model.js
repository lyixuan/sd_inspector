import { message } from 'antd/lib/index';
import { province, examTotal } from './services';
import { examOrg } from '../services';

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
            type: 'save',
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
          dataMap.examPlan.province.push({ name: item.province, value: 100 });
          dataMap.examPlan.data1.push(item.oldAvgServiceNum);
          dataMap.examPlan.data2.push(item.newAvgServiceNum);
          dataMap.examPlan.data3.push(item.oldExamPlanNum);
          dataMap.examPlan.data4.push(item.newExamPlanNum);
        });
        porDataList.forEach((v) => {
          dataMap.examNotice.province.push({ name: v.province, value: 100 });
          dataMap.examNotice.data1.push(`${(v.oldReadRatio * 100).toFixed(2)}`);
          dataMap.examNotice.data2.push(`${(v.newReadRatio * 100).toFixed(2)}`);
          dataMap.examNotice.data3.push(v.oldReadNum);
          dataMap.examNotice.data4.push(v.newReadNum);
        });
        porDataList.forEach((v) => {
          dataMap.examTicket.province.push({ name: v.province, value: 100 });
          dataMap.examTicket.data1.push(`${(v.oldAdmissionFillRatio * 100).toFixed(2)}`);
          dataMap.examTicket.data2.push(`${(v.newAdmissionFillRatio * 100).toFixed(2)}`);
          dataMap.examTicket.data3.push(v.oldAdmissionFillNum);
          dataMap.examTicket.data4.push(v.newAdmissionFillNum);
        });
      }


      return { ...state, porDataList: dataMap };
    },
    saveFamDataList(state, { payload }) {
      const dataList = payload.famDataList || [];
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
      dataList.forEach((v) => {
        mapInfo.examNotice.province.push(v.collegeName);
        mapInfo.examNotice.data1.push(`${(v.oldReadRatio * 100).toFixed(2)}`);
        mapInfo.examNotice.data2.push(`${(v.newReadRatio * 100).toFixed(2)}`);
        mapInfo.examNotice.data3.push(v.oldReadNum);
        mapInfo.examNotice.data4.push(v.newReadNum);
      });
      dataList.forEach((v) => {
        mapInfo.examPlan.province.push(v.collegeName);
        mapInfo.examPlan.data1.push(v.oldAvgServiceNum);
        mapInfo.examPlan.data2.push(v.newAvgServiceNum);
        mapInfo.examPlan.data3.push(v.oldExamPlanNum);
        mapInfo.examPlan.data4.push(v.newExamPlanNum);
      });
      dataList.forEach((v) => {
        mapInfo.examTicket.province.push(v.collegeName);
        mapInfo.examTicket.data1.push(`${(v.oldAdmissionFillRatio * 100).toFixed(2)}`);
        mapInfo.examTicket.data2.push(`${(v.newAdmissionFillRatio * 100).toFixed(2)}`);
        mapInfo.examTicket.data3.push(v.oldAdmissionFillNum);
        mapInfo.examTicket.data4.push(v.newAdmissionFillNum);
      });
      return { ...state, famDataMap: mapInfo };
    },
    saveGroDataList(state, { payload }) {
      const { groDataList, isShowAll } = payload;
      console.log(isShowAll)
      const dataPro = {
        dataPro: [],
        data1: [],
        data2: [],
        data3: [],
      };
      if (groDataList) {
        groDataList.map((item, i) => {
          if (!isShowAll) {
            if (i < 20) {
              dataPro.dataPro.push({ name: `${item.collegeName}|${item.familyName}|${item.groupName}`, value: 1000 });
              dataPro.data1.push(
                { name: item.newAvgServiceNum, value: item.newExamPlanNum },
              );
              dataPro.data2.push({ name: item.oldAvgServiceNum, value: item.oldExamPlanNum })
              // dataPro.data3.push(item.oldExamPlanNum);
            }
          } else {
            dataPro.dataPro.push({ name: `${item.collegeName}|${item.familyName}|${item.groupName}`, value: 1000 });
            dataPro.data1.push(
              { name: item.newAvgServiceNum, value: item.newExamPlanNum },
            );
            dataPro.data2.push({ name: item.oldAvgServiceNum, value: item.oldExamPlanNum })
            // dataPro.data3.push(item.oldExamPlanNum);
          }
          return dataPro
        });
      }
      return { ...state, groDataList: dataPro };
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {
  },
};
