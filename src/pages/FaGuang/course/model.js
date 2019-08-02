import { message } from 'antd/lib/index';
import { getList, qualityExportExcel, qualityCancelQuality, addQuality } from './services';
import { getQualityDetail } from '@/pages/qualityAppeal/qualityAppeal/appeal/services';
import BIModal from '@/ant_components/BIModal';
import router from 'umi/router';
import { downBlob, msgF } from '@/utils/utils';

const confirm = BIModal.confirm;

export default {
  namespace: 'course',

  state: {
    dataList: [],
    page: {},
    qualityDetail: {},
    dimensionTreeList: [],
    originAllDimensionTreeList: {},

  },

  effects: {
    *getList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getList, params);
      if (result.code === 20000) {
        const dataList = result.data.list ? result.data.list : [];
        const page = { total: result.data.total ? result.data.total : 0, pageNum: result.data.pageNum ? result.data.pageNum : 1 };
        yield put({ type: 'save', payload: { dataList, page } });
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
        // console.log(11,window.decodeURI(numName2))
        downBlob(result.data, `${eval("'"+numName2+"'")}.xlsx`);
        message.success('导出成功');
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    *addQuality({ payload }, { call, put }) {
      const response = yield call(addQuality, payload);
      if (response.code === 20000) {
        yield put(router.push('/qualityAppeal/qualityNewSheet'));

      } else {
        message.error(msgF(response.msg,response.msgDetail))
      }
    },
    *getQualityDetail({ payload }, { call, put }) {
      //质检详情数据
      const result = yield call(getQualityDetail, { ...payload });
      if (result.code === 20000) {
        const qualityDetail = result.data ? result.data : {};
        yield put({ type: 'save', payload: { qualityDetail } });
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

