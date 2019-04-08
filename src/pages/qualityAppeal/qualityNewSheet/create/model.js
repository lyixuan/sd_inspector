import { message } from 'antd/lib/index';
import { getOrgMapList } from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'createQualityNewSheet1',

  state: {
    orgMapList: []
  },

  effects: {
    // 任务列表
    *getOrgMapList({ payload }, { call, put }) {
      const result = yield call(getOrgMapList, { ...payload });
      const tableList = result.data ? result.data.list : [];
      const total = result.data ? result.data.total : [];
      if (result.code === 20000) {
        yield put({ type: 'saveLsit', payload: { tableList, total } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
  },

  reducers: {
  },

  subscriptions: {
  },
};
