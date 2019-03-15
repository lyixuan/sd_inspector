import { message } from 'antd/lib/index';
import { provinceOrg } from './services';

export default {
  namespace: 'examOrg',

  state: {
    dataList: [],
    mapInfo: [],
  },

  effects: {
    *provinceOrg({ payload }, { call, put }) {
      const data = yield call(provinceOrg, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'save' , payload: { dataList: data.data },});
      } else {
        message.error(data.msg);
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {
  },
};
