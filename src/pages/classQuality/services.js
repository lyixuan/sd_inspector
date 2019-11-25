import request from '@/utils/request';

// 违规内容展示
export async function getFindTreeList(data) {
    return request('/qualityNotebook/findTreeList', { method: 'post', data });
}

