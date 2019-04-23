import { message } from 'antd';
import { queryUserList } from '@/pages/ko/userList/services';
import { msgF } from '@/utils/utils';
import { getTableList } from '@/pages/ko/services';

export default {
  namespace: 'userListModel',

  state: {
    userList: [],
  },

  effects: {
    *getTableList({ payload }, { call, put }) {
      // 列表
      const params = payload.params;
      const result = yield call(getTableList, params);
      if (result.code === 20000) {
        const tableList = result.data || [];
        yield put({ type: 'save', payload: { tableList } });
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
