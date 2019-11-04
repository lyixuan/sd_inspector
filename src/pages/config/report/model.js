import { message } from 'antd/lib/index';
import { getIgnoreUser, send } from './services';
import { downBlob, msgF } from '@/utils/utils';

export default {
  namespace: 'report',

  state: {
    ignoreList: [],
  },

  effects: {
    // 获取屏蔽人名单
    *sendMail({ payload }, { call, put }) {
      const result = yield call(send);
      if (result.code === 20000) {
        const { data } = result.data;
        yield put({ type: 'save', payload: { data } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    *getIgnoreUser({ payload }, { call, put }) {
      const result = yield call(getIgnoreUser);
      if (result.code === 20000) {
        const { data } = result.data;
        yield put({ type: 'save', payload: { data } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 日月报下载
    // *reportDownload({ payload }, { call }) {
    //   const result = yield call(reportExcelDownload, payload);
    //   if (result) {
    //     const { headers } = result.response || {};
    //     const filename = headers.get('content-disposition') || '';
    //     if (filename) {
    //       const numName = filename.split('filename=')[1]; // 带后缀的文件名
    //       const numName2 = numName.split('.')[0]; // 纯文件名
    //       const numNameTail = numName.split('.')[1]; // 后缀
    //       downBlob(result.data, `${eval("'" + numName2 + "'")}.${numNameTail}`);
    //     } else {
    //       downBlob(result.data, `${eval("'file'")}.xlsx`);
    //     }
    //     message.success('导出成功');
    //   } else {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },
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
