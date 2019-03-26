import { message } from 'antd/lib/index';
import { getAppealList,appealCancelQuality,appealExportExcel } from '@/pages/qualityAppeal/qualityAppeal/services';


export default {
  namespace: 'qualityCheck',

  state: {
    qualityAppealList:[],
    page: {}
  },

  effects: {
    *getAppealList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getAppealList, params);

      if (result.code === 20000) {
        const qualityAppealList = result.data.list ? result.data.list : [];
        const page = {total:result.data.total? result.data.total : 0,pageNum:result.data.pageNum?result.data.pageNum:1};
        yield put({ type: 'save', payload: { qualityAppealList,page } });
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
        downBlob(result.data,'name.xlsx');
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
