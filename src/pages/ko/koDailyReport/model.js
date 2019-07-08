import { message } from 'antd';
import { getKoDateRange } from '../services';


export default {
  namespace: 'koDailyReportModal',

  state: {
  },

  effects: {
    *getKoDateRange({ callback }, { call, put }) {
      const KoDateRangeResponse = yield call(getKoDateRange);
      KoDateRangeResponse.code !== 2000 && message.error(KoDateRangeResponse.msg);
      if (KoDateRangeResponse.code === 2000) {
        const KoDateRange = KoDateRangeResponse.data;
        if (callback && typeof callback === 'function') {
          callback(KoDateRange);
        }
      }
    },
  },

  reducers: {

  },

  subscriptions: {},
};
