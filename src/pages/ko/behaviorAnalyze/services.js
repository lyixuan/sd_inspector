import request from '@/utils/request';
import { dealMapOrg, dealResultData } from '@/pages/ko/components/sanKeyFun';
import { msgF } from '@/utils/utils';

// 桑吉图接口
export async function getSankeyData({params,formParams,otherParams}) {
  let result = {
    code: 20000,
    msg: '成功',
    data: {
      behaviourData: [],
      sankeyData: { upPageList: [], downPageList: [], upPage: {}, downPage: {},currentPageObj: {},currentPage:'' } },
  };
  // 请求结构
  const response = await request('/homePage/sankeyMapOrg', {params });
  if (response.code === 20000) {
    // 构造第二次请求的参数
    const params2 = dealMapOrg({data:response.data,formParams,params,otherParams});
    // 请求数据
    const response2 = await request('/api/sankeyMapData', {method: 'post',  data:params2 });
    if (response2.code === 20000) {
      // 处理两次结果
      result.data.sankeyData = dealResultData({data:response.data,data2:response2.data.sankeyData});
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
