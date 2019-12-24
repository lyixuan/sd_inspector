import {
  getIncomeCollegeList,
  getIncomeDetailPage,
  getIncomeOrder,
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';
import { getWorkbenchIncome } from '@/pages/indexPage/services';

export default {
  namespace: 'incomeOrderModal',
  state: {
    incomeCollegeList: [],
    incomeDateRange: undefined,
    IncomeData:{},
    IncomeOrder:{},
    IncomeOrderCollege:[],
    IncomeOrderFamily:[],
    IncomeOrderGroup:[],
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
    *getIncomeDetailPage(_, { call, put }) {
      const result = yield call(getIncomeDetailPage);
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
    *getWorkbenchIncome({ payload, callback }, { call, put }) {
      const result = yield call(getWorkbenchIncome, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { IncomeData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getIncomeOrder({ payload, callback }, { call, put }) {
      yield put({ type: 'getIncomeOrderCollege', payload});
      yield put({ type: 'getIncomeOrderFamily', payload});
      yield put({ type: 'getIncomeOrderGroup', payload});
    },
    *getIncomeOrderCollege({ payload, callback }, { call, put }) {
      const params = {...{rankType:'college'},...payload.params};
      const result = yield call(getIncomeOrder, params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { IncomeOrderCollege: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getIncomeOrderFamily({ payload, callback }, { call, put }) {
      const params = {...{rankType:'family'},...payload.params};
      const result = yield call(getIncomeOrder, params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { IncomeOrderFamily: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getIncomeOrderGroup({ payload, callback }, { call, put }) {
      const params = {...{rankType:'group'},...payload.params};
      const result = yield call(getIncomeOrder, params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { IncomeOrderGroup: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
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
