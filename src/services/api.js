import request from '@/utils/request';


export async function getUserAuthList(data) {
    return request(`/token/login`, {
        method: 'POST',
        data,
    });
}

/*
* 获取用户对应的角色信息信息
* params：{userId}
* */
export async function CurrentUserListRole(params) {
    return request('/apis/account/listRole', { params });
}

/*
* 切换用户权限角色
* params：{userId}
* */
export async function userChangeRole(data) {
    return request(`/apis/account/changeRole`, {
        method: 'POST',
        data,
    });
}
// 根据userId和token,获取权限列表
export async function getPrivilegeList(params) {
    return request('/user/getPrivilegeList', { params });
}

// 新,获取权限列表
export async function getPrivilegeListNew() {
    return request('/apis/getPrivilegeList');
}


/*
* 新，用户信息接口
* */
export async function getUserInfoNew(params) {
    return request(`/apis/getUserInfo`, { params });
}


export async function getCertificationList() {
    return request('/inspectorapis/classStratification/getCertificationList', {});
}


export async function setBrowserInfo(data) {
  return request(`/user/recordBrowserInfo`, {
    method: 'POST',
    data,
  });
}

// 获取主题相关信息
export function getThemeData() {
  return request('/globalApi/getThemeInfo');
}

