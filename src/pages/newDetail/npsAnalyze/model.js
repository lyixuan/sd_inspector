import { getKOEnumList } from '@/pages/ko/services';
import {
  getReasonTypeTree,
  getCycleList,
  getNpsAutonomousEvaluation,
  getTagList,
  exportData,
  getNpsData,
  getRestTrend,
  statReasonType,
} from './services';
import { getDateArray } from '@/pages/indexPage/components/utils/utils';
import { message } from 'antd/lib/index';
import BIConfirm from '@/ant_components/BIConfirm';
import { msgF, getNullNodeList } from '@/utils/utils';

export default {
  namespace: 'npsAnalyzeModel',
  state: {
    evaluateList: [{ id: 0, name: '空' }, { id: 1, name: '非空' }], // 以上都是 搜索框基本信息
    reasonList: [], // 原因分类列表
    collegeList: [], // 后端归属列表
    tagQueryData: [], // NPS标签
    paramsQuery: {},
    paramsQueryPage: {
      pageSize: 15,
      pageNum: 1,
    }, // 学院明细分页参数
    stuDetailData: {}, // 学院明细
    getCycleListData: {},
    npsData: {},
    getRestTrendData: {},
    statReasonTypeData: {},
  },

  effects: {
    // 后端归属
    *getCollegeList(_, { call, put }) {
      const collegeResult = yield call(getKOEnumList, { type: 9 });
      if (collegeResult && collegeResult.code && collegeResult.code === 20000) {
        const data = Array.isArray(collegeResult.data) ? collegeResult.data : [];
        yield put({ type: 'saveNull', payload: { data: data[0].enumData, key: 'collegeList' } });
      }
    },
    // 原因分类
    *getReasonTypeTree(_, { call, put }) {
      const result = yield call(getReasonTypeTree);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'saveNull', payload: { data: result.data, key: 'reasonList' } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // NPS标签
    *getTagSelectList(_, { call, put }) {
      const result = yield call(getTagList);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'saveNull', payload: { data: result.data, key: 'tagQueryData' } });
      } else if (result) {
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
    // NPS自主评价所有的接口
    *getNpsAutonomousEvaluation({ payload }, { call, put }) {
      const result = yield call(getNpsAutonomousEvaluation, payload.params);
      if (result.code === 20000) {
        yield put({
          type: 'save',
          payload: { stuDetailData: result.data.npsStarOpinionDtoListMap },
        });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // NPS词云图跟柱状图
    *getNpsData({ payload }, { call, put }) {
      const result = yield call(getNpsData, payload.params);
      if (result.code === 20000) {
        yield put({
          type: 'save',
          payload: { npsData: result.data },
        });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 净推荐值趋势
    *getRestTrend({ payload }, { call, put }) {
      const result = yield call(getRestTrend, payload.params);
      let newResult = [];
      if (result) {
        newResult = result.data.map(item => {
          item.value = item.value.map(sitem => {
            return Math.round(sitem * 10000) / 100;
          });
          return item;
        });
      }
      if (result.code === 20000) {
        yield put({
          type: 'save',
          payload: { getRestTrendData: newResult },
        });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 原因分类
    *statReasonType({ payload }, { call, put }) {
      const result = yield call(statReasonType, payload.params);
      if (result.code === 20000) {
        yield put({
          type: 'save',
          payload: { statReasonTypeData: result.data },
        });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 学院明细下载
    *exportExcelData({ payload }, { call, put }) {
      const result = yield call(exportData, payload.params);
      if (result.code === 20000) {
        BIConfirm({
          content: (
            <>
              任务已创建
              <br />
              请到下载中心下载
            </>
          ),
        });
      } else if (result.code === 20100) {
        BIConfirm({
          content: (
            <>
              5分钟内
              <br />
              请勿提交重复任务
            </>
          ),
        });
      } else {
        BIConfirm({
          content: result.msgDetail,
        });
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
    saveParamsQueryPage(state, { payload }) {
      state.paramsQueryPage.pageNum = payload.pageNum;
      return { ...state };
    },
    // 学院
    saveNull(state, { payload }) {
      return { ...state, [payload.key]: getNullNodeList(payload.data) };
    },
    saveClearParams(state) {
      return { ...state, paramsQuery: {}, paramsQueryPage: { pageSize: 15, pageNum: 1} };
    }
  },
  subscriptions: {},
};
