import { getUserInfo, getCurrentDateRange } from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';
import moment from 'moment';

export default {
  namespace: 'newDetailModal',
  state: {
    globalUserInfo: {}, // 全局值
    globalDateRange: {},
  },
  effects: {
    *getUserInfo({ callback }, { call, put }) {
      const result = yield call(getUserInfo);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { userInfo: result.data } });
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 获取绩效周期
    *getCurrentDateRange({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(getCurrentDateRange, params);
      if (result.code === 20000) {
        yield put({
          type: 'save',
          payload: {
            globalDateRange: {
              startTime: moment(result.data.startDate).format('YYYY-MM-DD'),
              endTime: moment(result.data.endDate).format('YYYY-MM-DD'),
            },
          },
        });
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},
};
