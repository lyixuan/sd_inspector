import { message } from 'antd/lib/index';
import { sopCheckAppeal } from './services';

export default {
  namespace: 'EditAppeal',

  state: {
  },

  effects: {
    *sopCheckAppeal({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(sopCheckAppeal, params);
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
