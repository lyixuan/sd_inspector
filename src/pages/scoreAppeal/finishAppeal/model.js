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
    idList:[],
    countPreCheckNum:{},
  },

  effects: {
    *getFinishAppealList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(queryFinishAppealList, params);
      if (result.code === 20000) {
        const {pageInfo={},idList=[],countPreCheckNum={}} = result.data;
        const finishList = pageInfo.list || [];
        const page = { total: pageInfo.total ? pageInfo.total : 0, pageNum: pageInfo.pageNum ? pageInfo.pageNum : 1 };
        yield put({ type: 'save', payload: { finishList,page,idList,countPreCheckNum } });
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
