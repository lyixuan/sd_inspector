import pathToRegexp from 'path-to-regexp';
import { CAS_HOST } from './constants';
import storage from './storage';

export function redirectToLogin() {
  storage.removeItem('admin_user');
  storage.removeItem('admin_auth');
  localStorage.clear();
  const { origin,pathname,search } = window.location;
  const serverUrl = `${CAS_HOST}/tologin`;
  let fromEmail = false;
  if(search){
    fromEmail = isFromEmail(search);
  }
  if(fromEmail) {
    window.location.href = `${serverUrl}?originPage=${origin}${pathname}`;
  } else {
    window.location.href = `${serverUrl}?originPage=${origin}`;
  }
}

export function casLogout() {
  storage.removeItem('admin_user');
  storage.removeItem('admin_auth');
  localStorage.clear();
  const { origin,pathname,search } = window.location;
  const logoutUrl = `${CAS_HOST}/apis/caslogout?`;
  let fromEmail = false;
  if(search){
    fromEmail = isFromEmail(search);
  }
  console.log('fromEmail',fromEmail)
  if(fromEmail) {
    const pageUrl = `pageUrl=${CAS_HOST}/tologin?originPage=${origin}${pathname}`;
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

function isFromEmail(search) {
  let result  = false;
  const str = search.substr(1);
  const arr = str.split('&');
  arr.forEach((v)=>{
    const arrItem = v.split('=');
    if(arrItem[0] && arrItem[0]==='src' && arrItem[1] && arrItem[1]==='email') {
      result = true;
    }
  });
  return result;
}
