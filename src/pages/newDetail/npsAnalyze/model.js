import { getKOEnumList } from '@/pages/ko/services';
import {
  getReasonTypeTree,
  getCycleList,
  getNpsAutonomousEvaluation,
  getTagList,
} from './services';
import { getDateArray } from '@/pages/indexPage/components/utils/utils';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'npsAnalyzeModel',
  state: {
    evaluateList: [{ id: 0, name: '空' }, { id: 1, name: '非空' }], // 以上都是 搜索框基本信息
    reasonList: [], // 原因分类列表
    collegeList: [], // 后端归属列表
    paramsQuery: {},
    stuDetailData: {}, // 学院明细
    getCycleListData: {},
    getTagListData: {},
  },

  effects: {
    // 后端归属
    *getCollegeList(_, { call, put }) {
      const collegeResult = yield call(getKOEnumList, { type: 9 });
      if (collegeResult && collegeResult.code && collegeResult.code === 20000) {
        const data = Array.isArray(collegeResult.data) ? collegeResult.data : [];
        yield put({ type: 'saveCollege', payload: { collegeList: data[0].enumData } });
      }
    },
    // 原因分类
    *getReasonTypeTree(_, { call, put }) {
      const result = yield call(getReasonTypeTree);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { reasonList: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 周期
    *getCycleList({ payload, callback }, { call, put }) {
      const result = yield call(getCycleList, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { getCycleListData: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 标签
    *getTagList({ payload, callback }, { call, put }) {
      const result = yield call(getTagList, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { getTagListData: result.data } });
      } else if (result) {
      }
    },
    // NPS自主评价所有的接口
    *getNpsAutonomousEvaluation({ payload }, { call, put }) {
      const result = yield call(getNpsAutonomousEvaluation, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { stuDetailData: result.data.npsStarOpinionDtoListMap } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    // 筛选参数
    saveParams(state, { payload }) {
      const paramsQuery = { ...state.paramsQuery, ...payload };
      localStorage.setItem(
        'nps_analyze_query',
        JSON.stringify({ ...paramsQuery, dateRange: getDateArray(paramsQuery.dateRange) })
      );
      return { ...state, paramsQuery };
    },
    // 学院
    saveCollege(state, { payload }) {
      return { ...state, collegeList: getNullNodeList(payload.collegeList) };
    },
  },
  subscriptions: {},
};
function getNullNodeList(data = []) {
  data.map(item => {
    if (item.nodeList && item.nodeList.length === 0) {
      item.nodeList = null;
    } else {
      getNullNodeList(item.nodeList);
    }
  });
  return data;
}
