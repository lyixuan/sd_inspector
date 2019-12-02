import {
  getKnowledgeList,
  getQuestionType,
  getQuestionList,
  getGuessData,
  getAnswer,
  guessTempSave,
  getGoingActivity
} from './services';

import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";
import { callbackify } from 'util';

export default {
  namespace: 'hotQuestion',
  state: {
    knowledgeList: [],
    questionTypeList: [],
    questionList: [],
    guessData: {},
    answer: {}
  },
  effects: {
    *getGoingActivity({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getGoingActivity, params.id);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { knowledgeList: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getKnowledgeList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getKnowledgeList, params.id);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { knowledgeList: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getQuestionType({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getQuestionType, params.id);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { questionTypeList: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getQuestionList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getQuestionList, params);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { questionList: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getGuessData({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getGuessData, params);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { guessData: result.data[0] || {} } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getAnswer({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getAnswer, params);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { answer: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *guessTempSave({ payload, callBack }, { call, put }) {
      const params = payload.params;
      console.log(70, params)
      const result = yield call(guessTempSave, params);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { answer: result.data } });
        callBack(result);
      } else if (result) {
        callBack(result);
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  }
}
