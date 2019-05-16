import { message } from 'antd';
import { getTableList } from '@/pages/ko/userList/services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'userListModel',

  state: {
    userList: [],
    pageParams: {
      currentPage: 1,
      pageSize: 30,
    }
  },

  effects: {
    *getTableList({ payload }, { call, put }) {
      // 列表
      const params = payload.params;
      const result = yield call(getTableList, params);
      const { pageSize, currentPage } = params;
      if (result.code === 20000) {
        const data = result.data || {};
        const userList = Array.isArray(data.resultList) ? data.resultList : [];
        const { totalUser, totalCount, currentPage } = data;
        yield put({ type: 'save', payload: { userList, currentPage, totalCount } });
        yield put({
          type: 'koPlan/saveUserData',
          payload: { usersData: { totalCount: totalUser } }
        })
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
      yield put({
        type: 'savePageParams',
        payload: { pageParams: { pageSize, currentPage } },

      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    savePageParams(state, { payload }) {
      return { ...state, ...payload };
    }

  },

  subscriptions: {},
};
