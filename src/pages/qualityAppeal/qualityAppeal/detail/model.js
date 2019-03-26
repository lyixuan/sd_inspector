import { message } from 'antd/lib/index';
import { getAppealDetail, getQualityDetail } from './service';

export default {
  namespace: 'appealDetail',

  state: {
    DetailData: [],
    QualityDetailData: {},
  },

  effects: {
    *getDetailData({ payload }, { call, put }) {
      //申诉详情页数据
      const result = yield call(getAppealDetail, { ...payload });
      const DetailData = result.data ? result.data : [];
      DetailData.forEach((v, i) => {
        // DetailData[i].createTime = moment(v.createTime).format('YYYY-MM-DD HH:mm:ss')
      });
      if (result.code === 20000) {
        yield put({ type: 'saveDetailData', payload: { DetailData } });
      } else {
        message.error(result.msg);
      }
    },
    *getQualityDetailData({ payload }, { call, put }) {
      //申诉详情页数据
      const result = yield call(getQualityDetail, { ...payload });
      const QualityDetailData = result.data ? result.data : {};
      if (result.code === 20000) {
        yield put({ type: 'saveQualityDetailData', payload: { QualityDetailData } });
      } else {
        message.error(result.msg);
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
