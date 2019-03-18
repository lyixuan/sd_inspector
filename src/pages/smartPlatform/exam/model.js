import { message } from 'antd/lib/index';
import { province, examTotal,examOrg } from './services';

export default {
  namespace: 'exam',

  state: {
    porDataList: [],
    famDataList: [],
    colDataList: [],
    groDataList: [],
    examTotal: [],
    examOrg: [],
    isShowAll:false
  },

  effects: {
    *province({ payload }, { call, put }) {
      const data = yield call(province, { ...payload });
      if (data.code === 20000) {
        yield put({ type: 'saveDataList' , payload: { porDataList: data.data },});
      } else {
        message.error(data.msg);
      }
    },
    *examTotal(_, { call, put }) {
      const response = yield call(examTotal);
      if (response.code === 20000) {
        yield put({
          type: 'saveExamTotal',
          payload: { examTotal: response.data },
        })

      } else {
        message.error(response.msg)
      }
    },
    *examOrg({payload}, { call, put }) {
      const {orgType} = payload;
      const response = yield call(examOrg, payload);
      if (response.code === 20000) {
        if(orgType === 'college'){
          yield put({
            type: 'save',
            payload: { colDataList: response.data },
          })
        }else  if(orgType === 'family'){
          yield put({
            type: 'saveFamDataList',
            payload: { famDataList: response.data },
          })
        }else {
          yield put({
            type: 'saveGroDataList',
            payload: { groDataList: response.data },
          })
        }

      } else {
        message.error(response.msg)
      }
    },
    *allGroData({payload}, { call, put }) {
      yield put({
        type: 'saveGroDataList',
        payload: { isShowAll: true },
      });
    }
  },

  reducers: {
    saveExamTotal(state, { payload }) {
      const { examTotal } = payload;
      const data = {
        examNotice:[],
        examPlan:[],
        examTicket:[],
      };
      data.examPlan = [
        {
          name:'全国考试计划人数：共',
          value:`${examTotal.examPlanNum}人`,
        },{
          name:'老生考试计划人数：',
          value:`${examTotal.oldExamPlanNum}人`,
        },{
          name:'新生考试计划人数：',
          value:`${examTotal.newExamPlanNum}人`,
        },{
          name:'人均服务老生：',
          value:`${examTotal.oldAvgServiceNum}人`,
        },{
          name:'人均服务新生：',
          value:`${examTotal.newAvgServiceNum}人`,
        }
      ];
      data.examNotice = [
        {
          name:'全国报考通知人数：共',
          value:`${examTotal.examPlanNum}人`,
        },{
          name:'触达人数：',
          value:`${examTotal.readNum}人`,
        },{
          name:'触达率：',
          value:`${(examTotal.readRatio*100).toFixed(2)}%`,
        },{
          name:'应通知新生：',
          value:`${examTotal.newReadNum}人`,
        },{
          name:'新生触达率：',
          value:`${(examTotal.newReadRatio*100).toFixed(2)}%`,
        },{
          name:'应通知老生：',
          value:`${examTotal.oldReadNum}人`,
        },{
          name:'老生触达率：',
          value:`${(examTotal.oldReadRatio*100).toFixed(2)}%`,
        }
      ];
      data.examTicket =[
        {
          name:'全国准考证填写人数：共',
          value:`${examTotal.examPlanNum}人`,
        },{
          name:'填写人数：',
          value:`${examTotal.admissionFillNum}人`,
        },{
          name:'填写率：',
          value:`${(examTotal.admissionFillRatio*100).toFixed(2)}%`,
        },{
          name:'新生填写：',
          value:`${examTotal.newAdmissionFillNum}人`,
        },{
          name:'新生填写率：',
          value:`${(examTotal.newAdmissionFillRatio*100).toFixed(2)}%`,
        },{
          name:'老生填写：',
          value:`${examTotal.oldAdmissionFillNum}人`,
        },{
          name:'老生填写率：',
          value:`${(examTotal.oldAdmissionFillRatio*100).toFixed(2)}%`,
        }
      ];
      return { ...state, examTotal:data };
    },
    saveDataList(state, { payload }) {
      const { porDataList } = payload;
      const data = {
        province:[],
        data1:[],
        data2:[],
        data3:[],
        data4:[],
      };

      if(porDataList){
        porDataList.map(item=>{
          data.province.push({name:item.province,value:10000});
          data.data1.push(item.oldAvgServiceNum);
          data.data2.push(item.newAvgServiceNum);
          data.data3.push(item.oldExamPlanNum);
          data.data4.push(item.newExamPlanNum);
          return data
        });
      }


      return { ...state, porDataList:data };
    },
    saveFamDataList(state, { payload }) {
      const { famDataList } = payload;
      const dataFam = {
        province:[],
        data1:[],
        data2:[],
        data3:[],
        data4:[],
      };
      if(famDataList){
        famDataList.map(item=>{
          dataFam.province.push({name:`${item.collegeName}|${item.familyName}`,value:10000});
          dataFam.data1.push(item.oldAvgServiceNum);
          dataFam.data2.push(item.newAvgServiceNum);
          dataFam.data3.push(item.oldExamPlanNum);
          dataFam.data4.push(item.newExamPlanNum);
          return dataFam
        });
      }
      return { ...state, famDataList:dataFam};
    },
    saveGroDataList(state, { payload }) {
      const { groDataList,isShowAll } = payload;
      const dataPro = {
        dataPro:[],
        data1:[],
        data2:[],
        data3:[],
      };
      if(groDataList){
        groDataList.map((item,i)=>{
          if(!isShowAll){
            if(i<20){
              dataPro.dataPro.push({name:`${item.collegeName}|${item.familyName}|${item.groupName}`,value:1000});
              dataPro.data1.push(
                {name:item.newAvgServiceNum,value:item.newExamPlanNum},
              );
              dataPro.data2.push({name:item.oldAvgServiceNum,value:item.oldExamPlanNum})
              // dataPro.data3.push(item.oldExamPlanNum);
            }
          }else {
            dataPro.dataPro.push({name:`${item.collegeName}|${item.familyName}|${item.groupName}`,value:1000});
            dataPro.data1.push(
              {name:item.newAvgServiceNum,value:item.newExamPlanNum},
            );
            dataPro.data2.push({name:item.oldAvgServiceNum,value:item.oldExamPlanNum})
            // dataPro.data3.push(item.oldExamPlanNum);
          }
          return dataPro
        });
      }
      return { ...state, groDataList:dataPro};
    },
    save(state, { payload }) {
      return { ...state, ...payload};
    }
  },

  subscriptions: {
  },
};
