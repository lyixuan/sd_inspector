import request from '@/utils/request';
import { dealSankeyData } from '@/pages/ko/components/sanKeyFun2';
import { dealMapOrg, dealResultData } from '@/pages/ko/components/sanKeyFun';
import { msgF } from '@/utils/utils';

// 桑吉图接口
export async function sankeySuperApi({params,formParams,otherParams}) {
  let result = {
    code: 20000,
    msg: '成功',
    data: {
      behaviourData: {},
      sankeyData: { upPage: {}, downPage: {},currentPageObj: {},currentPage:'' } },
  };
  // 请求结构
  const response = await request('/homePage/sankeyMapOrg', {params });
  if (response.code === 20000) {
    // 构造第二次请求的参数
    const params2 = dealMapOrg({data:response.data,formParams,params,otherParams});
    // 请求数据
    const response2 = await request('/sankey/sankeyMapData', {method: 'post',  data:params2 });
    if (response2.code === 20000) {
      // 处理两次结果
      result.data.sankeyData = dealResultData({data1:response.data,data2:response2.data.sankeyData,params});
      result.data.behaviourData = response2.data.behaviourData?response2.data.behaviourData : [];
      result.data.pvuvData = response2.data.pvuvData?response2.data.pvuvData : {};
      result.data.userSize = response2.data.userSize||0;
      result.data.currentPage = params.page;
      result.data.currentActionName = otherParams.currentActionName||'';
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

// 桑吉图接口1.1
export async function sankeySuperApi2({params,formParams,otherParams}) {
  const postParams = {...params,...otherParams,...formParams};
  const {page:currentPage} = params;
  let result = {
    code: 20000,
    msg: '成功',
    data: {}
  };
  // 请求结构
  const response = await request('/homePage/sankeyMapOrg', { params:postParams });
  if (response.code === 20000) {
    // 处理两次结果
    result.data.sankeyData = dealSankeyData({sankey:response.data.sankey,pvuvData:response.data.pvuvData,currentPage});
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
