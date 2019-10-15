import { message } from 'antd/lib/index';
import { getQualityList, qualityExportExcel, qualityCancelQuality, addQuality,updateQuality } from '@/pages/qualityAppeal/qualityNewSheet/services';
import router from 'umi/router';
import { downBlob, msgF } from '@/utils/utils';

export default {
  namespace: 'qualityNewSheet',

  state: {
    qualityList: [],
    qualityDetail: {},
    dimensionTreeList: [],
    originAllDimensionTreeList: {},
    page: {}
  },

  effects: {
    *getQualityList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getQualityList, params);
      if (result.code === 20000) {
        const qualityList = result.data.list ? result.data.list : [];
        const page = { total: result.data.total ? result.data.total : 0, pageNum: result.data.pageNum ? result.data.pageNum : 1 };
        yield put({ type: 'save', payload: { qualityList, page } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *cancelQuality({ payload }, { call }) {
      const params = payload.params;
      const result = yield call(qualityCancelQuality, params);
      if (result.code === 20000) {
        message.success('撤销成功');
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *exportExcel({ payload }, { call }) {
      const params = payload.params;
      const result = yield call(qualityExportExcel, params);
      if (result) {
        const { headers } = result.response || {};
        const filename = headers.get('content-disposition') || '';
        const numName = filename.split('filename=')[1]; // 带后缀的文件名
        const numName2 = numName.split('.')[0];   // 纯文件名
        downBlob(result.data, `${eval("'"+numName2+"'")}.xlsx`);
        message.success('导出成功');
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *addQuality({ payload }, { call, put }) {
      const response = yield call(addQuality, payload);
      if (response.code === 20000) {
        message.success("创建成功")
        return true
      } else {
        message.error(msgF(response.msg,response.msgDetail))
      }
    },
    *updateQuality({ payload }, { call, put }) {
      const result = yield call(updateQuality, { ...payload });
      if (result.code === 20000) {
        message.success('提交成功');
        return true
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

