import { message } from 'antd/lib/index';
import { getDetailDataPage, getQueryConditionList, addQueryCondition, deleteQueryCondition, updateQueryCondition } from './services';

export default {
  namespace: 'dataDetail',

  state: {
    tableList:[],
    queryConditionList:[]
  },

  effects: {
    // 数据明细查询结果
    *getDetailData({ payload }, { call, put }) {
      const result = yield call(getDetailDataPage, payload.params);
      const tableList = result.data || [];
      if (result && result.code === 2000) {
        yield put({ type: 'save', payload: { tableList } });
      } else {
        message.error(result.msg);
      }
    },
    // 我的查询条件
    *getQueryConditionList({ payload }, { call, put }) {
      const result = yield call(getQueryConditionList, payload.params);
      const queryConditionList = result.data || [];
      if (result && result.code === 2000) {
        yield put({ type: 'save', payload: { queryConditionList } });
      } else {
        message.error(result.msg);
      }
    },
    // 添加查询条件
    *addQueryCondition({ payload }, { call, put }) {
      const data = yield call(addQueryCondition, payload.params);
      const queryConditionList = data.list;
      if (data && data.code === 2000) {
        yield put({ type: 'save', payload: { queryConditionList } });
      } else {
        message.error(data.msg);
      }
    },
    // 修改查询条件
    *updateQueryCondition({ payload }, { call, put }) {
      const data = yield call(updateQueryCondition, payload.params);
      const queryConditionList = data.list;
      if (data && data.code === 2000) {
        yield put({ type: 'save', payload: { queryConditionList } });
      } else {
        message.error(data.msg);
      }
    },
    // 删除查询条件
    *deleteQueryCondition({ payload }, { call, put }) {
      const data = yield call(deleteQueryCondition, payload.params);
      const queryConditionList = data.list;
      if (data && data.code === 2000) {
        yield put({ type: 'save', payload: { queryConditionList } });
      } else {
        message.error(data.msg);
      }
    }

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
