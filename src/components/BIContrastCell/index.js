import React from 'react';
import BIColorCell from '../BIColorCell';
import BICell from '../BICell'

function orderFn(nums = [], isReversed) {
  const arr = nums.sort(function(a,b){
    return b-a;
  });
  if (isReversed) {
    return arr.reverse();
  } 
  return arr;
}
function getColor(colors, order = 0) {
  if (Object.prototype.toString.call(colors)==='[object Array]') {
    return colors[order];
  } else if (Object.prototype.toString.call(colors)==='[object String]'){
    return colors;
  }
}
function colorContrastSingle({nums = [], text = 0, isReversed, colors, ...props}) {
  const orderNums = orderFn(nums, isReversed);
  return <>{text === 0 ? <BICell>{text}</BICell> : <BIColorCell order={orderNums.indexOf(text)} bgColor={getColor(colors)} {...props}>{text}</BIColorCell>}</>
}
function colorContrast({nums = [], isReversed, colors, ...props}) {
  const orderNums = orderFn(nums, isReversed);
  return nums.map(item => <>{item === 0 ? <BICell>{item}</BICell> : <BIColorCell order={orderNums.indexOf(item)} bgColor={getColor(colors, orderNums.indexOf(item))} {...props}>{item}</BIColorCell>}</>)
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
