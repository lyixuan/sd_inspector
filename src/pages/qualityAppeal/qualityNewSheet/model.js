import { message } from 'antd/lib/index';
import { getQualityList, qualityExportExcel, qualityCancelQuality, addQuality, checkRepeatQualityInspection } from '@/pages/qualityAppeal/qualityNewSheet/services';
import { getQualityDetail } from '@/pages/qualityAppeal/qualityAppeal/appeal/services';
import BIModal from '@/ant_components/BIModal';
import router from 'umi/router';

const confirm = BIModal.confirm;

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
        message.error(result.msgDetail);
      }
    },
    *cancelQuality({ payload }, { call }) {
      const params = payload.params;
      const result = yield call(qualityCancelQuality, params);
      if (result.code === 20000) {
        message.success('撤销成功');
      } else {
        message.error(result.msgDetail);
      }
    },
    *exportExcel({ payload }, { call }) {
      const params = payload.params;
      const result = yield call(qualityExportExcel, params);
      if (result) {
        downBlob(result.data, 'name.xlsx');
        message.success('导出成功');
      } else {
        message.error(result.msgDetail);
      }
    },
    *addQuality({ payload }, { call, put }) {
      const response = yield call(addQuality, payload);
      if (response.code === 20000) {
        yield put(router.push('/qualityAppeal/qualityNewSheet'));

      } else {
        message.error(response.msg)
      }
    },
    *getQualityDetail({ payload }, { call, put }) {
      //质检详情数据
      const result = yield call(getQualityDetail, { ...payload });
      if (result.code === 20000) {
        const qualityDetail = result.data ? result.data : {};
        yield put({ type: 'save', payload: { qualityDetail } });
      } else {
        message.error(result.msg);
      }
    },
    *checkRepeatQualityInspection({ payload }, { call, put }) {
      const { callback, params } = payload
      const response = yield call(checkRepeatQualityInspection, params);
      if (response.code === 20000) {
        callback.call(null, response.msgDetail)
      } else {
        message.error(response.msg);
      }
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

  },

  subscriptions: {
  },
};

function downBlob(blob, name) {
  // 接收返回blob类型的数据
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = name; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
}
