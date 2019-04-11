import { message } from 'antd';

export default {
  namespace: 'home',

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
