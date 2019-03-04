import request from '@/utils/request';

export async function getUserAuthList() {
    return request('/api/test', {
        data: {
            ID: 12345
        }
    });
}

export async function loginOut() {
    return request('/proxy/token/logout', {
        method: 'post',
    });
}

// 获取考期列表
export async function getExamList() {
  return request('/proxy/detail/getExamList', {
    method: 'get',
  });
}
