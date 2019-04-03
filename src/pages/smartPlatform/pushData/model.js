import { message } from 'antd/lib/index';
import { getData, exportData } from './services';
import moment from 'moment';

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
        message.error(data.msg);
      }
    },
    *exportData({ payload }, { call, put }) {
      const result = yield call(exportData, { ...payload });
      if (result) {
        downBlob(result.data, '推送明细数据-' + moment(new Date()).format('YYYYMMDD') + '.xlsx');
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
