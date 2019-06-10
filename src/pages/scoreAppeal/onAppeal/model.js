import { message } from 'antd';
import { msgF } from '@/utils/utils';
import { queryOnAppealList,startAppeal,sopCheck,masterCheck,cancelAppeal,getMasterTagList } from '@/pages/scoreAppeal/onAppeal/services';
export default {
  namespace: 'onAppealModel',

  state: {
    onList: [], // 列表
    page:{},
    idList:[],
    countPreCheckNum:{},
    tagList:[],  // 主管tags
  },

  effects: {
    // 查询在途列表
    *queryOnAppealList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(queryOnAppealList, params);
      if (result.code === 20000) {
        const {pageInfo={},idList=[],countPreCheckNum={}} = result.data;
        const onList = pageInfo.list || [];
        const page = { total: pageInfo.total ? pageInfo.total : 0, pageNum: pageInfo.pageNum ? pageInfo.pageNum : 1 };
        yield put({ type: 'save', payload: { onList,page,idList,countPreCheckNum } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    // 发起申诉（非首次一申、二申）
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
        message.success('审核提交成功');
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *masterCheck({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(masterCheck, params);
      if (result.code === 20000) {
        message.success('审核提交成功');
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
    *getMasterTagList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getMasterTagList, params);
      if (result.code === 20000) {
        const tagList = result.data||[];
        yield put({ type: 'save', payload: { tagList} });
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
