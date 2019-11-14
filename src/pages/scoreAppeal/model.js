import { message } from 'antd';
import {
  getOrgMapList,
  creditDimensionList,
  getAppealInfoCheckList,
  getBaseAppealInfo,
  exportExcel,
  getOrgMapTree,
} from '@/pages/scoreAppeal/services';
import { msgF, BiFilter, downBlob } from '@/utils/utils';

export default {
  namespace: 'scoreAppealModel',

  state: {
    orgList: [], // 保存组织原始结构
    orgListTreeData: [], // 保存组织处理成treeData需要的结构
    detailInfo: {}, // 详情
    appealRecord: {}, // 审核记录
    dimensionList: BiFilter('SCORE_APPEAL_DIS'), // 学分维度列表
    appealOrgList: [],
    appealOrgListTreeData: [],
  },

  effects: {
    // 组织列表
    *getOrgMapList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getOrgMapList, params);
      const orgList = result.data || [];

      if (result.code === 20000) {
        yield put({ type: 'saveMap', payload: { orgList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 质检申诉管理内归属组织修改
    *getOrgMapTree({ payload }, { call, put }) {
      const result = yield call(getOrgMapTree);
      const appealOrgList = result.data || [];
      if (result.code === 20000) {
        yield put({ type: 'saveAppealMap', payload: { appealOrgList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 获取申诉基础详情
    *queryBaseAppealInfo({ payload }, { call, put }) {
      yield put({ type: 'clearState', payload: { detailInfo: {} } });
      const params = payload.params;
      const result = yield call(getBaseAppealInfo, params);
      if (result.code === 20000) {
        const detailInfo = result.data || {};
        yield put({ type: 'save', payload: { detailInfo } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 获取审核记录详情
    *queryAppealInfoCheckList({ payload }, { call, put }) {
      yield put({ type: 'clearState', payload: { appealRecord: {} } });
      const params = payload.params;
      const result = yield call(getAppealInfoCheckList, params);
      if (result.code === 20000) {
        const appealRecord = result.data || {};
        yield put({ type: 'save', payload: { appealRecord } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 导出
    *exportExcel({ payload }, { call }) {
      const params = payload.params;
      const result = yield call(exportExcel, params);
      if (result) {
        const { headers } = result.response || {};
        const filename = headers.get('content-disposition') || '';
        const numName = filename.split('filename=')[1]; // 带后缀的文件名
        const numName2 = numName.split('.')[0]; // 纯文件名
        const suffix = numName.split('.')[1]; // 后缀
        downBlob(result.data, `${eval("'" + numName2 + "'")}.${suffix}`);
        message.success('导出成功');
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // // 申诉学分维度
    // *getCreditDimensionList({ payload }, { call, put }) {
    //   const params = payload.params;
    //   const result = yield call(creditDimensionList, params);
    //   const dimensionList = result.data || [];
    //
    //   if (result.code === 20000) {
    //     yield put({ type: 'save', payload: { dimensionList } });
    //   } else {
    //     message.error(msgF(result.msg,result.msgDetail));
    //   }
    // },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveAppealMap(state, { payload }) {
      console.log(payload, 'payload');
      const appealOrgListTreeData = toTreeData(payload.appealOrgList);
      return { ...state, appealOrgList: payload.appealOrgList, appealOrgListTreeData };
    },
    saveMap(state, { payload }) {
      const orgListTreeData = toTreeData(payload.orgList);
      return { ...state, orgList: payload.orgList, orgListTreeData };
    },
    clearState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};

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
