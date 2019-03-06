import { message } from 'antd/lib/index';
import { addTask,getExamList, getDetailDataPage, getQueryConditionList, addQueryCondition, deleteQueryCondition, updateQueryCondition } from './services';
import {BiFilter} from '@/utils/utils';
export default {
  namespace: 'dataDetail',

  state: {
    tableList:[],
    dataSourceSize: 0,
    queryConditionList:[],
    examList: [],
    pageNum:1,
    pageSize:10
  },

  effects: {
    // 获取考期列表
    *getExamList({ payload }, { call, put }) {
      const result = yield call(getExamList, payload);
      const examList = result.data || [];
      examList.forEach((v,i) => {
        examList[i]['exam'] = `${v.examYearmonth.replace('-','').substr(2)}考期`
      });
      if (result && result.code === 20000) {
        yield put({ type: 'save', payload: { examList } });
      } else {
        message.error(result.msg);
      }
    },
    // 数据明细查询结果
    *getDetailData({ payload }, { call, put }) {
      payload.params.pageNum = 1;
      payload.params.pageSize = 36;
      const result = yield call(getDetailDataPage, payload.params);
      const dataSourceSize = result.data ? result.data.size : 0;
      const tableList = result.data ? result.data.list : [];
      if (result && result.code === 20000) {
        yield put({ type: 'save', payload: { tableList } });
        yield put({ type: 'save', payload: { dataSourceSize } });
      } else {
        message.error(result.msg);
      }
    },
    // 我的查询条件
    *getQueryConditionList({ payload }, { call, put }) {
      const result = yield call(getQueryConditionList, payload.params);
      const queryConditionList = result.data || [];
      if (result && result.code === 20000) {
        // 根据id添加name
        queryConditionList.forEach((v,i) => {
          queryConditionList[i]['exam2'] = `${v.exam.replace('-','').substr(2)}考期`
          queryConditionList[i]['stuTypeName'] = BiFilter(`STUDENT_TYPE|id:${queryConditionList[i]['stuType']}`).name;
          queryConditionList[i]['admissionStatusName'] = BiFilter(`TICKET_STATES|id:${queryConditionList[i]['admissionStatus']}`).name;
          queryConditionList[i]['orderStatusName'] = BiFilter(`ORDER_STATE|id:${queryConditionList[i]['orderStatus']}`).name;
          const arr = queryConditionList[i]['msgStatusList'] ? queryConditionList[i]['msgStatusList'].split(','):[];
          queryConditionList[i]['msgStatusName']=[];
          arr.forEach((v)=>{
            queryConditionList[i]['msgStatusName'].push(BiFilter(`MSG_STATES|id:${Number(v)}`).name);
          });
          queryConditionList[i]['msgStatusName'] = queryConditionList[i]['msgStatusName'].join(',');
        });
        console.log(queryConditionList);
        yield put({ type: 'save', payload: { queryConditionList } });
      } else {
        message.error(result.msg);
      }
    },
    // 添加查询条件
    *addQueryCondition({ payload }, { call, put }) {
      const result = yield call(addQueryCondition, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'getQueryConditionList', payload: {params:{}} });
      } else {
        message.error(result.msg);
      }
    },
    // 修改查询条件
    *updateQueryCondition({ payload }, { call, put }) {
      const result = yield call(updateQueryCondition, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'getQueryConditionList', payload: {params:{}} });
      } else {
        message.error(result.msg);
      }
    },
    // 删除查询条件
    *deleteQueryCondition({ payload }, { call, put }) {
      const result = yield call(deleteQueryCondition, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'getQueryConditionList', payload: {params:{}} });
      } else {
        message.error(result.msg);
      }
    },
    // 添加下载任务
    *addTask({ payload }, { call, put }) {
      const result = yield call(addTask, payload.params);
      if (result.code === 20000) {
        message.success("添加成功");
      } else {
        message.error(result.msg);
      }
    }

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
