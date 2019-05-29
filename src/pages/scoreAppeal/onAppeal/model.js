import { message } from 'antd';
import {
  queryOnAppealList,
} from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'onAppealModel',

  state: {
    onList: [], // 列表
    page:{},
  },

  effects: {
    *getOnAppealList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(queryOnAppealList, params);
      if (result.code === 20000) {
        const onList = result.data.list || [];
        const page = { total: result.data.total ? result.data.total : 0, pageNum: result.data.pageNum ? result.data.pageNum : 1 };
        yield put({ type: 'save', payload: { onList,page } });
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
