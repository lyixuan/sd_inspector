import {
  getOrgList,
} from './services';

import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";

export default {
  namespace: 'robotTrend',
  state: {

  },
  effects: {


  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },


  }
}


