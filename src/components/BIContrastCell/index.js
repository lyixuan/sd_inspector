import React from 'react';
import BIFillCell from '../BIFillCell';

const colorsArr = ['rgba(75, 193, 255, 1)', 'rgba(75, 193, 255, 0.8)', 'rgba(75, 193, 255, 0.6)', 'rgba(75, 193, 255, 0.5)', 'rgba(75, 193, 255, 0.4)', 'rgba(75, 193, 255, 0.3)'];
// 排序
function orderFn(nums = [], isReversed) {
  nums.sort(function (a, b) {
    return b - a;
  });
  if (isReversed) {
    return nums.reverse();
  }
  return nums;
}
function getColor(colors = colorsArr, order = 0) {
  if (Object.prototype.toString.call(colors) === '[object Array]') {
    return colors[order];
  } else if (Object.prototype.toString.call(colors) === '[object String]') {
    return colors;
  }
}
// all
function colorContrast({nums = [], isReversed, colors, children, ...props}) {
  const orderNums = orderFn([...nums], isReversed);
  return nums.map(item => <BIFillCell bgColor={getColor(colors, orderNums.indexOf(item))} {...props}>{item}{children}</BIFillCell>)
}
class BIContrastCell extends React.Component {
  colorContrastSingle = ({nums = [], text = 0, isReversed, colors, children, ...props}) => {
    const orderNums = orderFn([...nums], isReversed);
    return <BIFillCell bgColor={getColor(colors, orderNums.indexOf(text))} {...props}>{text}{children}</BIFillCell>
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
