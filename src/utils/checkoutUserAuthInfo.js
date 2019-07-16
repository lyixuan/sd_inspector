import storage from './storage';

export function checkoutLogin() {
  const admin_user = storage.getItem('admin_user');
  const admin_auth = storage.getItem('admin_auth');
  if (admin_user && admin_auth) {
    return true;
  } else return false;
}

