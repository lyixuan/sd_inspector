import { message } from 'antd/lib/index';
import { getDetailDataPage } from './services';

export default {
  namespace: 'detail',

  state: {
    tableList:[]
  },

  effects: {
    // 数据明细查询结果
    *getDetailData({ payload }, { call, put }) {
      const data = yield call(getDetailDataPage, payload.params);
      if (data && data.code === 2000) {
        yield put({ type: 'save', payload: { data } });
      } else {
        message.error(data.msg);
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
