import { message } from 'antd/lib/index';
import { routerRedux } from 'dva/router';
import { launchAppeal, uploadFile } from './services';

export default {
  namespace: 'Launch',

  state: {
    lunchData: null
  },

  effects: {
    *uploadFile({ payload }, { call, put }) {
      const result = yield call(uploadFile, { ...payload });
      if (result.code === 20000) {
        yield put({ type: 'save' });
      } else {
        message.error(result.msg);
      }
    },
    *launchAppeal({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(launchAppeal, params);
      if (result.code === 20000) {
        yield put(routerRedux.push('/qualityAppeal/qualityAppeal'));
      } else {
        message.error(result.msg);
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
