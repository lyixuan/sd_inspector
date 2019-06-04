import { message } from 'antd';
import {
  queryPreAppealList,
} from '@/pages/scoreAppeal/awaitAppeal/services';
import {
  getAppealInfoCheckList,
  getBaseAppealInfo,
} from '@/pages/scoreAppeal/services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'awaitAppealModel',

  state: {
    awaitList: [], // 列表
    page:{},
    detailInfo:{},  // 详情
    appealRecord:{}  // 审核记录
  },

  effects: {
    *getPreAppealList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(queryPreAppealList, params);
      if (result.code === 20000) {
        const awaitList = result.data.list || [];
        const page = { total: result.data.total ? result.data.total : 0, pageNum: result.data.pageNum ? result.data.pageNum : 1 };
        yield put({ type: 'save', payload: { awaitList,page } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *queryBaseAppealInfo({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getBaseAppealInfo, params);
      if (result.code === 20000) {
        const detailInfo = result.data || [];
        yield put({ type: 'save', payload: { detailInfo } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *queryAppealInfoCheckList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getAppealInfoCheckList, params);
      if (result.code === 20000) {
        const appealRecord = result.data || [];
        yield put({ type: 'save', payload: { appealRecord } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveParams(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};
