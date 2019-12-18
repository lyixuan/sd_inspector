import {
  getIncomeCollegeList,
  getKpiDateRange,
  getIncomeFamilyList,
  getFamilyList,
  getIncomeFamilyGroupPk,
  getIncomeGroupList,
  compareCollegeList,
  getIncomeKpiPkList,
  getContrastIncomeKpiPkList
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';
import moment from 'moment';

export default {
  namespace: 'incomeRankModal',
  state: {
    globalCollegeList: [],
    familyIncomeList: {}, // 创收对比家族
    familyIncomeDrawer: [],
    groupIncomeList: {}, // 创收对比小组
    groupIncomeDrawer: [],
    compareCollegeListData: [], // 学院创收对比
  },

  effects: {
    // 家族-学院列表
    *getIncomeCollegeList(_, { call, put }) {
      const result = yield call(getIncomeCollegeList);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { globalCollegeList: result.data } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 日期
    *getKpiDateRange({ callback }, { call, put }) {
      const result = yield call(getKpiDateRange);
      if (result.code === 20000) {
        const res = result.data;
        if (res && res !== null) {
          const dateRange = [ moment(res.endDate), moment(res.endDate) ]
          yield put({ type: 'save', payload: { globalDateRange: res} });
          if (callback && typeof callback === 'function') {
            callback(dateRange);
          }
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  家族创收对比
    *getIncomeFamilyList({ payload }, { call, put }) {
      const result = yield call(getIncomeFamilyList, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'saveMax', payload: { data: result.data, key: 'familyIncomeList' } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 家族创收对比右侧的家族绩效列表
    *getFamilyList({ payload, callback }, { call, put }) {
      const result = yield call(getFamilyList, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { familyIncomeDrawer: result.data } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 家族创收对比-小组创收对比
    *getIncomeFamilyGroupPk({ payload, callback }, { call, put }) {
      const result = yield call(getIncomeFamilyGroupPk, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'saveMax', payload: { data: result.data, key: 'groupIncomeList' } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 家族创收对比右侧的家族绩效列表
    *getIncomeGroupList({ payload, callback }, { call, put }) {
      const result = yield call(getIncomeGroupList, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { groupIncomeDrawer: result.data } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 创收学院对比列表
    *getCompareCollegeList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(compareCollegeList, params);
      if (result.code === 20000) {
        yield put({
          type: 'save',
          payload: {
            compareCollegeListData: result.data,
          },
        });
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 班主任
    *getIncomeKpiPkList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getIncomeKpiPkList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result.code === 50000) {
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期创收
    *getContrastIncomeKpiPkList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(getContrastIncomeKpiPkList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
        yield put({ type: 'save', payload: { groupIncomePk: result.data } });
      } else if (result.code === 50000) {
        if (callback && typeof callback === 'function') {
          callback();
        }
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