
export default {
  namespace: 'customReport',

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

