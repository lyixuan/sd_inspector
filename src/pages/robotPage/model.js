import {
  getOrgList,
} from './services';

import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";

export default {
  namespace: 'robotPage',
  state: {
    globalOrgList: {}
  },
  effects: {
    // 自考壁垒对应学院
    *getOrgList({ payload, callback }, { call, put }) {
      const result = yield call(getOrgList, payload.params);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'saveOrg', payload: { listObj: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveOrg(state, { payload }) {
      const globalOrgList = {
        0: getNullNodeList(payload.listObj[0]),
        1: getNullNodeList(payload.listObj[1]),
      };
      return { ...state, globalOrgList };
    },

  }
}

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
