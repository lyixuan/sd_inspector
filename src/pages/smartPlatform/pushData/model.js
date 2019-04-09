import { message } from 'antd/lib/index';
import { getData, exportData } from './services';
import { downBlob, msgF } from '@/utils/utils';

export default {
  namespace: 'PushDataModel',

  state: {
    dataList: [],
    exprotUrl: null,
  },

  effects: {
    *getData({ payload }, { call, put }) {
      const data = yield call(getData, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'save', payload: { dataList: data.data } });
      } else {
        message.error(msgF(data.msg,data.msgDetail));
      }
    },
    *exportData({ payload }, { call, put }) {
      const result = yield call(exportData, { ...payload });
      if (result) {
        const { headers } = result.response || {};
        const filename = headers.get('content-disposition') || '';
        const numName = filename.split('filename=')[1]; // 带后缀的文件名
        const numName2 = numName.split('.')[0]; // 纯文件名
        console.log(11, window.decodeURI(numName2));
        downBlob(result.data, `${eval("'" + numName2 + "'")}.xlsx`);
        message.success('导出成功');
      } else {
        message.error('导出失败');
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    exportData(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {},
};
