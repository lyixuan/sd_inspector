import { message } from 'antd/lib/index';
import { province, examTotal } from './services';
import { examOrg } from './services';
import { msgF } from '@/utils/utils';

function sortdata(datalist, name) {
  let deepGroDataList = datalist.concat();
  return deepGroDataList.sort((a, b) => b[name] - a[name]);
}
export default {
  namespace: 'exam',

  state: {
    porDataList: [],
    famDataMap: [],
    colDataList: [],
    groDataList: [],
    examTotal: [],
    examOrg: []
  },

  effects: {
    *province({ payload }, { call, put }) {
      const data = yield call(province, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'saveDataList', payload: { porDataList: data.data }, });
      } else {
        message.error(msgF(data.msg,data.msgDetail));
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
        message.error(msgF(response.msg,response.msgDetail))
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
            payload: { groDataList: response.data },
          })
        }
      } else {
        message.error(msgF(response.msg,response.msgDetail))
      }
    },
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
          value: `${examTotal.newExamPlanNum}人`,
        }, {
          name: '新生触达率：',
          value: `${(examTotal.newReadRatio * 100).toFixed(2)}%`,
        }, {
          name: '应通知老生：',
          value: `${examTotal.oldExamPlanNum}人`,
        }, {
          name: '老生触达率：',
          value: `${(examTotal.oldReadRatio * 100).toFixed(2)}%`,
        }
      ];
      data.examTicket = [
        {
          name: '全国考试计划人数：共',
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
          province: [],// 省份名字
          data1: [],
          data2: [],
          data3: [],
          data4: [],
          data5: [],
          data6: [],//考试计划人数
          data7: [],//触达人数
        },
        examPlan: {
          province: [],
          data1: [],
          data2: [],
          data3: [],
          data4: [],
          data5: [],
          data6: [],//考试计划人数
          data7: [],//考试计划人数
        },
        examTicket: {
          province: [],
          data1: [],
          data2: [],
          data3: [],
          data4: [],
          data5: [],
          data6: [],//考试计划人数
          data7: [],//填写人数
        },
      };
      if (porDataList) {
        sortdata(porDataList, 'examPlanNum').forEach(item => {
          dataMap.examPlan.province.push(item.province);
          dataMap.examPlan.data1.push(Number(item.oldAvgServiceNum));
          dataMap.examPlan.data2.push(Number(item.newAvgServiceNum));
          dataMap.examPlan.data3.push(Number(item.oldExamPlanNum));
          dataMap.examPlan.data4.push(Number(item.newExamPlanNum));
          dataMap.examPlan.data6.push(Number(item.examPlanNum));
        });
        sortdata(porDataList, 'readRatio').forEach((v) => {
          dataMap.examNotice.province.push(v.province);
          dataMap.examNotice.data1.push(`${(v.oldReadRatio * 100).toFixed(2)}`);
          dataMap.examNotice.data2.push(`${(v.newReadRatio * 100).toFixed(2)}`);
          dataMap.examNotice.data3.push(Number(v.oldExamPlanNum));
          dataMap.examNotice.data4.push(Number(v.newExamPlanNum));
          dataMap.examNotice.data5.push(`${(v.readRatio * 100).toFixed(2)}`);
          dataMap.examNotice.data7.push(Number(v.readNum));
          dataMap.examNotice.data6.push(Number(v.examPlanNum));
        });
        sortdata(porDataList, 'admissionFillRatio').forEach((v) => {
          dataMap.examTicket.province.push(v.province);
          dataMap.examTicket.data1.push(`${(v.oldAdmissionFillRatio * 100).toFixed(2)}`);
          dataMap.examTicket.data2.push(`${(v.newAdmissionFillRatio * 100).toFixed(2)}`);
          dataMap.examTicket.data3.push(Number(v.oldAdmissionFillNum));
          dataMap.examTicket.data4.push(Number(v.newAdmissionFillNum));
          dataMap.examTicket.data5.push(`${(v.admissionFillRatio * 100).toFixed(2)}`);
          dataMap.examTicket.data7.push(Number(v.admissionFillNum));
          dataMap.examTicket.data6.push(Number(v.examPlanNum));
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
          data5: [],
          data6: [],
          data7: [],
          data1: [],
          data2: [],
        },
        examPlan: {
          province: [],
          data3: [],
          data4: [],
          data5: [],
          data6: [],
          data7: [],
          data1: [],
          data2: [],
        },
        examTicket: {
          province: [],
          data3: [],
          data4: [],
          data5: [],
          data6: [],
          data7: [],
          data1: [],
          data2: [],
        },
      };

      if (colDataList) {
        sortdata(colDataList, 'examPlanNum').forEach((v) => {
          mapInfo.examPlan.province.push(v.collegeName);
          mapInfo.examPlan.data1.push(Number(v.oldAvgServiceNum));
          mapInfo.examPlan.data2.push(Number(v.newAvgServiceNum));
          mapInfo.examPlan.data3.push(Number(v.oldExamPlanNum));
          mapInfo.examPlan.data4.push(Number(v.newExamPlanNum));
          mapInfo.examPlan.data6.push(Number(v.examPlanNum));
          // mapInfo.examPlan.data7.push(v.readNum);
        });
        sortdata(colDataList, 'readRatio').forEach((v) => {
          mapInfo.examNotice.province.push(v.collegeName);
          mapInfo.examNotice.data1.push(`${(v.oldReadRatio * 100).toFixed(2)}`);
          mapInfo.examNotice.data2.push(`${(v.newReadRatio * 100).toFixed(2)}`);
          mapInfo.examNotice.data3.push(Number(v.oldExamPlanNum));
          mapInfo.examNotice.data4.push(Number(v.newExamPlanNum));
          mapInfo.examNotice.data5.push(`${(v.readRatio * 100).toFixed(2)}`);
          mapInfo.examNotice.data6.push(Number(v.examPlanNum));
          mapInfo.examNotice.data7.push(v.readNum);
        });
        sortdata(colDataList, 'admissionFillRatio').forEach((v) => {
          mapInfo.examTicket.province.push(v.collegeName);
          mapInfo.examTicket.data1.push(`${(v.oldAdmissionFillRatio * 100).toFixed(2)}`);
          mapInfo.examTicket.data2.push(`${(v.newAdmissionFillRatio * 100).toFixed(2)}`);
          mapInfo.examTicket.data3.push(Number(v.oldAdmissionFillNum));
          mapInfo.examTicket.data4.push(Number(v.newAdmissionFillNum));
          mapInfo.examTicket.data5.push(`${(v.admissionFillRatio * 100).toFixed(2)}`);
          mapInfo.examTicket.data6.push(Number(v.examPlanNum));
          mapInfo.examTicket.data7.push(v.admissionFillNum);
        });
      }

      return { ...state, colDataList: mapInfo };
    },
    saveFamDataList(state, { payload }) {
      const dataList = payload.famDataList || [];
      const mapInfo = {
        examNotice: {
          province: [],
          familyName: [],
          data3: [],
          data4: [],
          data5: [],
          data6: [],// 考试计划人数
          data7: [],// 通知人数
          data1: [],
          data2: [],
        },
        examPlan: {
          province: [],
          familyName: [],
          data3: [],
          data4: [],
          data5: [],
          data6: [],// 考试计划人数
          data7: [],// 考试计划人数
          data1: [],
          data2: [],
        },
        examTicket: {
          province: [],
          familyName: [],
          data3: [],
          data4: [],
          data5: [],
          data6: [],// 考试计划人数
          data7: [],// 准考证填写人数
          data1: [],
          data2: [],
        },
      };
      if (dataList) {
        sortdata(dataList, 'examPlanNum').forEach((v) => {
          mapInfo.examPlan.province.push(v.collegeName);
          mapInfo.examPlan.familyName.push(v.familyName);
          mapInfo.examPlan.data1.push(Number(v.oldAvgServiceNum));
          mapInfo.examPlan.data2.push(Number(v.newAvgServiceNum));
          mapInfo.examPlan.data3.push(Number(v.oldExamPlanNum));
          mapInfo.examPlan.data4.push(Number(v.newExamPlanNum));
          mapInfo.examPlan.data6.push(v.examPlanNum);
          mapInfo.examPlan.data7.push(v.examPlanNum);
        });
        sortdata(dataList, 'readRatio').forEach((v) => {
          mapInfo.examNotice.province.push(v.collegeName);
          mapInfo.examNotice.familyName.push(v.familyName);
          mapInfo.examNotice.data1.push(`${(v.oldReadRatio * 100).toFixed(2)}`);
          mapInfo.examNotice.data2.push(`${(v.newReadRatio * 100).toFixed(2)}`);
          mapInfo.examNotice.data3.push(Number(v.oldExamPlanNum));
          mapInfo.examNotice.data4.push(Number(v.newExamPlanNum));
          mapInfo.examNotice.data5.push(`${(v.readRatio * 100).toFixed(2)}`);
          mapInfo.examNotice.data6.push(v.examPlanNum);
          mapInfo.examNotice.data7.push(v.readNum);
        });
        sortdata(dataList, 'admissionFillRatio').forEach((v) => {
          mapInfo.examTicket.province.push(v.collegeName);
          mapInfo.examTicket.familyName.push(v.familyName);
          mapInfo.examTicket.data1.push(`${(v.oldAdmissionFillRatio * 100).toFixed(2)}`);
          mapInfo.examTicket.data2.push(`${(v.newAdmissionFillRatio * 100).toFixed(2)}`);
          mapInfo.examTicket.data3.push(Number(v.oldAdmissionFillNum));
          mapInfo.examTicket.data4.push(Number(v.newAdmissionFillNum));
          mapInfo.examTicket.data5.push(`${(v.admissionFillRatio * 100).toFixed(2)}`);
          mapInfo.examTicket.data6.push(v.examPlanNum);
          mapInfo.examTicket.data7.push(v.admissionFillNum);
        });
      }

      return { ...state, famDataMap: mapInfo };
    },
    saveGroDataList(state, { payload }) {
      const { groDataList } = payload;
      const mapInfo = {
        examNotice: {
          dataPro: [],
          data3: [],
          data4: [],
          data5: [],// 触达人数/触达率
          data1: [],
          data2: [],
          dataRatio: [],
        },
        examPlan: {
          dataPro: [],
          data3: [],
          data4: [],
          data5: [],// 触达人数/触达率
          data1: [],
          data2: [],
        },
        examTicket: {
          dataPro: [],
          data3: [],
          data4: [],// 考试计划人数
          data5: [],// 触达人数/触达率
          data1: [],
          data2: [],
          dataRatio: [],
        },
      };

      if (groDataList) {
        sortdata(groDataList, 'examPlanNum').forEach((item) => {
          mapInfo.examPlan.dataPro.push({ name: `${item.collegeName}  |  ${item.familyName} | ${item.groupName}`, value: 100 });
          mapInfo.examPlan.data1.push({ name: Number(item.newAvgServiceNum), value: Number(item.newExamPlanNum) });
          mapInfo.examPlan.data2.push({ name: Number(item.oldAvgServiceNum), value: Number(item.oldExamPlanNum) });
          mapInfo.examPlan.data4.push(item.examPlanNum);
        });
        sortdata(groDataList, 'readRatio').forEach((item) => {
          mapInfo.examNotice.dataPro.push({ name: `${item.collegeName} | ${item.familyName} | ${item.groupName}`, value: 100 });
          mapInfo.examNotice.data1.push({ name: `${(item.newReadRatio * 100).toFixed(2)}%`, value: Number(item.newExamPlanNum) });
          mapInfo.examNotice.data2.push({ name: `${(item.oldReadRatio * 100).toFixed(2)}%`, value: Number(item.oldExamPlanNum) });
          mapInfo.examNotice.data3.push({ name: `${(100 - item.readRatio * 100).toFixed(2)}%`, value: Number(item.examPlanNum - item.readNum) });
          mapInfo.examNotice.data5.push({ name: `${(item.readRatio * 100).toFixed(2)}%`, value: Number(item.readNum) });
          mapInfo.examNotice.data4.push(item.examPlanNum);
          mapInfo.examNotice.dataRatio.push(`${(item.readRatio * 100).toFixed(2)}`);
        });
        sortdata(groDataList, 'admissionFillRatio').forEach((item) => {
          mapInfo.examTicket.dataPro.push({ name: `${item.collegeName} | ${item.familyName} | ${item.groupName}`, value: 100 });
          mapInfo.examTicket.data1.push({ name: `${(item.newAdmissionFillRatio * 100).toFixed(2)}%`, value: Number(item.newAdmissionFillNum) });
          mapInfo.examTicket.data2.push({ name: `${(item.oldAdmissionFillRatio * 100).toFixed(2)}%`, value: Number(item.oldAdmissionFillNum) });
          mapInfo.examTicket.data3.push({ name: `${(100 - item.admissionFillRatio * 100).toFixed(2)}%`, value: Number(item.examPlanNum - item.admissionFillNum) });
          mapInfo.examTicket.data4.push(item.examPlanNum);
          mapInfo.examTicket.data5.push({ name: `${(item.admissionFillRatio * 100).toFixed(2)}%`, value: Number(item.admissionFillNum) });
          mapInfo.examTicket.dataRatio.push(`${(item.admissionFillRatio * 100).toFixed(2)}`);
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
