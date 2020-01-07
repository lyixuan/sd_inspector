//设置
function setValue(options) {
  let _default = {
    name: null,
    value: null,
    expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24)),
    path: '/',
    domain: '',
  };
  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      if (key === 'expires') {
        _default[key] = new Date(Date.now() + (1000 * 60 * 60 * 24) * options[key]);
      } else {
        _default[key] = options[key];
      }
    }
  }
  document.cookie = _default.name + '=' + encodeURI(_default.value) + ';expires=' + _default.expires.toUTCString() + ';path=' + _default.path + ';domain=' + _default.domain;
}

//获取
function getValue(name) {
  let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
  if (arr !== null) {
    return decodeURI(arr[2]);
  }
  return null;
}

//删除。
function removeValue(options) {
  let _default = {
    name: null,
    path: '/',
    domain: '',
  };
  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      _default[key] = options[key];
    }
  }
  if (getValue(_default.name)) {
    document.cookie = _default.name + '= ;path=' + _default.path + ';domain=' + _default.domain + ';expires=Fri,02-Jan-1970 00:00:00 GMT';
  }
}

export default {
  setValue,
  getValue,
  removeValue
}
