import React from 'react';
import BIFillCell from '../BIFillCell';

/*
* BIContrastCell 抽屉组件
*
* 自定义组件样式
* params *
* text-当前值
* nums-排序值（一组数值）
* colors-自定义背景色（一组背景色值或一个值
* isReversed-是否反向排序比较（布尔值，默认false）
* closeValue-收起提示  openValue-打开提示 drawerStyle-抽屉容器样式
* 其它默认属性值
*
* 用法
* 单一：<BIContrastCell nums={[1, 3, 5, 9, 30, 1, 2]} text={10} />
* 或
* 全部：BIContrastCell.colorContrast({ nums: item.values }).map(item => <BIFillCell {...item} />)
* */


// 默认背景色
const colorsArr = ['rgba(75, 193, 255, 1)', 'rgba(75, 193, 255, 0.8)', 'rgba(75, 193, 255, 0.6)', 'rgba(75, 193, 255, 0.4)', 'rgba(75, 193, 255, 0.2)', 'rgba(75, 193, 255, 0.1)'];
// 排序
function orderFn(nums = [], isReversed) {
  nums.map(item => {
    if (item === 'N/A') {
      return 0;
    } else if (typeof item === 'string') {
      return Number(item);
    } 
    return item;
  })
  nums.sort(function (a, b) {
    return b - a;
  });
  if (isReversed) {
    return nums.reverse();
  }
  return nums;
}
// 获取背景色
function getColor(colors = colorsArr, order = 0) {
  if (order < 0) {
    return '';
  }
  if (Object.prototype.toString.call(colors) === '[object Array]') {
    return colors[order];
  } else if (Object.prototype.toString.call(colors) === '[object String]') {
    return colors;
  } else {
    return ''
  }
}
// All
function colorContrast({nums = [], isReversed, colors = colorsArr, ...props}) {
  const orderNums = orderFn([...nums], isReversed);
  return nums.map(item => {
    return {bgcolor: getColor(colors, item ? orderNums.indexOf(item) : -1), children: item, ...props}
  })
}

class BIContrastCell extends React.Component {
  colorContrastSingle = ({nums = [], text = 0, isReversed, colors = colorsArr, others, ...props}) => {
    const orderNums = orderFn([...nums], isReversed);
    return <BIFillCell bgcolor={text ? getColor(colors, orderNums.indexOf(text)) : ''} {...props}>{text}{others}</BIFillCell>
  }
  render() {
    const content = this.colorContrastSingle(this.props);
    return (
      <>{content}{this.props.children}</>
    );
  }
}
export default BIContrastCell;
BIContrastCell.colorContrast = colorContrast;
