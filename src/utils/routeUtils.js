import pathToRegexp from 'path-to-regexp';
import { CAS_HOST } from './constants';
import storage from './storage';

export function redirectToLogin() {
  storage.removeItem('admin_user');
  storage.removeItem('admin_auth');
  localStorage.clear();
  const { origin,pathname } = window.location;
  alert(pathname)
  const serverUrl = `${CAS_HOST}/tologin`;
  let fromEmail = false;
  if(pathname){
    fromEmail = isFromEmail(pathname);
  }
  if(fromEmail) {
    window.location.href = `${serverUrl}?originPage=${origin}${pathname.substring(0,fromEmail)}`;
  } else {
    window.location.href = `${serverUrl}?originPage=${origin}`;
  }
}

export function casLogout() {
  storage.removeItem('admin_user');
  storage.removeItem('admin_auth');
  localStorage.clear();
  const { origin,pathname } = window.location;
  const logoutUrl = `${CAS_HOST}/apis/caslogout?`;
  let fromEmail = false;
  if(pathname){
    fromEmail = isFromEmail(pathname);
  }
  if(fromEmail) {
    const pageUrl = `pageUrl=${CAS_HOST}/tologin?originPage=${origin}${pathname.substring(0,fromEmail)}`;
    window.location.href = `${logoutUrl}${pageUrl}`;
  } else {
    const pageUrl = `pageUrl=${CAS_HOST}/tologin?originPage=${origin}`;
    window.location.href = `${logoutUrl}${pageUrl}`;
  }
}
export function checkPathname(path = '') {
  const data1 = storage.getUserAuth() || [];
  const pathRegexp = pathToRegexp(path);
  const menuKey = data1.find(key => pathRegexp.test(`${key.resourceUrl}`));
  if (menuKey) {
    return true;
  } else return false;
}

function isFromEmail(pathname) {
  alert(pathname);
  return pathname.indexOf('/fromEmail')>0?pathname.indexOf('/fromEmail'):false;
}
