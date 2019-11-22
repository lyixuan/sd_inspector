import { message } from 'antd';
import {
  getOrgMapList,
} from '@/pages/qualityAppeal/services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'classQualityModel',

  state: {
    orgList: [], // 保存组织原始结构
  },

  effects: {

    
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};
