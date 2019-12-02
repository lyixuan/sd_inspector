import { message } from 'antd/lib/index';
import { getDetail } from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'classReport',

  state: {
  },

  effects: {
    *getCubeDetail({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getDetail, params);
      if (result.code === 20000) {
        const detailInfo = result.data||{};
        yield put({ type: 'save', payload: { detailInfo } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};

