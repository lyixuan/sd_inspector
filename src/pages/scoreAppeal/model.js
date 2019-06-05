import { message } from 'antd';
import {
  getOrgMapList,creditDimensionList,getAppealInfoCheckList,
  getBaseAppealInfo,
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
    detailInfo:{},  // 详情
    appealRecord:{},  // 审核记录
    dimensionList: [
      {id:12,name:'开班电话',parentId:11},
      {id:17,name:'IM不及时',parentId:14},
      {id:15,name:'IM未回复',parentId:14},
      {id:16,name:'IM不满意',parentId:14},
      {id:20,name:'工单初次减分',parentId:19},
      {id:21,name:'工单二次减分',parentId:19},
      {id:22,name:'工单三次减分',parentId:19},
      {id:24,name:'事件',parentId:23},
      {id:25,name:'班主任投诉',parentId:23},
      {id:26,name:'退费',parentId:23},
      {id:47,name:'退挽',parentId:23},
      {id:45,name:'60分钟以下',parentId:42},
      {id:44,name:'60至120分钟',parentId:42},
      {id:43,name:'120分钟以上',parentId:42},
    ], // 学分维度列表
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
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    // 获取申诉基础详情
    *queryBaseAppealInfo({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getBaseAppealInfo, params);
      if (result.code === 20000) {
        const detailInfo = result.data || [];
        yield put({ type: 'save', payload: { detailInfo } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    // 获取审核记录详情
    *queryAppealInfoCheckList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getAppealInfoCheckList, params);
      if (result.code === 20000) {
        const appealRecord = result.data || [];
        yield put({ type: 'save', payload: { appealRecord } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
      }
    },
    // 申诉学分维度
    *getCreditDimensionList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(creditDimensionList, params);
      const dimensionList = result.data || [];

      if (result.code === 20000) {
        yield put({ type: 'save', payload: { dimensionList } });
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
