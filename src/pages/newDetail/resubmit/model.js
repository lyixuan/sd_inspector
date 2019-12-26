import { getKOEnumList } from '@/pages/ko/services';
import { getCollegeAnalyze, getFamilyAnalyze, getCycleList, getPathList } from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'resubmitModal',
  state: {
    collegeList: [],
    paramsQuery: {},
    getCollegeAnalyzeData: {},
    getFamilyAnalyzeData: {},
    getCycleListData: {},
    getPathListData: {},
  },

  effects: {
    // 家族-学院列表
    *getCollegeList(_, { call, put }) {
      const collegeResult = yield call(getKOEnumList, { type: 9 });
      if (collegeResult && collegeResult.code && collegeResult.code === 20000) {
        const data = Array.isArray(collegeResult.data) ? collegeResult.data : [];
        yield put({ type: 'saveCollege', payload: { collegeList: data[0].enumData } });
      }
    },

    // 续报分析 - 学院分析
    *getCollegeAnalyze({ payload, callback }, { call, put }) {
      const result = yield call(getCollegeAnalyze, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { getCollegeAnalyzeData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 续报分析 - 家族分析
    *getFamilyAnalyze({ payload, callback }, { call, put }) {
      const result = yield call(getFamilyAnalyze, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { getFamilyAnalyzeData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 续报分析 - 续费学员生命周期分布
    *getCycleList({ payload, callback }, { call, put }) {
      const result = yield call(getCycleList, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { getCycleListData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 续报分析 - 转班路径
    *getPathList({ payload, callback }, { call, put }) {
      const result = yield call(getPathList, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { getPathListData: result.data } });
      } else if (result) {
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
    saveCollege(state, { payload }) {
      return { ...state, collegeList: getNullNodeList(payload.collegeList)};
    },
  },
  subscriptions: {},
};
function getNullNodeList(data = [], l = 1) {
  data.map(item => {
    if (l === 2) {
      item.nodeList = null;
    } else {
      getNullNodeList(item.nodeList, l + 1);
    }
  });
  return data;
}
