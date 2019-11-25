import { message } from 'antd';
import {
  getFindTreeList,
} from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'classQualityModel',

  state: {
    treeList: [
      {
        violationName: '违规',
        level: 1,
        violationLevel: '特级违规'
      }
    ], // 目录
  },

  effects: {
    *getFindTreeList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getFindTreeList, params);
      if (result.code === 20000) {
        yield put({ type: 'saveTree', payload: { treeList: result.data } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveTree(state, { payload }) {
      const treeList = payload.treeList;
      return { ...state, treeList: fillDataSource(treeList) };
    },
  },

  subscriptions: {},
};
function fillDataSource(params = [], intList = [], n = 1) {
  params.map(item => {
    item.level = n;
    const { childNode	, ...others } = item;
    intList.push(others);
    if (childNode && childNode.length > 0) {
      fillDataSource(childNode, intList, n + 1);
    }
  })
  return intList
}