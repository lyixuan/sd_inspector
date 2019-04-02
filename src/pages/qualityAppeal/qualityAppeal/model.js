import { message } from 'antd/lib/index';
import {
  getAppealList,
  appealCancelQuality,
  appealExportExcel,
} from '@/pages/qualityAppeal/qualityAppeal/services';
import {downBlob} from '@/utils/utils';

export default {
  namespace: 'qualityCheck',

  state: {
    qualityAppealList: [],
    page: {},
  },

  effects: {
    *getAppealList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getAppealList, params);

      if (result.code === 20000) {
        const qualityAppealList = result.data.list ? result.data.list : [];
        const page = {
          total: result.data.total ? result.data.total : 0,
          pageNum: result.data.pageNum ? result.data.pageNum : 1,
        };
        yield put({ type: 'save', payload: { qualityAppealList, page } });
      } else {
        message.error(result.msgDetail);
      }
    },
    *cancelQuality({ payload }, { call }) {
      const params = payload.params;
      const result = yield call(appealCancelQuality, params);
      if (result.code === 20000) {
        message.success('撤销成功');
      } else {
        message.error(result.msgDetail);
      }
    },
    *exportExcel({ payload }, { call }) {
      const params = payload.params;
      delete params.type;
      const result = yield call(appealExportExcel, params);
      if (result) {
        const { headers } = result.response || {};
        const filename = headers.get('content-disposition') || '';
        const numName = filename.split('=?????')[1];
        downBlob(result.data, decodeURI(numName));
        message.success('导出成功');
      } else {
        message.error(result.msgDetail);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {},
};
