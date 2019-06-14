import { message } from 'antd';
import { getTableList, userGroupCheck, userGroupSubmit } from '@/pages/ko/userList/services';
import { msgF } from '@/utils/utils';


export default {
  namespace: 'workTableModel',

  state: {
    pageParams: {// 各列表当前页
    },
    searchParams: {// 各列表搜索值
    },
    workList: [],// 列表数据
    pageSize: 15,// 每页条数
    totalCount:0,// 列表总值
  },
  effects: {
    *getTableList({ payload }, { call, put, select }) {
      // 列表
      const params = payload.params;
      const { choiceTime, ...otherParams} = params;
      const pageSize = yield select(state => state.workTableModel.pageSize);
      const result = yield call(getTableList, {...otherParams, pageSize});
      if (result.code === 20000) {
        const { currentPage, type, ...others } = params;
        const data = result.data || {};
        const workList = Array.isArray(data.resultList) ? data.resultList : [];
        const { totalCount } = data;
        yield put({ type: 'save', payload: { workList, totalCount} });
        yield put({
          type: 'saveParams',
          payload: { pageParams: { [type] : currentPage }, searchParams: { [type]: others} },
        })
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveParams(state, { payload }) {
      return { ...state, pageParams: { ...state.pageParams, ...payload.pageParams }, searchParams: {...state.searchParams, ...payload.searchParams}};
    }

  },

  subscriptions: {},
};
