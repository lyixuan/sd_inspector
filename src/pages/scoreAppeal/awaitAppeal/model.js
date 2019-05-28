import { message } from 'antd';
import {
  queryPreAppealList,
} from '@/pages/scoreAppeal/awaitAppeal/services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'awaitAppealModel',

  state: {
    awaitList: [], // 列表
    page:{},
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
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};
