import { message } from 'antd/lib/index';
import { getTimeRange,putTimeRange,getDayDownload,getMonthDownload } from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'timeManage',

  state: {
    beginDate:null,
    endDate:null,
  },

  effects: {
    // 回显绩效时间管理
    *getTimeRange({ payload }, { call, put }) {
      const result = yield call(getTimeRange);
      if (result.code === 20000) {
        const {beginDate,endDate} = result.data;
        yield put({ type: 'save', payload: { beginDate,endDate } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    // 保存绩效时间管理
    *putTimeRange({ payload }, { call, put }) {
      const {beginDate,endDate} = this.state;
      const result = yield call(putTimeRange,{beginDate,endDate});
      if (result.code === 20000) {
        message.success('保存成功');
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    // 日报下载
    *getDayDownload({ payload }, { call, put }) {
      const result = yield call(getDayDownload);
      if (result.code === 20000) {
        message.success('日报下载成功');
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    // 月报下载
    *getMonthDownload({ payload }, { call, put }) {
      const result = yield call(getMonthDownload);
      if (result.code === 20000) {
        message.success('月报下载成功');
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
