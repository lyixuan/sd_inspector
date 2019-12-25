import { stringify } from 'qs';
import { parse } from 'url';
// import { history } from '@/index';

export const pageObj = {
  // 分页key值以及默认值
  key: 'pageNum',
  value: 0,
};

export const saveParamsInUrl = (history, query, url) => {
  const pathname = url || history.location.pathname;
  const originSearch = parse(history.location.search, true).query || null;
  let paramsObj = pathname === history.location.pathname ? { ...originSearch, ...query } : query;
  paramsObj = filterEmptyUrlParams(paramsObj);
  history.replace({
    pathname,
    search: stringify(paramsObj),
  });
};
export const saveParamsInUrl2 = (query, url, history) => {
  const pathname = url || history.location.pathname;
  history.replace({
    pathname,
    search: stringify(query),
  });
};
export const filterEmptyUrlParams = params => {
  const newParams = params || {};
  for (const i in newParams) {
    if (newParams[i] === undefined || newParams[i] === null || newParams[i] === []) {
      delete newParams[i];
    }
  }
  return newParams;
};
export const getUrlParams = (location) => {
  // const { location = {} } = history;
  return parse(location.search, true).query || {};
};
