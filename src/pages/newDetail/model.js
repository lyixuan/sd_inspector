import { getUserInfo, getCurrentDateRange, getHotList, packageRankList, risePackageRankList } from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';
import moment from 'moment';

const admin_user = localStorage.getItem('admin_user');
const globalUserType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null;
export default {
  namespace: 'newDetailModal',
  state: {
    globalUserType: globalUserType,
    globalUserInfo: {}, // 全局值
    globalDateRange: {},
    globalDateMoment: [],
    globalDate: {},
  },
  effects: {
    *getUserInfo({ callback }, { call, put }) {
      const result = yield call(getUserInfo);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { globalUserInfo: result.data } });
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
            globalDate: {
              startDate: moment(result.data.startDate).format('YYYY-MM-DD'),
              endDate: moment(result.data.endDate).format('YYYY-MM-DD'),
            },
            globalDateMoment: [
              moment(result.data.startDate),
              moment(result.data.endDate),
            ]
          },
        });
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 获取热销榜单列表
    *getHotList({ payload, callback }, { call, put }) {
      const result = yield call(getHotList);
      if (result.code === 20000) {
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // // 热销产品包列表
    *getPackageRankList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(packageRankList, params);
      if (result.code === 20000) {
        return result.data;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 飙升产品包榜单
    *getRisePackageRankList({ payload, callback }, { call, put }) {
      const result = yield call(risePackageRankList);
      if (result.code === 20000) {
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
