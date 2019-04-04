import { message } from 'antd/lib/index';
import { getQualityDetail } from './service';

export default {
  namespace: 'qualityDetail',

  state: {
    QualityDetailData: {},
  },

  effects: {
    *getQualityDetailData({ payload }, { call, put }) {
      //质检详情页数据
      const result = yield call(getQualityDetail, { ...payload });
      const QualityDetailData = result.data ? result.data : {};
      if (result.code === 20000) {
        yield put({ type: 'saveQualityDetailData', payload: { QualityDetailData } });
      } else {
        message.error(result.msg + result.msgDetail);
      }
    },
  },

  reducers: {
    saveQualityDetailData(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};
