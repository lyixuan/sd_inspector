import { message } from 'antd';
import { msgF } from '@/utils/utils';
import {
  reachNumRankList,
  reachNumDetail
} from './services';

export default {
  namespace: 'registTouch',

  state: {
    reachNumRankList: [],
    reachNumDetail: {}
  },

  effects: {
    *reachNumRankList({ payload }, { call, put }) {
      const params = payload.params
      const response = yield call(reachNumRankList, params);
      if (response && response.code === 20000) {
        yield put({
          type: 'save',
          payload: { reachNumRankList: response.data || [] },
        });
      } else if (response) {
        message.error(response.msg)
      }
    },
    *reachNumDetail({ payload }, { call, put }) {
      const params = payload.params
      const response = yield call(reachNumDetail, params);
      if (response && response.code === 20000) {
        yield put({
          type: 'save',
          payload: { reachNumDetail: response.data || {} },
        });
      } else if (response) {
        message.error(response.msg)
      }
    },

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

  },
};
