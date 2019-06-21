import { message } from 'antd';
import { getCollegeList, getConsultTypeTree, getReasonTypeTree, getTableList, exportData } from './services';
import { downBlob, msgF } from '@/utils/utils';


export default {
  namespace: 'workTableModel',

  state: {
    collegeList: [],
    consultList: [],
    reasonList: [],
    evaluateList: [{ id: 0, name: '空' }, { id: 1, name: '非空' }],// 以上都是 搜索框基本信息
    pageParams: {// 各列表当前页
    },
    searchParams: {// 各列表搜索值
    },
    workList: [],// 列表数据
    idList: [],//idList
    pageSize: 15,// 每页条数
    totalCount: 0,// 列表总值
  },
  effects: {
    * getBasicData({ payload }, { call, put, select }) {
      const collegeResult = yield call(getCollegeList);
      const consultResult = yield call(getConsultTypeTree);
      const reasonResult = yield call(getReasonTypeTree);
      if (collegeResult && collegeResult.code && collegeResult.code === 20000) {
        yield put({ type: 'save', payload: { collegeList: collegeResult.data } });
      }
      if (consultResult && consultResult.code && consultResult.code === 20000) {
        yield put({ type: 'save', payload: { consultList: consultResult.data } });

      }
      if (reasonResult && reasonResult.code && reasonResult.code === 20000) {
        yield put({ type: 'save', payload: { reasonList: [{ id: 0, name: '空' }].concat(reasonResult.data) } });

      }
    },
    * getTableList({ payload, callback }, { call, put, select }) {
      // 列表
      const params = payload.params;
      const { choiceTime, ...otherParams } = params;
      const pageSize = yield select(state => state.workTableModel.pageSize);
      const result = yield call(getTableList, { ...otherParams, pageSize });
      if (result && result.code && result.code === 20000) {
        const { currentPage, type, ...others } = params;
        const data = result.data || {};
        const workList = Array.isArray(data.list) ? data.list : [];
        const idList = data.idList;
        const { total, pageNum } = data;
        yield put({ type: 'save', payload: { workList, idList, totalCount: total } });
        yield put({
          type: 'saveParams',
          payload: { pageParams: { [type]: pageNum }, searchParams: { [type]: others } },
        });
      } else if(result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    * exportExcelData({ payload, callback }, { call }) {
      const result = yield call(exportData, payload.params);
      if (result) {
        const { headers } = result.response || {};
        const filename = headers.get('content-disposition') || '';
        const numName = filename.split('filename=')[1]; // 带后缀的文件名
        const numName2 = numName.split('.')[0];   // 纯文件名
        downBlob(result.data, `${eval("'" + numName2 + "'")}.xlsx`);
        message.success('导出成功');
      } else if(result && result instanceof Object) {
        message.error(msgF(result.msg, result.msgDetail));
      } else {
        message.error('导出失败');
      }
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveParams(state, { payload }) {
      return {
        ...state,
        pageParams: { ...state.pageParams, ...payload.pageParams },
        searchParams: { ...state.searchParams, ...payload.searchParams },
      };
    },

  },

  subscriptions: {},
};
