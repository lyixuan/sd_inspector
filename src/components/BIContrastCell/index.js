import React from 'react';
import BICell from '../BICell';

const colorsArr = ['rgba(75, 193, 255, 1)', 'rgba(75, 193, 255, 0.8)', 'rgba(75, 193, 255, 0.6)', 'rgba(75, 193, 255, 0.5)', 'rgba(75, 193, 255, 0.4)', 'rgba(75, 193, 255, 0.3)'];
// 排序
function orderFn(nums = [], isReversed) {
  nums.sort(function(a,b){
    return b-a;
  });
  if (isReversed) {
    return nums.reverse();
  } 
  return nums;
}
function getColor(colors = colorsArr, order = 0) {
  if (Object.prototype.toString.call(colors)==='[object Array]') {
    return colors[order];
  } else if (Object.prototype.toString.call(colors)==='[object String]'){
    return colors;
  }
}
// 单个
function colorContrastSingle({nums = [], text = 0, isReversed, colors, ...props}) {
  const orderNums = orderFn(nums, isReversed);
  return <BICell  bgColor={getColor(colors, orderNums.indexOf(text))} {...props}>{text}</BICell>
}
// all
function colorContrast({nums = [], isReversed, colors, ...props}) {
  const orderNums = orderFn([...nums], isReversed);
  return nums.map(item => <BICell bgColor={getColor(colors, orderNums.indexOf(item))} {...props}>{item}</BICell>)
}
class BIContrastCell extends React.Component {
  render() {
    const content = colorContrastSingle(this.props);
    return (
      <>{content}</>
    );
  }
}

export default BIContrastCell;
BIContrastCell.colorContrast = colorContrast;
BIContrastCell.colorContrastSingle = colorContrastSingle;
