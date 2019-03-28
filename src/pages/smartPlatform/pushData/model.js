import { message } from 'antd/lib/index';
import { queryHistogramData } from './services';
import { examOrg } from './services';

function sortdata(datalist, name) {
  let deepGroDataList = datalist.concat();
  return deepGroDataList.sort((a, b) => b[name] - a[name]);
}
function dealData(data, dataItem) {

  const dataObj = { dateArr: [] };
  dataItem.map((item, i) => dataObj[`dataArr${[i + 1]}`] = []);
  data.forEach(item => {
    dataObj.dateArr.push(`${item.date.split("-")[1]}/${item.date.split("-")[2]}`);
    dataItem.forEach((item1, index1) => {
      let val = item[dataItem[index1]];
      if ('admissionFillRatio' === dataItem[index1] || 'reachRatio' === dataItem[index1]) {
        val = (val * 100).toFixed(2);
      }
      dataObj[`dataArr${[index1 + 1]}`].push(val);
    })
  });
  return dataObj;
}

export default {
  namespace: 'PushDataModel',

  state: {
    dataList: []
  },

  effects: {

  },

  reducers: {

  },

  subscriptions: {
  },
};
