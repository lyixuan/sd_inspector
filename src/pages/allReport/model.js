import { message } from 'antd';
import { msgF } from '@/utils/utils';
import { getMessage } from './services';


export default {
  namespace: 'reportPlan',

  state: {
  },

  effects: {
    *getReportMessage({ payload, callback }, { call }) {
      const response = yield call(getMessage, payload);
      if (response.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(response.data);
        }
      } else {
        response && message.error(response.msg)
      }

    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},
};
