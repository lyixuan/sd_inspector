import { message } from 'antd';
import { msgF } from '@/utils/utils';
import { exportExcel } from '@/pages/scoreAppeal/services';
import { queryOnAppealList,startAppeal,sopCheck,masterCheck,cancelAppeal } from '@/pages/scoreAppeal/onAppeal/services';
export default {
  namespace: 'onAppealModel',

  state: {
    onList: [], // 列表
    page:{},
    idList:[],
    countPreCheckNum:{},
    masterTagList:{},  // 主管tags
  },

  effects: {
    *queryOnAppealList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(queryOnAppealList, params);
      console.log('result',result)
      if (result.code === 20000) {
        const {pageInfo={},idList=[],countPreCheckNum={}} = result.data;
        const onList = pageInfo.list || [];
        const page = { total: pageInfo.total ? pageInfo.total : 0, pageNum: pageInfo.pageNum ? pageInfo.pageNum : 1 };
        yield put({ type: 'save', payload: { onList,page,idList,countPreCheckNum } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *startAppeal({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(startAppeal, params);
      if (result.code === 20000) {
        message.success('提交成功');
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *sopCheck({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(sopCheck, params);
      if (result.code === 20000) {
        message.success('提交成功');
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *masterCheck({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(masterCheck, params);
      if (result.code === 20000) {
        message.success('提交成功');
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *cancelAppeal({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(cancelAppeal, params);
      if (result.code === 20000) {
        message.success('撤销成功');
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *exportExcel({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(exportExcel, params);
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
