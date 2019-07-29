import { message } from 'antd/lib/index';
import { addTask, getExamList, getDetailDataPage, getQueryConditionList, addQueryCondition, deleteQueryCondition, updateQueryCondition } from './services';
import { BiFilter, msgF } from '@/utils/utils';

export default {
  namespace: 'Archive',

  state: {
  },

  effects: {
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
