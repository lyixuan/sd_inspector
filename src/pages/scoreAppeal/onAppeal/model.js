import { message } from 'antd';
import { msgF } from '@/utils/utils';
import { getBaseAppealInfo,getAppealInfoCheckList } from '@/pages/scoreAppeal/services';
import { queryOnAppealList,getMasterTagList,startAppeal,sopCheck,masterCheck,cancelAppeal } from '@/pages/scoreAppeal/onAppeal/services';
export default {
  namespace: 'onAppealModel',

  state: {
    onList: [], // 列表
    page:{},
    detailInfo:{},  // 详情
    appealRecord:{},  // 审核记录
    masterTagList:{},  // 主管tags
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
    *queryMasterTagList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getMasterTagList, params);
      if (result.code === 20000) {
        const masterTagList = result.data || [];
        yield put({ type: 'save', payload: { masterTagList } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *startAppeal({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(startAppeal, params);
      if (result.code === 20000) {
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *sopCheck({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(sopCheck, params);
      if (result.code === 20000) {
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *masterCheck({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(masterCheck, params);
      if (result.code === 20000) {
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *cancelAppeal({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(cancelAppeal, params);
      if (result.code === 20000) {
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
