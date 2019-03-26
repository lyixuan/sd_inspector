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
        message.success('提交成功');
      } else {
        message.error(result.msgDetail);
      }
    },
  },

  reducers: {},

  subscriptions: {},
};
