import { message } from 'antd/lib/index';
import { launchAppeal } from './services';

export default {
  namespace: 'Launch',

  state: {
    lunchData: null
  },

  effects: {
    *launchAppeal({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(launchAppeal, params);
      console.log(14, result)
      let lunchData = result.data
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { lunchData } });
      } else {
        message.error(result.msgDetail);
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
