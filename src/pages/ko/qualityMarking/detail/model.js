import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';
import {
  getConsultTypeTree,
  getReasonTypeTree,
  edit,
  submit,
  getIdList
} from './services';

function setLifeCycle(pageData, ordId) {
  let lifeCycle = ''
  pageData && pageData.result.ordIdList.map(item => {
    if (item.ordId == ordId) {
      lifeCycle = item.lifeCycle
    } else {
      return ' '
    }
  })
  return lifeCycle
}

export default {
  namespace: 'AiDetail',

  state: {
    consultTypeTree: [],
    reasonTypeTree: [],
    pageData: null,
    submitParam: {
      // ordId: undefined,
      // consultTypeIdList: [],
      // reasonTypeIdList: [],
      // evaluationFlag: null,
      // evaluationNature: null,
      // remark: '',
      // resultId: null
    },
    idList: []

  },

  effects: {
    *getConsultTypeTree({ payload }, { call, put }) {
      const result = yield call(getConsultTypeTree, {});
      if (result.code === 20000) {
        const consultTypeTree = result.data || [];
        yield put({ type: 'saveOrg', payload: { consultTypeTree } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getReasonTypeTree({ payload }, { call, put }) {
      const result = yield call(getReasonTypeTree, {});
      if (result.code === 20000) {
        const reasonTypeTree = result.data || [];
        yield put({ type: 'saveResonType', payload: { reasonTypeTree } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    * getIdList({ payload, callback }, { call, put, select }) {
      // 列表
      const params = payload.params;
      const result = yield call(getIdList, params);
      if (result && result.code && result.code === 20000) {
        const data = result.data || {};
        const idList = data.idList;
        yield put({ type: 'save', payload: { idList } });;
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *edit({ payload, callback }, { call, put }) {
      const params = payload.params
      const result = yield call(edit, params);
      if (result.code === 20000) {
        const pageData = result.data || [];
        let ordId = pageData.result.ordId;

        if (!ordId && pageData.result.ordIdList.length >= 1) {
          ordId = pageData.result.ordIdList[0].ordId
        }
        //  else {
        //   ordId = pageData.result.ordId || undefined
        // }
        const submitParam = {
          // ordId: pageData.result.ordId|| 4509117,
          ordId: ordId,
          consultTypeIdList: pageData.result.consultTypeIdList,
          reasonTypeIdList: pageData.result.reasonTypeIdList,
          evaluationFlag: pageData.result.evaluationFlag ? 2 : 1,
          evaluationNature: pageData.result.evaluationNature,
          remark: pageData.result.remark,
          resultId: pageData.result.resultId,
          lifeCycle: setLifeCycle(pageData, ordId),
        }
        if (callback) {
          callback(submitParam)
        }
        yield put({
          type: 'save', payload: {
            pageData
          }
        });

      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *submit({ payload, callback }, { call, put }) {
      const params = payload.params
      const result = yield call(submit, params);
      if (result.code === 20000) {
        callback();
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveOrg(state, { payload }) {
      const consultTypeTree = getNullNodeList(payload.consultTypeTree);
      return { ...state, consultTypeTree };
    },
    saveResonType(state, { payload }) {
      const reasonTypeTree = getNullNodeList(payload.reasonTypeTree);
      return { ...state, reasonTypeTree };
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
