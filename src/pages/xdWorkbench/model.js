import {
  getContrastIncomeKpiPkList,
  getIncomeKpiPkList,
  getIncomeKpiPersonInfo,
  getCountCurrentQuality,
  getCountAppealRecord,
  kpiLevelList,
} from './services';
import { message } from 'antd/lib/index';
import {msgF} from "@/utils/utils";

export default {
  namespace: 'xdWorkModal',

  state: {
    kpiLevelList:null
  },

  effects: {
    // 本期创收
    *getContrastIncomeKpiPkList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getContrastIncomeKpiPkList, params);
      if (result.code === 20000) {
        message.success('保存成功！');
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getIncomeKpiPkList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getIncomeKpiPkList, params);
      if (result.code === 20000) {
        message.success('保存成功！');
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getIncomeKpiPersonInfo({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getIncomeKpiPersonInfo, params);
      if (result.code === 20000) {
        message.success('保存成功！');
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 本期质检
    *getCountCurrentQuality({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getCountCurrentQuality, params);
      if (result.code === 20000) {
        message.success('保存成功！');
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
     // 我的申诉
    *getCountAppealRecord({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getCountAppealRecord, params);
      if (result.code === 20000) {
        message.success('保存成功！');
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 以下是本期学分相关的接口
    // 本期学分人均在服人员下拉里面的数据
    *kpiLevelList({payload},{call,put}){
      const params = payload.params;
      const result = yield call(kpiLevelList,params)
      if (result.code === 20000) {
        const kpiLevelList = result.data || {};
        yield put({ type: 'save', payload: { kpiLevelList} });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  //
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},
};
