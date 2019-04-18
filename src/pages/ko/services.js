import request from '@/utils/request';

// 页面枚举接口
export async function getKOEnumList(params) {
    return request('/homePage/enumList', { params });
}
