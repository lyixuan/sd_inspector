import { message } from 'antd';
import {
  getOrgMapList,
  getDimensionList,
  getOrgMapByMail,
  getAppealDetail,
  getQualityDetail,
  getOrderNum,
  queryDimensionTreeList,
  checkRepeatQualityInspection,
} from '@/pages/qualityAppeal/services';

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
  namespace: 'qualityAppealHome',

  state: {
    orgList: [], // 保存组织原始结构
    orgListTreeData: [], // 保存组织处理成treeData需要的结构
    dimensionList1: [], // 客诉分维
    dimensionList2: [], // 班主任分维
    orgMapByMailData: {}, // 根据邮箱获取用户组织信息
    DetailData: [], // 申诉详情页数据
    QualityDetailData: {}, // 质检详情页数据
    orderNumData: null,   // 根据子订单编号获取订单详情数据
  },

  effects: {
    *getOrgMapList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getOrgMapList, params);
      const orgList = result.data || [];

      if (result.code === 20000) {
        yield put({ type: 'saveMap', payload: { orgList } });
      } else {
        message.error(result.msgDetail);
      }
    },
    *getDimensionList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getDimensionList, params);
      let dimensionList1 = [],
        dimensionList2 = [];
      if (result.code === 20000) {
        if (params.qualityType === 1) {
          dimensionList1 = result.data || [];
          yield put({ type: 'save', payload: { dimensionList1 } });
        }
        if (params.qualityType === 2) {
          dimensionList2 = result.data || [];
          yield put({ type: 'save', payload: { dimensionList2 } });
        }
      } else {
        message.error(result.msgDetail);
      }
    },
    *getOrgMapByMail({ payload }, { call, put }) {
      const response = yield call(getOrgMapByMail, payload);
      if (response.code === 20000) {
        const orgMapByMailData = response.data || {};
        // 强制触发更新
        orgMapByMailData.upDateTime = new Date().valueOf();
        yield put({
          type: 'saveOrgMapByMailData',
          payload: { orgMapByMailData, },
        });
      } else {
        message.error(response.msg);
      }
    },
    *getDetailData({ payload }, { call, put }) {
      //申诉详情页数据
      const result = yield call(getAppealDetail, { ...payload });
      const DetailData = result.data ? result.data : [];

      if (result.code === 20000) {
        yield put({ type: 'saveDetailData', payload: { DetailData } });
      } else {
        message.error(result.msg);
      }
    },
    *getQualityDetailData({ payload }, { call, put }) {
      //质检详情页数据
      const result = yield call(getQualityDetail, { ...payload });
      const QualityDetailData = result.data ? result.data : {};

      if (result.code === 20000) {
        yield put({ type: 'saveQualityDetailData', payload: { QualityDetailData } });
      } else {
        message.error(result.msg);
      }
    },
    *getOrderNum({ payload }, { call, put }) {
      const response = yield call(getOrderNum, payload);
      if (response.code === 20000) {
        const orderNumData = response.data || {};
        yield put({
          type: 'saveOrderNumData',
          payload: { orderNumData },
        })
      } else {
        message.error(response.msg);
      }

    },
    *queryDimensionTreeList({ payload }, { call, put }) {
      const response = yield call(queryDimensionTreeList, payload);
      if (response.code === 20000) {
        const dimensionTreeList = response.data;

        yield put({
          type: 'saveDimensionTreeList',
          payload: { dimensionTreeList }
        })

      } else {
        message.error(response.msg);
      }

    },
    *checkRepeatQualityInspection({ payload }, { call, put }) {
      const { callback, params } = payload
      const response = yield call(checkRepeatQualityInspection, params);
      if (response.code === 20000) {
        callback.call(null, response.msgDetail)
      } else {
        message.error(response.msg);
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveMap(state, { payload }) {
      const orgListTreeData = toTreeData(payload.orgList);
      return { ...state, orgList: payload.orgList, orgListTreeData };
    },
    saveOrgMapByMailData(state, { payload }) {
      return { ...state, ...payload };
    },
    saveDetailData(state, { payload }) {
      const { DetailData } = payload;
      if (DetailData) {
        DetailData.forEach((item, i) => {
          DetailData[i].key = i + 1;
        });
      }
      return { ...state, ...payload };
    },
    saveQualityDetailData(state, { payload }) {
      return { ...state, ...payload };
    },
    saveOrderNumData(state, { payload }) {
      return { ...state, ...payload };
    },
    saveDimensionTreeList(state, action) {
      return { ...state, ...action.payload };
    },
    clearOrderNumData(state, { payload }) {
      const orderNumData = null;
      return { ...state, orderNumData };
    }
  },

  subscriptions: {},
};
