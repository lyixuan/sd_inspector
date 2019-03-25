import { message } from 'antd/lib/index';
import {  reviewAppel } from './services';

export default {
  namespace: 'createPointBook',

  state: {
    appealReview: null,
  },

  effects: {
    *reviewAppel({ payload }, { call, put }) {
      const result = yield call(reviewAppel, { ...payload });
      console.log(14, result)
      const appealReview = result.data ? result.data : [];
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { appealReview } });
      } else {
        message.error(result.msg);
      }
    },
  },

  reducers: {
  },

  subscriptions: {
  },
};
