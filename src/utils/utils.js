// 全局函数文件

import constants from './constants';

export function BiFilter(param) {
  /**
   * 获取静态常量(constants.js)中的数据
   *
   * @param String                                          必传  说明: 以管道符分割，第一个参数表示要获取的常量名，第二个参数为附加条件
   * eg: BiFilter('FRONT_ROLE_TYPE_LIST')                  1、根据常量constName获取常量数据
   * eg: BiFilter('FRONT_ROLE_TYPE_LIST|id:class')         2、根据id='class'筛选本行object数据(constName需为Array)
   * eg: BiFilter('FRONT_ROLE_TYPE_LIST|id:class').level           3、根据id='class'筛选本行object数据中level的值(constName需为Array)
   * eg: BiFilter('FRONT_ROLE_TYPE_LIST|id->value,name->label')    4、获取constName 数组对象，并修改key名称，将id改为value，将name改为label (constName需为Array)
   *
   * @return undefined or other
   * */
  if (!param) {
    console.warn('请传入字符串参数');
    return false;
  }

  if (typeof param !== 'string') {
    console.warn('参数类型应为string');
    return false;
  }

  const tempArr = param.split('|');
  const constName = tempArr[0];
  const condition = tempArr[1];

  // 第一个参数结果, 以管道分割
  let result = constants[constName] ? JSON.parse(JSON.stringify(constants[constName])) : [];

  // 第二个参数结果, 以管道分割
  if (condition) {
    if (condition.indexOf(':') > -1) {
      // 获取string
      const type = condition.split(':')[0];
      const value = condition.split(':')[1];
      if (value === '') {
        result = {};
      } else if (result && Array.isArray(result) && type) {
        // 存在第二个参数，查询常量名称存在，且常量值为数组，且有id或name参数

        const list = [...result];
        result = {};
        for (let i = 0; i < list.length; i += 1) {
          // eslint-disable-next-line eqeqeq
          if (list[i][type] == value) {
            result = list[i];
            break;
          }
        }
      } else {
        console.warn('请求数据格不是数组，或key不存在');
        return null;
      }
    } else if (condition.indexOf('->') > -1 && result && Array.isArray(result)) {
      // 获取数组并修改key

      const conditionArr = condition.split(',');
      result.forEach((v1, i) => {
        conditionArr.forEach(v2 => {
          const oldKey = v2.split('->')[0];
          const newKey = v2.split('->')[1];
          result[i][newKey] = v1[oldKey];
          delete result[i][oldKey];
        });
      });
    } else {
      console.warn('参数格式错误');
      return false;
    }
  }
  return result;
};

export function DeepCopy(obj) {
  if (typeof obj === 'object' && obj) {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return obj;
  }
}

export function msgF(msg,msgDetail) {
  let r = '';
  if (msg && !msgDetail) {
    r = msg;
  }
  if (!msg && msgDetail) {
    r = msgDetail;
  }
  if (msg && msgDetail) {
    r = msg +','+msgDetail;
  }
  return  r;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

// 时间戳格式化
export function formatDate(timestamp, split = '') {
  const dateTime = new Date(Number(timestamp));
  const y = dateTime.getFullYear(); // 获取年
  let m = dateTime.getMonth() + 1; // 获取月
  m = m < 10 ? `0${m}` : m; // 判断月是否大于10
  let d = dateTime.getDate(); // 获取日
  d = d < 10 ? `0${d}` : d; // 判断日期是否大10
  return `${y}${split}${m}${split}${d}`; // 返回时间格式
}
// 时间转化成星期几
export function formatDateToWeek(date) {
  const weekArr = ['周日','周一','周二','周三','周四','周五','周六']
  const dateTime = new Date(date).getDay();
  return `${date} ${weekArr[dateTime]}`
}
// 处理url
/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function downBlob(blob, name) {
  // 接收返回blob类型的数据
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = name; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
}

export function thousandsFormat (num) {
  // 千分位分割,接收正整数
  var reg=/\d{1,3}(?=(\d{3})+$)/g;
  return (num + '').replace(reg, '$&,');
}
// 学分申诉
export function dealQuarys(pm) {
  const p = DeepCopy(pm);
  if (p.collegeIdList && p.collegeIdList.length > 0) {
    p.collegeIdList = p.collegeIdList.map((v) => {
      return Number(v.toString().replace('a-', ''));
    })
  } else {
    p.collegeIdList = undefined;
  }
  if (p.familyIdList && p.familyIdList.length > 0) {
    p.familyIdList = p.familyIdList.map((v) => {
      return Number(v.toString().replace('b-', ''));
    })
  } else {
    p.familyIdList = undefined;
  }
  if (p.groupIdList && p.groupIdList.length > 0) {
    p.groupIdList = p.groupIdList.map((v) => {
      return Number(v.toString().replace('c-', ''));
    })
  } else {
    p.groupIdList = undefined;
  }
  if (!p.creditBeginDate||!p.creditEndDate) {
    p.creditBeginDate = undefined
    p.creditEndDate = undefined
  }
  if (!p.appealBeginDate||!p.appealBeginDate) {
    p.appealBeginDate = undefined
    p.appealEndDate = undefined
  }
  if (p.creditType) {
    p.creditType = parseInt(p.creditType);
  } else {
    p.creditType = undefined
  }
  if (p.statusList&&p.statusList.length>0) {

    p.statusList = p.statusList.map((v)=>Number(v))
  } else {
    p.statusList = undefined
  }

  if (!p.appealOrderNum) {
    p.appealOrderNum = undefined
  }

  if (!p.stuName) {
    p.stuName = undefined
  } else {
    p.stuName = p.stuName.trim()
  }
  if (p.stuId) {
    p.stuId = parseInt(p.stuId.toString().trim());
  } else {
    p.stuId = undefined
  }
  return p;
};
