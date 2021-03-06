import { message } from 'antd';
import { getOperatorList, getConsultTypeTree, getReasonTypeTree, getTableList, exportData, getUserOrgList, getFeedBackTypeList } from './services';
import { downBlob, msgF } from '@/utils/utils';
import { getKOEnumList } from '@/pages/ko/services';
import { emptyValue, getArrLastValue } from '@/pages/ko/utils/utils';
export default {
  namespace: 'workTableModel',

  state: {
    collegeList: [],
    consultList: [],
    reasonList: [],
    operatorList: [],
    evaluateList: [{ id: 0, name: '空' }, { id: 1, name: '非空' }],// 以上都是 搜索框基本信息
    // evaluationList: ['空', '正面', '负面', '中性', '全部'],
    evaluationList: [
      { id: 2, name: '负面' },
      { id: 3, name: '中性' },
      { id: 1, name: '正面' },
      { id: 0, name: '空' },
      { id: 4, name: '全部' },
    ],
    pageParams: {// 各列表当前页
    },
    searchParams: {// 各列表搜索值
    },
    workList: [],// 列表数据
    idList: [],//idList
    pageSize: 15,// 每页条数
    totalCount: 0,// 列表总值
    globalOrgList: [],
    feedBackTypeList: []
  },
  effects: {
    *getBasicData({ payload }, { call, put, select }) {
      const collegeResult = yield call(getKOEnumList, { type: 9 });
      const consultResult = yield call(getConsultTypeTree);
      const reasonResult = yield call(getReasonTypeTree);

      if (collegeResult && collegeResult.code && collegeResult.code === 20000) {
        const data = Array.isArray(collegeResult.data) ? collegeResult.data : [];
        yield put({ type: 'save', payload: { collegeList: data[0].enumData } });
      }
      if (consultResult && consultResult.code && consultResult.code === 20000) {
        yield put({ type: 'saveConsultList', payload: { consultList: consultResult.data } });
      }
      if (reasonResult && reasonResult.code && reasonResult.code === 20000) {
        yield put({ type: 'saveReasonList', payload: { reasonList: [{ id: emptyValue, name: '空' }].concat(reasonResult.data) } });
      }
    },
    *getTableList({ payload, callback }, { call, put, select }) {
      // 列表
      const params = payload.params;
      const { choiceTime, ...otherParams } = params;
      const pageSize = yield select(state => state.workTableModel.pageSize);
      const result = yield call(getTableList, {
        ...otherParams,
        pageSize,
        consultType: getArrLastValue(otherParams.consultType),
        reasonType: getArrLastValue(otherParams.reasonType),
      });
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
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *exportExcelData({ payload, callback }, { call }) {
      const result = yield call(exportData, payload.params);
      if (result) {
        const { headers } = result.response || {};
        const filename = headers.get('content-disposition') || '';
        const numName = filename ? filename.split('filename=')[1] : ''; // 带后缀的文件名
        const numName2 = numName ? numName.split('.')[0] : 'excel';   // 纯文件名
        downBlob(result.data, `${eval("'" + numName2 + "'")}.xlsx`);
        message.success('导出成功');
      } else if (result && result instanceof Object) {
        message.error(msgF(result.msg, result.msgDetail));
      } else {
        message.error('导出失败');
      }
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
    },
    *getOperatorList({ payload, callback }, { call, put, select }) {
      const result = yield call(getOperatorList, payload.params);
      if (result && result.code && result.code === 20000) {
        yield put({ type: 'save', payload: { operatorList: result.data } });
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getUserOrgList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(getUserOrgList, params);
      if (result.code === 20000) {
        const res = result.data;
        yield put({ type: 'save', payload: { globalOrgList: res } });
        if (callback && typeof callback === 'function') {
          callback(res);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getFaceBackTypeList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(getFeedBackTypeList, params);
      if (result.code === 20000) {
        const res = result.data;
        yield put({ type: 'saveFeedBackTypeList', payload: { feedBackTypeList: [{ id: emptyValue, name: '空' }].concat(res) } })
        if (callback && typeof callback === 'function') {
          callback(res);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
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
    saveConsultList(state, { payload }) {
      const consultList = getNullNodeList(payload.consultList);
      return { ...state, consultList };
    },
    saveReasonList(state, { payload }) {
      const reasonList = getNullNodeList(payload.reasonList)
      return { ...state, reasonList };
    },
    saveFeedBackTypeList(state, { payload }) {
      const feedBackTypeList = getNullNodeList(payload.feedBackTypeList)
      return { ...state, feedBackTypeList };
    },

  },

  subscriptions: {},
};


function getNullNodeList(data = []) {
  data.map(item => {
    if (item.nodeList instanceof Array) {
      const l = item.nodeList.length;
      if (l === 0) {
        item.nodeList = null;
      } else if (l > 0) {
        getNullNodeList(item.nodeList);
      }
    }
  });
  return data;
}
