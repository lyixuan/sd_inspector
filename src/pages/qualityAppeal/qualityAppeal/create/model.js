import { message } from 'antd/lib/index';
import { uploadFile, reviewAppel, getOrderNum } from './services';

export default {
  namespace: 'createAppeal12',
  state: {
    appealReview: null,
    orderData: null
  },

  effects: {
    *uploadFile({ payload }, { call, put }) {
      const result = yield call(uploadFile, { ...payload });
      console.log(155, result)
      if (result.code === 20000) {
        yield put({ type: 'save' });
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
    *getOrderNum111({ payload }, { call, put }) {
      const result = yield call(getOrderNum, { ...payload });
      console.log(14, result)
      const orderData = result.data ? result.data : [];
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { orderData } });
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

  subscriptions: {},
};