import { message } from 'antd/lib/index';
import { queryHistogramData } from './services';

export default {
  namespace: 'survey',

  state: {
    dataList:[],
  },

  effects: {
    *queryHistogramData({ payload }, { call, put }) {
      const data = yield call(queryHistogramData, {...payload});
      if (data && data.code === 2000) {
        yield put({ type: 'save', payload: { dataList:data } });
      } else {
        message.error(data.msg);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
