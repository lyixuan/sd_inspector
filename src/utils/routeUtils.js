import pathToRegexp from 'path-to-regexp';
import {CAS_HOST, REMOVE_LOCAL_DATA} from './constants';
import storage from './storage';

function removeLocalData() {
  REMOVE_LOCAL_DATA.map(item =>  storage.removeItem(item))
}

export function redirectToLogin() {
  storage.removeItem('admin_user');
  storage.removeItem('admin_auth');
  storage.removeItem('pkListType');
  storage.removeItem('hasDataCredit');
  storage.removeItem('creditSearchParams');
  storage.removeItem('pkUsers');
  storage.removeItem('pkGroupList');
  removeLocalData()
  
  const { origin } = window.location;
  const serverUrl = `${CAS_HOST}/tologin`;
  window.location.href = `${serverUrl}?originPage=${origin}`;
}

export function casLogout() {
  storage.removeItem('admin_user');
  storage.removeItem('admin_auth');
  storage.removeItem('pkListType');
  storage.removeItem('hasDataCredit');
  storage.removeItem('creditSearchParams');
  storage.removeItem('pkUsers');
  storage.removeItem('pkGroupList');
  removeLocalData()

  const { origin } = window.location;
  const logoutUrl = `${CAS_HOST}/apis/caslogout?`;
  const pageUrl = `pageUrl=${CAS_HOST}/tologin?originPage=${origin}`;
  window.location.href = `${logoutUrl}${pageUrl}`;
}
export function checkPathname(path = '') {
  const data1 = storage.getUserAuth() || [];
  const pathRegexp = pathToRegexp(path);
  const menuKey = data1.find(key => pathRegexp.test(`${key.resourceUrl}`));
  if (menuKey) {
    return true;
  } else return false;
}
