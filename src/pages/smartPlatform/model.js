import { message } from 'antd/lib/index';
import { getOrgInfo, getExamDateRange, getMapInfo } from './services';

export default {
  namespace: 'home',

  state: {
    orgList: [],
    dateRange: {},
    mapInfo: {},
  },

  effects: {
    *getOrgInfo({ payload }, { call, put }) {
      const result = yield call(getOrgInfo, payload.params);
      const orgList = result.data || [];
      if (result && result.code === 20000) {
        yield put({ type: 'save', payload: { orgList } });
      } else {
        message.error(result.msg);
      }
    },
    *getExamDateRange({ payload }, { call, put }) {
      const data = yield call(getExamDateRange, payload.params);
      if (data.code === 20000) {
        yield put({ type: 'save', payload: { dateRange:data.data } });
      } else {
        message.error(data.msg);
      }
    },
    *getMapInfo({ payload }, { call, put }) {
      const response = yield call(getMapInfo);
      console.log(response);

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
