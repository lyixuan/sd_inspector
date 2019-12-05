import {
  getKnowledgeList,
  getQuestionType,
  getQuestionList,
  getGuessData,
  getAnswer,
  guessTempSave,
  getGoingActivity,
  getRelationData,
  similarTempSave
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
    answer: {},
    relationData: {},
    globalQTypes: {},
    globalQuestion: {}
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
        yield put({ type: 'saveGetQuestionData', payload: { list: result.data, id: params.id } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getQuestionList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getQuestionList, params);
      if (result.code === 200) {
        // yield put({ type: 'save', payload: { questionList: result.data } });
        yield put({ type: 'saveGetQuestionList', payload: { questionList: result.data || [], questionTypeId: params.questionTypeId } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getGuessData({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getGuessData, params);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { guessData: result.data[0] || { list: [] } } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getRelationData({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getRelationData, params);
      if (result.code === 200) {
        yield put({ type: 'save', payload: { relationData: result.data || {} } });
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
      const result = yield call(guessTempSave, params);
      if (result.code === 200) {
        yield put({ type: 'save' });
        callBack(result);
      } else if (result) {
        callBack(result);
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *similarTempSave({ payload, callBack }, { call, put }) {
      const params = payload.params;
      const result = yield call(similarTempSave, params);
      if (result.code === 200) {
        yield put({ type: 'save' });
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
    saveGetQuestionData(state, { payload }) {
      const { list, id } = payload;
      state.globalQTypes[id] = list;
      return { ...state };
    },
    saveGetQuestionList(state, { payload }) {
      const { questionList = [], questionTypeId } = payload;
      state.globalQuestion[questionTypeId] = questionList;
      return { ...state };
    },
    formatData(data) {
      if (Array.isArray(data)) {
        for (let i = 0, len = data.length; i < len; i++) {
          data[i].value = data[i].id;
          data[i].title = data[i].text;
          data[i].children = data[i].childNodes;
          if (data[i].childNodes && data[i].childNodes.length > 0) {
            data[i].children = this.formatData(data[i].childNodes);
          }
        }
        return data;
      }
    }

  }
}
