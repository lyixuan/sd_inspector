import { message } from 'antd/lib/index';
import {
  getArchiveList,
  getTimeRange,
  updateTimeRange,
  getDayDownload,
  getMonthDownload,
  getBatchLogList,
  saveBatchLog,
  cacelBatchLog,
} from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'createIncome',

  state: {
    archiveList: [],
    startDate: undefined,
    endDate: undefined,
    batchLogList: [],
    saveBatchLogData: [],
    cacelBatchLogData: [],
  },

  effects: {
    // 获取创收绩效存档包内容
    *getArchiveList({ payload }, { call, put }) {
      const result = yield call(getArchiveList);
      if (result.code === 20000) {
        const { list: archiveList } = result.data;
        yield put({ type: 'save', payload: { archiveList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 获取存档历史记录列表 /incomeOrder/batchLogList
    *getBatchLogList({ payload }, { call, put }) {
      const result = yield call(getBatchLogList);
      if (result.code === 20000) {
        const { list: batchLogList } = result.data;
        yield put({ type: 'save', payload: { batchLogList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 添加存档
    *saveBatchLog({ payload }, { call, put }) {
      const result = yield call(saveBatchLog);
      if (result.code === 20000) {
        const { list: saveBatchLogData } = result.data;
        yield put({ type: 'save', payload: { saveBatchLogData } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 取消存档 /incomeOrder/cacelBatchLog
    *cacelBatchLog({ payload }, { call, put }) {
      const result = yield call(cacelBatchLog);
      if (result.code === 20000) {
        const { list: cacelBatchLogData } = result.data;
        yield put({ type: 'save', payload: { cacelBatchLogData } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 获取绩效时间管理
    *getTimeRange({ payload }, { call, put }) {
      const result = yield call(getTimeRange);
      if (result.code === 20000) {
        const { startDate, endDate } = result.data;
        yield put({ type: 'save', payload: { startDate, endDate } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 保存绩效时间管理
    *putTimeRange({ payload }, { call, put }) {
      const { startDate, endDate } = this.state;
      const result = yield call(updateTimeRange, { startDate, endDate });
      if (result.code === 20000) {
        message.success('保存成功');
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 日报下载
    *getDayDownload({ payload }, { call, put }) {
      const result = yield call(getDayDownload);
      if (result.code === 20000) {
        message.success('日报下载成功');
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 月报下载
    *getMonthDownload({ payload }, { call, put }) {
      const result = yield call(getMonthDownload);
      if (result.code === 20000) {
        message.success('月报下载成功');
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveTime(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {},
};
