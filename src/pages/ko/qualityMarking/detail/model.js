import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';
import {
  getConsultTypeTree,
  getReasonTypeTree,
  edit,
  submit
} from './services';

export default {
  namespace: 'AiDetail',

  state: {
    consultTypeTree: null,
    reasonTypeTree: null,
    pageData: null,
    submitParam: {
      ordId: undefined,
      consultTypeId: undefined,
      consultTypeIdList: [],
      reasonTypeIdList: [],
      evaluationFlag: null,
      evaluationNature: null,
      remark: ''
    },

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
    *edit({ payload, callback }, { call, put }) {
      const params = payload.params
      const result = yield call(edit, params);
      if (result.code === 20000) {
        const pageData = result.data || [];
        const submitParam = {
          ordId: pageData.result.ordId || undefined,
          consultTypeId: pageData.result.consultTypeId || undefined,
          consultTypeIdList: pageData.result.consultTypeIdList,
          reasonTypeIdList: pageData.result.reasonTypeIdList,
          evaluationFlag: pageData.result.evaluationFlag,
          evaluationNature: pageData.result.evaluationNature,
          remark: pageData.result.remark
        }
        if (callback) {
          callback(submitParam)
        }
        yield put({
          type: 'save', payload: {
            pageData,
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
