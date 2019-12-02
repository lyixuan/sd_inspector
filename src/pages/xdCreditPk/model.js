import {
  kpiLevelList,
  getIncomeCollegeList,
  groupList,
  getKpiDateRange,
  getFamilyScorePk,
  getFamilyRankList,
  groupPkList,
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';
import moment from 'moment';
import { fillDataSource } from '@/pages/indexPage/components/utils/utils';

export default {
  namespace: 'xdCreditPkModal',
  state: {
    globalDateRange: {},
    globalLevelList: [],
    globalCollegeList: [],
    // class
    groupList: null,
    classScorePk: {},
    // family
    familyKpiTimes: {}, // 时间
    orgOptions: [
      {
        id: 1,
        name: '组织',
      },
      {
        id: 2,
        name: '人均在服学员',
      },
    ], // 学分抽屉选择条件
    orgSecondOptions: [
      {
        id: 'group',
        name: '集团',
      },
      {
        id: 'college',
        name: '本学院',
      },
      {
        id: 'family',
        name: '本家族',
      },
    ], // 学分抽屉选择条件
    familyScorePk: {}, // 创收对比家族
    groupScorePk: {}, // 学分对比小组
  },

  effects: {
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
    // 小组-绩效列表
    *getKpiLevelList(_, { call, put }) {
      const result = yield call(kpiLevelList)
      if (result.code === 20000) {
        const globalLevelList = result.data || {};
        yield put({ type: 'save', payload: { globalLevelList } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 家族-学院列表
    *getIncomeCollegeList(_, { call, put }) {
      const result = yield call(getIncomeCollegeList);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { globalCollegeList: result.data } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  class
    *groupList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(groupList, params)
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *groupPkClassList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(groupPkList, params)
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
        yield put({ type: 'saveScore', payload: { data: result.data, key: 'classScorePk', dataTrace: '家族长工作台/本期学分/' } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // family
    //  家族学分对比
    *getFamilyScorePk({ payload, callback }, { call, put }) {
      const result = yield call(getFamilyScorePk, payload.params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
        yield put({ type: 'saveScore', payload: { data: result.data, key: 'familyScorePk', dataTrace: '家族长工作台/家族学分/' } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  家族学分对比右侧家族学分排名
    *getFamilyRankList({ payload, callback }, { call, put }) {
      const result = yield call(getFamilyRankList, payload.params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 小组学分对比
    *groupPkList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(groupPkList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
        yield put({ type: 'saveScore', payload: { data: result.data, key: 'groupScorePk', dataTrace: '家族长工作台/小组学分/' } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveScore(state, { payload }) {
      const data = payload.data;
      data.dimensionList = fillDataSource(
        {
          ...state.familyKpiTimes,
          dataTrace: payload.dataTrace
        },
        data.dimensionList
      );
      return { ...state, [payload.key]: data };
    },
  },
  subscriptions: {},
};