import { message } from 'antd/lib/index';
import { getAppealInfo, reviewAppeal, getQualityDetail, sopAppeal } from './services';
import router from 'umi/router';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'qualityAppealing',

  state: {
    appealReview: null,
    appealShow: [],
    qualityDetailData: {}
  },

  effects: {
    *getAppealInfo({ payload }, { call, put }) {
      const result = yield call(getAppealInfo, { ...payload });
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { appealShow: result.data } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *sopAppeal({ payload }, { call, put }) {
      const result = yield call(sopAppeal, { ...payload.params });
      if (result.code === 20000) {
        router.goBack();
      } else {
        message.error(msgF(result.msg, result.msgDetail));
        if(Number(result.code) === 20005){
          window.history.go(-1);
        }
      }
    },
    *reviewAppeal({ payload }, { call, put }) {
      const result = yield call(reviewAppeal, { ...payload });
      if (result.code === 20000) {
        const appealReview = result.data ? result.data : [];
        yield put({ type: 'save', payload: { appealReview } });
        router.goBack();
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getQualityDetailData({ payload }, { call, put }) {
      //质检详情数据
      const result = yield call(getQualityDetail, { ...payload });
      const qualityDetailData = result.data ? result.data : {};
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { qualityDetailData } });
      } else {
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
