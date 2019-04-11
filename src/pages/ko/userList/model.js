import { message } from 'antd';

export default {
  namespace: 'userList',

  state: { },

  effects: {

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {},
};
