import { message } from 'antd/lib/index';
import { queryHistogramData, getMapInfo } from './services';

export default {
  namespace: 'survey',

  state: {
    dataList: [],
    mapInfo: [],
  },

  effects: {
    *queryHistogramData({ payload }, { call, put }) {
      const data = yield call(queryHistogramData, { ...payload });
      if (data && data.code === 2000) {
        yield put({ type: 'save', payload: { dataList: data } });
      } else {
        message.error(data.msg);
      }
    },
    *getMapInfo(_, { call, put }) {
      const response = yield call(getMapInfo);
      if (response.code === 20000) {
        yield put({
          type: 'saveMapInfo',
          payload: { mapInfo: response.data },
        })
      } else {
        message.error(response.msg);
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveMapInfo(state, { payload }) {
      return { ...state, ...payload }
    }
  },

  subscriptions: {
  },
};
