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
          if (list[i][type] === value) {
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


