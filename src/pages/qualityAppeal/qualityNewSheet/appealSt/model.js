import { message } from 'antd/lib/index';
import {checkQuality } from './services';

export default {
  namespace: 'editQualityNewSheet',

  state: {

  },

  effects: {
    *checkQuality({ payload }, { call, put }) {
      const result = yield call(checkQuality, { ...payload });
      if (result.code === 20000) {
      } else {
        message.error(result.msg);
      }
    },
  },

  reducers: {},

  subscriptions: {},
};
