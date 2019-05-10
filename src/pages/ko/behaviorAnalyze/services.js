import request from '@/utils/request';
import { dealSankeyData } from '@/pages/ko/components/sanKeyFun2';
import { msgF } from '@/utils/utils';

// 桑吉图接口1.1
export async function sankeySuperApi({params,formParams,otherParams}) {
  const postParams = {...params,...otherParams,...formParams};
  const {page:currentPage} = params;
  let result = {
    code: 20000,
    msg: '成功',
    data: {}
  };
  const response = await request('/sankey/sankeyMapData', {method: 'post',  data:postParams });

  if (response.code === 20000) {
    result.data.sankeyData = dealSankeyData({sankey:response.data.sankeyData||{},pvuvData:response.data.pvuvData,currentPage});
    result.data.behaviourData = response.data.behaviourData?response.data.behaviourData : [];
    result.data.pvuvData = response.data.pvuvData?response.data.pvuvData : {};
    result.data.userSize = response.data.userSize||0;
    result.data.currentPage = currentPage;
    result.data.currentActionName = otherParams.currentActionName||'';
  } else {
    result.code = response.code;
    result.msg = msgF(response.msg,response.msgDetail);
  }
  return result;
}
