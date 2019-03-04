import { message } from 'antd/lib/index';
import { getDetailDataPage, getQueryConditionList } from './services';

export default {
  namespace: 'dataDetail',

  state: {
    tableList:[],
    queryConditionList:[]
  },

  effects: {
    // 数据明细查询结果
    *getDetailData({ payload }, { call, put }) {
      const data = yield call(getDetailDataPage, payload.params);
      const tableList = data.list;
      if (data && data.code === 2000) {
        yield put({ type: 'save', payload: { tableList } });
      } else {
        message.error(data.msg);
      }
    },
    // 我的查询条件
    *getQueryConditionList({ payload }, { call, put }) {
      const data = yield call(getQueryConditionList, payload.params);
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