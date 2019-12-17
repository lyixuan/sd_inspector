import BIContrastCell from '@/components/BIContrastCell';
import { thousandsFormat } from '@/utils/utils';
import { Link } from 'dva/router';
import styles from './style.less';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const { BI = {} } = window;
// local存值
export function setLocalValue(obj, item) {
  const local = JSON.parse(localStorage.getItem(item)) || {};
  const data = {...local, ...obj}
  localStorage.setItem(item, JSON.stringify(data));
}
const colorsArr = ['rgba(255, 120, 120, 1)', 'rgba(255, 120, 120, 0.8)', 'rgba(255, 120, 120, 0.6)', 'rgba(255, 120, 120, 0.4)', 'rgba(255, 120, 120, 0.2)', 'rgba(255, 120, 120, 0.1)'];
const getContentLink = function (linkdata, text, record, index) {
  if (index === 0 && text && record.level === 4) {
    const { startTime, endTime, datatrace } = linkdata;
    return { 
      onClick: function () {
        BI.traceV &&  BI.traceV({ "widgetName": record.dimensionName, "traceName": datatrace + record.dimensionName})
      },
      className: styles.mineHover,
      textContent: <Link target='_black' to={`/xdCredit/index?params=${JSON.stringify({ startTime, endTime, "dementionId": record.id })}`} >
      {text} <span style={{ marginLeft: '2px' }}>{'>'}</span>
    </Link>,
    }        
  } else {
    return {
      textContent: index === 0 ? <span style={{marginRight: '16px'}}>{text}</span> : ''
    }
  }
}
export function fillDataSource(linkdata={}, params = [], intList = [], n = 1, flagMark) {
  params.map(item => {
    item.level = n;
    item.flagMark = item.dimensionName === '学分均分' ? 3 : (item.dimensionName === '负面均分' ? 2 : flagMark); // 1 正面均分  2 负面均分 3学分均分 其它
    if (item.values) {// 处理颜色对比
      if (item.flagMark === 3) {
        item.valuesParams = item.values.map((text, index) => {
          if (text > 0) {
            return <BIContrastCell 
            text={text} 
            nums={item.values}
            {...getContentLink(linkdata, text, item, index)}
            />
          } else {
            return <BIContrastCell 
            text={text} 
            nums={item.values} 
            colors={colorsArr} 
            isReversed={true}
            {...getContentLink(linkdata, text, item, index)}
            />
          } 
        });
      } else if (item.flagMark === 1 || item.dimensionName === '退挽' || item.dimensionName === '随堂考') {
        item.valuesParams =item.values.map((text, index) => <BIContrastCell 
        text={text} 
        nums={item.values}
        {...getContentLink(linkdata, text, item, index)}
        />) 
      } else if (item.flagMark === 2) {
        item.valuesParams =item.values.map((text, index) => <BIContrastCell 
        text={text} 
        nums={item.values}
        colors={colorsArr}
        isReversed={true}
        {...getContentLink(linkdata, text, item, index)}
        />) 
      }
    }
    const { children, ...others } = item;
    intList.push(others);
    if (item.children && item.children.length > 0) {
      const mark = item.dimensionName === '学分均分' ? 1 : (item.dimensionName === '负面均分' ? 2 : flagMark);
      fillDataSource(linkdata, item.children, intList, n + 1, mark);
    }
  })
  return intList
}
export function getSubtract(bul, n, s = 160) {
  if(!bul) return n - s;
  return n;
}
// 取整千分位
export function thousandsFormatAll(n)  {
  return thousandsFormat(parseInt(n));
}


export function disabledDate(current, date) {
  if (date) {
    return (
      current > moment(date.endDate) ||
      current < moment(date.startDate)
    );
  } else {
    return (
      current > moment() ||
      current < moment()
    );
  }
  
};
export function getDateObj(date = []) {
  if (date instanceof Array && date.length === 2) {
    return {
      startTime: moment(date[0]).format(dateFormat),
      endTime: moment(date[1]).format(dateFormat)
    }
  }
  return {}
}