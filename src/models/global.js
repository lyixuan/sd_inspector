import { message } from 'antd/lib/index';

export default {
  namespace: 'global',

  state: {
  },

  effects: {

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
