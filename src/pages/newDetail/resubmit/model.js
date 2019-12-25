import {
  getIncomeCollegeList,
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'resubmitModal',
  state: {
    incomeCollegeList: [],
    paramsQuery: {

    }
  },

  effects: {
    // 家族-学院列表
    *getIncomeCollegeList(_, { call, put }) {
      const result = yield call(getIncomeCollegeList);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { incomeCollegeList: result.data } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveParams(state, { payload }) {
      return { ...state, paramsQuery: { ...state.paramsQuery, ...payload } };
    },
  },
  subscriptions: {},
};
