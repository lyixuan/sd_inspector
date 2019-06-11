import { message } from 'antd/lib/index';


export default {
  namespace: 'AiDetail',

  state: {

  },

  effects: {

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {},
};
