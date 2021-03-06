import { message } from 'antd/lib/index';
import { getAppealDetail, getQualityDetail } from './service';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'appealDetail',

  state: {
    DetailData: [],
  },

  effects: {
    *getDetailData({ payload }, { call, put }) {
      //申诉详情页数据
      const result = yield call(getAppealDetail, { ...payload });
      const DetailData = result.data ? result.data : [];

      if (result.code === 20000) {
        yield put({ type: 'saveDetailData', payload: { DetailData} });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
  },

  reducers: {
    saveDetailData(state, { payload }) {
      const { DetailData } = payload;
      if (DetailData) {
        DetailData.forEach((item, i) => {
          DetailData[i].key = i + 1;
        });
      }
      return { ...state, ...payload };
    },
    saveQualityDetailData(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};
