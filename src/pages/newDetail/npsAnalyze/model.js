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
    getCycleListData: {},
    getNpsAutonomousEvaluationData: {},
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

    // 获取nps星级数据接口
    // *getNpsAutonomousEvaluation({ payload, callback }, { call, put }) {
    //   const result = yield call(getNpsAutonomousEvaluation, payload.params);
    //   if (result.code === 20000 && result.data) {
    //     yield put({ type: 'save', payload: { getNpsAutonomousEvaluationData: result.data } });
    //   } else if (result) {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
    // 标签
    *getTagList({ payload, callback }, { call, put }) {
      const result = yield call(getTagList, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { getTagListData: result.data } });
      } else if (result) {
      }
    },
    //NPS自主评价所有的接口

    *getNpsAutonomousEvaluation({ payload, callback }, { call, put }) {
      const {
        collegeId,
        familyId,
        groupId,
        star,
        cycle,
        pageNum,
        pageSize,
        npsList: oldLists,
        change,
        endTime,
        startTime,
      } = payload.params;

      const params = {
        collegeId,
        familyId,
        groupId,
        star,
        cycle,
        pageSize,
        pageNum,
        startTime,
        endTime,
      };
      const result = yield call(getNpsAutonomousEvaluation, params);
      if (result.code === 20000) {
        const npsParams = result.data || {};

        let npsList = [];
        if (change) {
          npsList = [].concat(npsParams.npsStarOpinionDtoListMap.data);
        } else {
          if (Number(pageNum) !== 1) {
            npsList = oldLists.concat(npsParams.npsStarOpinionDtoListMap.data);
          } else {
            npsList = [].concat(npsParams.npsStarOpinionDtoListMap.data);
          }
        }

        yield put({ type: 'save', payload: { npsParams, npsList } });
        if (callback && typeof callback === 'function') {
          callback(result.data, npsList);
        }
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
function getNullNodeList(data = [], l = 1) {
  data.map(item => {
    if (l === 3) {
      item.nodeList = null;
    } else {
      getNullNodeList(item.nodeList, l + 1);
    }
  });
  return data;
}
