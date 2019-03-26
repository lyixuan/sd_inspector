import { message } from 'antd/lib/index';
import {updateQuality } from './services';

export default {
  namespace: 'editQualityNewSheet',

  state: {

  },

  effects: {
    *updateQuality({ payload }, { call, put }) {
      const result = yield call(updateQuality, { ...payload });
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
