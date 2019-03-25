import { message } from 'antd/lib/index';
import {  getAppealInfo, reviewAppeal,getQualityDetail } from './services';

export default {
  namespace: 'qualityAppealing',

  state: {
    appealReview: null,
    appealShow: [],
    qualityDetailData: {},
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
      const result = yield call(reviewAppeal, { ...payload });
      console.log(14, result)
      const appealReview = result.data ? result.data : [];
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { appealReview } });
      } else {
        message.error(result.msg);
      }
    },
    *getQualityDetailData({ payload }, { call, put }) {
      //质检详情数据
      const result = yield call(getQualityDetail, { ...payload });
      const qualityDetailData = result.data ? result.data : {};
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { qualityDetailData } });
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
