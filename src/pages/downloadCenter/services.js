import {stringify} from 'qs';
import request from '@/utils/request';

/*
设置可选日期区间回显
 */
export async function getRangeDate(params) {
  return request(`/apis/time/getRange?${stringify(params)}`, {
    method: 'GET',
  });
}

/*
获取不可选时间列表
 */
export async function getDate(params) {
  return request(`/apis/time/getDate?${stringify(params)}`, {
    method: 'GET',
  });
}

// 底表列表
export async function bottomTableList(params) {
  let query = {};
  query.userId = params.userId;
  query.page = params.pageNum + 1;
  query.pageSize = params.pageSize;
  return request(`/bottomTask/list?${stringify(query)}`, {
    method: 'GET',
    server: 'downloadCenter'
  });
}

// 底表下载
export function downLoadBT(params) {
  return request(`/apis/consoleBottomDown/newDownLoad?${stringify(params)}`, {
    method: 'GET',
  });
}

// 底表添加任务
export async function addTask(params) {
  return request(`/apis/consoleBottomDown/addTask`, {
    method: 'POST',
    data: params,
  });
}

// 获取所有学院列表
export async function findAllOrg(params) {
  return request(`/apis/consoleBottomDown/findAllOrg?${stringify(params)}`, {
    method: 'GET',
  });
}
