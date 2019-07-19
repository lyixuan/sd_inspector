import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';
import {
  getConsultTypeTree,
  getReasonTypeTree,
  edit,
  submit,
  getIdList
} from './services';

export default {
  namespace: 'AiDetail',

  state: {
    consultTypeTree: null,
    reasonTypeTree: null,
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
        yield put({ type: 'save', payload: { consultTypeTree } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getReasonTypeTree({ payload }, { call, put }) {
      const result = yield call(getReasonTypeTree, {});
      if (result.code === 20000) {
        const reasonTypeTree = result.data || [];
        yield put({ type: 'save', payload: { reasonTypeTree } });
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
        let ordId = undefined;

        if (pageData && pageData.result && pageData.result.ordIdList && pageData.result.ordIdList instanceof Array && pageData.result.ordIdList.length == 1) {
          ordId = pageData.result.ordIdList[0].ordId
        } else {
          ordId = pageData.result.ordId || undefined
        }
        const submitParam = {
          // ordId: pageData.result.ordId|| 4509117,
          ordId: ordId,
          consultTypeIdList: pageData.result.consultTypeIdList,
          reasonTypeIdList: pageData.result.reasonTypeIdList,
          evaluationFlag: pageData.result.evaluationFlag ? 2 : 1,
          evaluationNature: pageData.result.evaluationNature,
          remark: pageData.result.remark,
          resultId: pageData.result.resultId
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
  },

  subscriptions: {},
};
