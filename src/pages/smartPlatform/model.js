import { message } from 'antd/lib/index';
import { getOrgInfo,getExamDateRange } from './services';

export default {
  namespace: 'home',

  state: {
    orgList:[],
    dateRange:{},
  },

  effects: {
    *getOrgInfo({ payload }, { call, put }) {
      const data = yield call(getOrgInfo, payload.params);
      if (data.code === 20000) {
        yield put({ type: 'save', payload: { orgList:data.data} });
      } else {
        message.error(data.msg);
      }
    },
    *getExamDateRange({ payload }, { call, put }) {
      const data = yield call(getExamDateRange, payload.params);
      if (data.code === 20000) {
        yield put({ type: 'save', payload: { dateRange:data.data } });
      } else {
        message.error(data.msg);
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
