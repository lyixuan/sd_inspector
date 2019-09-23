import {
  getUserInfo,
  getUserOrgList,
  getDimensionList,
  getDimensionDetail,
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";

export default {
  namespace: 'xdCreditModal',
  state: {
    userOrgConfig: [],
    dimensionList: [],
    dimensionDetails: {
      // data: [{
      //   valOne: '111',
      //   valTwo: '2222',
      //   valThree: '123Z',
      //   valFour: '111'
      // }],
      data: [],
      titleOne: '1',
      titleTwo: '1',
      titleThree: '1',
    }
  },

  effects: {
    *getUserInfo({ callback }, { call }) {
      const result = yield call(getUserInfo);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(true);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getUserOrgList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(getUserOrgList, params);
      if (result.code === 20000) {
        const res = result.data;
        if (res && res !== null && res.data.length > 0) {
          yield put({ type: 'save', payload: { userOrgConfig: res } });
          if (callback && typeof callback === 'function') {
            callback(true);
          }
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
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},
};
