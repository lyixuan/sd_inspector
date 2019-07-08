import { getAuthority } from './authority';
import storage from './storage';

export function checkoutLogin() {
  const admin_user = storage.getItem('admin_user');
  const admin_auth = storage.getItem('admin_auth');
  if (admin_user && admin_auth) {
    return true;
  } else return false;
}

export function checkoutAuthRoute(authority) {
  const authData = getAuthority('admin_auth') || [];
  const isHasPath = authData.find(item => item.resourceUrl === authority);
  return isHasPath;
}
