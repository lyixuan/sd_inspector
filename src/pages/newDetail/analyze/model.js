export default {
  namespace: 'analyzeModel',
  state: {
    dateRange: []
  },

  effects: {
    
  },

  reducers: {
    saveDate(state, { payload }) {
      return { ...state, dateRange: payload.dateRange };
    },
  },
  subscriptions: {},
};
