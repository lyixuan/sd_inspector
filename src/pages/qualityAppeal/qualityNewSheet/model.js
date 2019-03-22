import { message } from 'antd/lib/index';
import { getQualityList, getOrgMapByMail,qualityExportExcel,qualityCancelQuality } from '@/pages/qualityAppeal/qualityNewSheet/services';
function downBlob(blob, name) {
  // 接收返回blob类型的数据
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = 'name.xlsx'; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
}
export default {
  namespace: 'qualityNewSheet',

  state: {
    qualityList: [],
    page: {}
  },

  effects: {
    *getQualityList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getQualityList, params);
      if (result.code === 20000) {
        const qualityList = result.data.list ? result.data.list : [];
        const page = {total:result.data.total? result.data.total : 0,pageNum:result.data.pageNum?result.data.pageNum:1};
        yield put({ type: 'save', payload: { qualityList,page } });
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
        downBlob(result.data);
        message.success('导出成功');
      } else {
        message.error(result.msgDetail);
      }
    },
    *getOrgMapByMail({ payload }, { call, put }) {
      const response = yield call(getOrgMapByMail, payload);
      console.log(response)

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
