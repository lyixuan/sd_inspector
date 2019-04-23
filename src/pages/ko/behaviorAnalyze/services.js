import request from '@/utils/request';
import { dealMapOrg, dealResultData } from '@/pages/ko/components/commonFun';
import { msgF } from '@/utils/utils';

// 桑吉图接口
export async function getSankeyData(params,formParams) {
  let result = {code:20000,msg:"成功",data:{ behaviourData:[],sankeyData:{upPageList:[],downPageList:[],upPage:{}, downPage:{}} }};
  const response = await request('/homePage/sankeyMapOrg', { params });
  if (response.code === 20000) {
    const params2 = dealMapOrg(response.data,formParams);
    const response2 = await request('/homePage/sankeyMapData', { params2 });
    if (response2.code === 20000) {
      result.data.sankeyData = dealResultData(response.data,response2.data.sankeyData);
      result.data.behaviourData = response2.data.behaviourData
    } else {
      result.code = -1;
      result.msg = msgF(response2.msg,response2.msgDetail);
    }
  } else {
    result.code = -1;
    result.msg = msgF(response.msg,response.msgDetail)
  }
  return result;
}
