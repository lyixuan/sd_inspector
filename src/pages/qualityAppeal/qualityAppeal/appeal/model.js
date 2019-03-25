import { message } from 'antd/lib/index';
import {  getAppealInfo, reviewAppel } from './services';

export default {
  namespace: 'createPointBook',

  state: {
    appealReview: null,
    appealShow: null,
  },

  effects: {
    *getAppealInfo({ payload }, { call, put }) {
      const result = yield call(getAppealInfo, { ...payload });
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { appealShow:result.data } });
      } else {
        message.error(result.msg);
      }
    },
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
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {
  },
};
