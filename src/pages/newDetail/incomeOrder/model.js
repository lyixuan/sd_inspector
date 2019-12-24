import {
  getIncomeCollegeList,
  getIncomeDetailPage
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'incomeOrderModal',
  state: {
    incomeCollegeList: [],
    incomeDateRange: undefined
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
    // 创收排名接口
    *getIncomeDetailPage({ payload }, { call, put }) {
      const result = yield call(getIncomeDetailPage, payload.params);
      if (result.code === 20000) {
        return result.data;
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 创收排名时间储存
    *getIncomeDate({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { incomeDateRange: payload.date } });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveMax(state, { payload }) {
      const pkList = payload.data;
      const maxValue = {};
      for (var k in pkList[0]) {
        maxValue[k] = Math.max.apply(null, pkList.map(item => item[k]));
      }
      return { ...state, [payload.key]: { maxValue, pkList } };
    },
  },
  subscriptions: {},
};