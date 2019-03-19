import { message } from 'antd/lib/index';
import { provinceJson } from '@/utils/constants'
import { getOrgInfo, getExamDateRange } from './services';

export default {
  namespace: 'home',

  state: {
    orgList: [],
    provinceJson: [],
    dateRange: {},
  },

  effects: {
    *getOrgInfo({ payload }, { call, put }) {
      const result = yield call(getOrgInfo, { ...payload });
      const orgList = result.data || [];
      if (result && result.code === 20000) {
        yield put({ type: 'save', payload: { orgList } });
      } else {
        message.error(result.msg);
      }
    },
    *getExamDateRange({ payload }, { call, put }) {
      const data = yield call(getExamDateRange, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'save', payload: { dateRange: data.data } });
      } else {
        message.error(data.msg);
      }
    },
    *getProvinceJson({ payload }, { _, put }) {
      yield put({ type: 'save', payload: { provinceJson } });
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
