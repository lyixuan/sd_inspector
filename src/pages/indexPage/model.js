import { getUserInfo } from './services';
import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";

export default {
  namespace: 'xdWorkModal',
  state: {
    userInfo: {}, // 全局值
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
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},
};
