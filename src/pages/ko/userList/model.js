import { message } from 'antd';
import { queryUserList } from '@/pages/ko/userList/services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'userListModel',

  state: {
    userList: [],
  },

  effects: {
    *getUserList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(queryUserList, params);
      const userList = result.data || [];

      if (result.code === 20000) {
        yield put({ type: 'save', payload: { userList } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
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
