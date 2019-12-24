import { message } from 'antd';
import { msgF, downBlob } from '@/utils/utils';
import {
  zkzWriteList,
  zkzWriteDetail,
  errorData,
  exportErrorDetail
} from './services';

export default {
  namespace: 'admissionTicket',

  state: {
    zkzWriteList: [],
    zkzWriteDetail: {},
    errorData: {},
    exportErrorDetail: {},
    visible: false
  },

  effects: {
    *zkzWriteList({ payload }, { call, put }) {
      const params = payload.params
      const response = yield call(zkzWriteList, params);
      if (response && response.code === 20000) {
        yield put({
          type: 'save',
          payload: { zkzWriteList: response.data || [] },
        });
      } else if (response) {
        message.error(response.msg)
      }
    },
    *zkzWriteDetail({ payload }, { call, put }) {
      const params = payload.params
      const response = yield call(zkzWriteDetail, params);
      if (response && response.code === 20000) {
        yield put({
          type: 'save',
          payload: { zkzWriteDetail: response.data || {} },
        });
      } else if (response) {
        message.error(response.msg)
      }
    },
    *errorData({ payload }, { call, put }) {
      const params = payload.params
      const response = yield call(errorData, params);
      if (response && response.code === 20000) {
        yield put({
          type: 'save',
          payload: { errorData: response.data },
        });
      } else if (response) {
        message.error(response.msg)
      }
    },
    *exportErrorDetail({ payload }, { call, put }) {
      const params = payload.params
      const result = yield call(exportErrorDetail, params);
      if (result) {
        const { headers } = result.response || {};
        const filename = headers.get('content-disposition') || '';
        const numName = filename.split('filename=')[1] || ''; // 带后缀的文件名
        const numName2 = numName.split('.')[0];   // 纯文件名
        // downBlob(result.data, `${eval('\'' + numName2 + '\'')}.xlsx`);
        downBlob(result.data, `${payload.fileName}.xlsx`);
        message.success('导出成功');
        return
      } else if (result && result instanceof Object) {
        message.error(msgF(result.msg, result.msgDetail));
      } else {
        message.error('导出失败');
      }
    },


  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

  },
};
