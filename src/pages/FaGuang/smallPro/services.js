import request from '@/utils/request';

// 查询列表
export async function getList1() {
  return request('/shinecollege/banner/list?bannerType=1' );
}

export async function getList2() {
  return request('/shinecollege/banner/list?bannerType=2' );
}
//  编辑
export async function updateData(data) {
  return request('/shinecollege/banner/update', { method: 'post', data });
}
// 导出
export async function exportData(params) {
  return request('/shinecollege/exportData/all',{params} );
}
