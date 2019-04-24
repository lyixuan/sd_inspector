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
      if (result.code === 20000) {
        const userList = result.data || [];
        yield put({ type: 'save', payload: { userList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {},
};
