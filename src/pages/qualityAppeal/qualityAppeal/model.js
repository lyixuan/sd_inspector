import { message } from 'antd/lib/index';
import {
  getAppealList,
  appealCancelQuality,
  appealExportExcel,
  appealDeleteQuality
} from '@/pages/qualityAppeal/qualityAppeal/services';
import { downBlob, msgF } from '@/utils/utils';

export default {
  namespace: 'qualityCheck',

  state: {
    qualityAppealList1: [],
    qualityAppealList2: [],
    page1: {},
    page2: {},
    deleteAppeal: {},
  },

  effects: {
    *getAppealList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getAppealList, params);

      if (result.code === 20000) {
        let qualityAppealList1 = [];
        let qualityAppealList2 = [];
        let page1 = {};
        let page2 = {};
        if (params.type === 1) {
          qualityAppealList1 = result.data.list ? result.data.list : [];
          page1 = {
            total: result.data.total ? result.data.total : 0,
            pageNum: result.data.pageNum ? result.data.pageNum : 1,
          };
        } else {
          qualityAppealList2 = result.data.list ? result.data.list : [];
          page2 = {
            total: result.data.total ? result.data.total : 0,
            pageNum: result.data.pageNum ? result.data.pageNum : 1,
          };
        }

        yield put({
          type: 'save',
          payload: { qualityAppealList1, qualityAppealList2, page1, page2 },
        });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *cancelQuality({ payload }, { call }) {
      const params = payload.params;
      const result = yield call(appealCancelQuality, params);
      if (result.code === 20000) {
        message.success('撤销成功');
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *exportExcel({ payload }, { call }) {
      const params = payload.params;
      delete params.type;
      const result = yield call(appealExportExcel, params);
      if (result) {
        const { headers } = result.response || {};
        const filename = headers.get('content-disposition') || '';
        const numName = filename.split('filename=')[1]; // 带后缀的文件名
        const numName2 = numName.split('.')[0]; // 纯文件名
        downBlob(result.data, `${eval("'" + numName2 + "'")}.xlsx`);
        message.success('导出成功');
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 结案质检申诉 => 删除质检单号
    *deleteQuality({ payload }, { call, put }) {
      const result = yield call(appealDeleteQuality, {...payload});
      const deleteAppealData = result.data ? result.data : {};
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { deleteAppealData } });
        return deleteAppealData;
      } else {
        message.error(msgF(result.msg, result.msgDetail));
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
