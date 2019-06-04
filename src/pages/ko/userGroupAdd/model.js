import { selectFile, checkFile } from './services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'userGroupAdd',

  state: {
    checkResult: null,
    current: 0,
    fileList: [],
    isLoading: null
  },

  effects: {
    *selectFile({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(selectFile, params);
      if (result.code === 20000) {
        const checkResult = result.data;
        yield put({ type: 'save', payload: { checkResult, current: 1, isLoading: false } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *checkFile({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(checkFile, params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { current: 2, isLoading: false } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *editCurrent({ payload }, { put }) {
      const { current } = payload;
      yield put({ type: 'save', payload: { current } });
    },
    *saveFileList({ payload }, { put }) {
      const { fileList } = payload;
      yield put({ type: 'save', payload: { fileList } });
    },
    *editCurrent({ payload }, { put }) {
      const { current } = payload;
      yield put({ type: 'save', payload: { current, isLoading: false } });
    },
    *editLoading({ payload }, { put }) {
      const { isLoading } = payload;
      yield put({ type: 'save', payload: { isLoading } });
    },
    *initParams({ payload }, { put }) {
      const { disableDel, nums } = payload;
      yield put({ type: 'save', payload: { disableDel, nums } });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};
