import { message } from 'antd/lib/index';
import { getData } from './services';

export default {
  namespace: 'PushDataModel',

  state: {
    dataList: []
  },

  effects: {
    *getData({ payload }, { call, put }) {
      const data = yield call(getData, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'save', payload: { dataList: data.data } });
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
