import { message } from 'antd';
import { msgF } from '@/utils/utils';
import {
  getKOEnumList,
  getKoDateRange, getKOMessage, getPageDetailInfoList, getUserGroupList, getCurrentTime
} from './services';


export default {
  namespace: 'examPlant',

  state: {
    enumData: {},
  },

  effects: {

    // *getCurrentTime({ callback }, { call, put }) {
    //   const response = yield call(getCurrentTime);
    //   if (response && response.code === 20000) {
    //     yield put({
    //       type: 'save',
    //       payload: { currentServiceTime: response.data.currentTime },
    //     });
    //     if (callback && typeof callback === 'function') {
    //       callback(response.data.currentTime)
    //     }
    //     return;
    //   } else if (response) {
    //     message.error(response.msg)
    //   }
    //   if (callback && typeof callback === 'function') {
    //     callback()
    //   }
    // },
  },

  reducers: {
    saveParams(state, { payload }) {
      return { ...state, ...payload };
    },

  },
  subscriptions: {},
};
