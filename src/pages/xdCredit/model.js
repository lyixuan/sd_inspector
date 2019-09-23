import {
  getUserInfo,
  getUserOrgList,
  getDimensionList,
  getDimensionDetail,
  getKpiDateRange,
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";

export default {
  namespace: 'xdCreditModal',
  state: {
    dimensionList: [],
    dimensionDetails: {
      data: [],
      titleOne: '',
      titleTwo: '',
      titleThree: '',
    },
    kpiDateRange: {},
  },

  effects: {
    *getUserInfo({ callback }, { call }) {
      const result = yield call(getUserInfo);
      if (result.code === 20000 && result.data) {
        if (callback && typeof callback === 'function') {
          callback(result.data.scoreView);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getUserOrgList({ callback }, { call, put }) {
      const result = yield call(getUserOrgList);
      if (result.code === 20000) {
        const res = result.data;
        if (callback && typeof callback === 'function') {
          callback(res);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getDimensionList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getDimensionList, params);
      if (result.code === 20000) {
        const res = result.data;
        if (res && res !== null) yield put({ type: 'save', payload: { dimensionList: res } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getDimensionDetail({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getDimensionDetail, params);
      if (result.code === 20000) {
        const res = result.data;
        if (res && res !== null) yield put({ type: 'save', payload: { dimensionDetails: res } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getKpiDateRange({ callback }, { call, put }) {
      const result = yield call(getKpiDateRange);
      if (result.code === 20000) {
        const res = result.data;
        if (res && res !== null) {
          yield put({ type: 'save', payload: { kpiDateRange: res } });
          if (callback && typeof callback === 'function') {
            callback(res);
          }
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},
};
