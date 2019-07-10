import pathToRegexp from 'path-to-regexp';

import storage from './storage';

export function redirectToLogin() {
  const { href, origin } = window.location;
  const serverUrl = `${origin}/inspector-tologin`;
  window.location.href = `${serverUrl}?originPage=${href}`;
}

export function casLogout() {
  const { origin } = window.location;
  const logoutUrl = `${origin}/inspectorapis/caslogout?`;
  const pageUrl = `pageUrl=${origin}/inspector-tologin?originPage=${origin}`;

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
