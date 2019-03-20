import request from '@/utils/request';


// 查询组织架构
export async function getOrgMapList(params) {
  return request('/quality/orgMap/getOrgMapList', { params });
}

// 查询分维
export async function getDimensionList(params) {
  return request('/quality/dimension/rootList', { params });
}


