import { message } from 'antd/lib/index';
import { queryHistogramData, getMapInfo } from './services';

export default {
  namespace: 'exam',

  state: {
    dataList: [],
    mapInfo: [],
  },

  effects: {
    *queryHistogramData({ payload }, { call, put }) {
      const data = yield call(queryHistogramData, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'saveDataList' , payload: { dataList: data.data },});
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
        message.error(response.msg)
      }
    }
  },

  reducers: {
    saveDataList(state, { payload }) {
      const { dataList } = payload;
    },
    saveMapInfo(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {
  },
};
