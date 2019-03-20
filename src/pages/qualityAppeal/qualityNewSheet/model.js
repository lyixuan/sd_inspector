import { message } from 'antd/lib/index';
import { getQualityList, getOrgMapByMail } from '@/pages/qualityAppeal/qualityNewSheet/services';

export default {
  namespace: 'qualityNewSheet',

  state: {
    qualityList: []
  },

  effects: {
    *getQualityList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getQualityList, params);
      const qualityList = result.data || [];

      if (result.code === 20000) {
        yield put({ type: 'save', payload: { qualityList } });
      } else {
        message.error(result.msgDetail);
      }
    },
    *getOrgMapByMail({ payload }, { call, put }) {
      const response = yield call(getOrgMapByMail, payload);
      console.log(response)

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
