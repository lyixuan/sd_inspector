import { message } from 'antd';
import {
  queryFinishAppealList,
} from './services';
import { msgF } from '@/utils/utils';
export default {
  namespace: 'finishAppealModel',

  state: {
    finishList: [], // 列表
    page:{},
    detailInfo:{},  // 详情
    appealRecord:{},  // 审核记录
  },

  effects: {
    *getFinishAppealList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(queryFinishAppealList, params);
      if (result.code === 20000) {
        const finishList = result.data.list || [];
        const page = { total: result.data.total ? result.data.total : 0, pageNum: result.data.pageNum ? result.data.pageNum : 1 };
        yield put({ type: 'save', payload: { finishList,page } });
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
