import request from '@/utils/request';
import { dealSankeyData } from '@/pages/ko/components/sanKeyFun2';
import { msgF,DeepCopy } from '@/utils/utils';

// 桑吉图接口1.1
export async function sankeySuperApi({params,formParams,otherParams}) {
  const postParams = {...params,...otherParams,...formParams,actionId:otherParams.currentActionKeyId};
  const {page:currentPage} = params;
  let result = {
    code: 20000,
    msg: '成功',
    data: {}
  };
  if (!postParams.page) return;
  const response = await request('/sankey/sankeyMapData', {method: 'post',  data:postParams});
  // const response = await request('http://172.16.58.175:8085/sankey/sankeyMapData', {method: 'post',  data:postParams ,prefix:null});
  if (response.code === 20000) {
    result.data.behaviourData = response.data.behaviourData?response.data.behaviourData : [];
    result.data.pvuvData = response.data.pvuvData?response.data.pvuvData : {};
    result.data.userSize = response.data.userSize||0;
    result.data.clickPersons = response.data.clickPersons||0;
    result.data.clickNum = response.data.clickNum||0;
    result.data.currentPage = currentPage;
    result.data.currentActionName = otherParams.currentActionName||'';
    result.data.sankeyData = dealSankeyData({sankey:response.data.sankeyData||{},pvuvData:response.data.pvuvData,currentPage});
    if(result.data.sankeyData && result.data.sankeyData.pv) result.data.pvuvData.pv = result.data.sankeyData.pv;
  } else {
    result.code = response.code;
    result.msg = msgF(response.msg,response.msgDetail);
  }
  return result;
}
