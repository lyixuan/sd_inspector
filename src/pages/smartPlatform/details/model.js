import { message } from 'antd/lib/index';
import { addTask,getExamList, getDetailDataPage, getQueryConditionList, addQueryCondition, deleteQueryCondition, updateQueryCondition } from './services';
import {BiFilter} from '@/utils/utils';
export default {
  namespace: 'dataDetail',

  state: {
    tableList:[],
    total: 0,
    totalPlan: 0,
    defaultCurrent: 1,
    defaultPageSize: 36,
    queryConditionList:[],
    examList: [],
    params:{}
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
    *getDetailData({ payload }, { call, put}) {
      const params = payload.params;
      const result = yield call(getDetailDataPage, params);
      yield put({ type: 'save', payload: { params } });
      if (result.code === 20000) {
        if (result.data) {
          const dataa = result.data;
          let total = 0;
          let totalPlan = 0;
          message.success('查询成功');
          total = dataa.dataList?dataa.dataList.length:0;
          totalPlan = dataa.planNumTotalNum||0;
          const tableList = result.data.dataList ? result.data.dataList:[];
          yield put({ type: 'save', payload: { tableList,total,totalPlan,params } });
        } else {
          message.error('查询结果异常');
        }
      } else {
        message.error(result.msg);
      }
    },
    // 我的查询条件
    *getQueryConditionList({ payload }, { call, put }) {
      const result = yield call(getQueryConditionList, payload.params);
      if (result && result.code === 20000) {
        const queryConditionList = result.data || [];
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
        yield put({ type: 'save', payload: { queryConditionList } });
      } else {
        message.error(result.msg);
      }
    },
    // 添加查询条件
    *addQueryCondition({ payload }, { call, put }) {
      const con = yield call(getQueryConditionList, {});
      if (con.code===20000 && con.data.length >=5) {
        message.success('最多保存5个条件');
        return
      }
      const result = yield call(addQueryCondition, payload.params);
      if (result.code === 20000) {
        message.success('保存成功');
        yield put({ type: 'getQueryConditionList', payload: {params:{}} });
      } else {
        message.error(result.msg);
      }
    },
    // 修改查询条件
    *updateQueryCondition({ payload }, { call, put }) {
      const result = yield call(updateQueryCondition, payload.params);
      if (result.code === 20000) {
        message.success('修改成功');
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
