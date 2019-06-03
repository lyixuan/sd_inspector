import { message } from 'antd';
import {
  getOrgMapList,
} from '@/pages/scoreAppeal/services';
import { msgF } from '@/utils/utils';

function toTreeData(orgList) {
  const treeData = [];
  orgList.forEach(v => {
    const o = { title: v.name, value: `a-${v.id}`, key: v.id, lv: 1 };
    if (v.nodeList.length > 0) {
      o.children = [];
      v.nodeList.forEach(v1 => {
        const o1 = { title: v1.name, value: `b-${v1.id}`, key: v1.id + 1000, lv: 2 };
        o.children.push(o1);
        if (v1.nodeList.length > 0) {
          o1.children = [];
          v1.nodeList.forEach(v2 => {
            const o2 = { title: v2.name, value: `c-${v2.id}`, key: v2.id + 100000, lv: 3 };
            o1.children.push(o2);
          });
        }
      });
    }
    treeData.push(o);
  });
  return treeData;
}

export default {
  namespace: 'scoreAppealModel',

  state: {
    orgList: [], // 保存组织原始结构
    orgListTreeData: [], // 保存组织处理成treeData需要的结构
  },

  effects: {
    *getOrgMapList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getOrgMapList, params);
      const orgList = result.data || [];

      if (result.code === 20000) {
        yield put({ type: 'saveMap', payload: { orgList } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveMap(state, { payload }) {
      const orgListTreeData = toTreeData(payload.orgList);
      return { ...state, orgList: payload.orgList, orgListTreeData };
    },
  },

  subscriptions: {},
};