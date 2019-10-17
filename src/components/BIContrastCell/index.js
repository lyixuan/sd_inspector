import React from 'react';
import BIColorCell from '../BIColorCell';

function orderFn(nums = [], signs) {
  const arr = nums.sort(function(a,b){
    return b-a;
  });
  if (signs === 'minus') {
    return arr.reverse();
  } 
  return arr;
}
function colorContrastSingle(nums = [], text, signs='plus', colors) {
  const orderNums = orderFn(nums, signs);
  return <BIColorCell order={orderNums.indexOf(text)} colors={colors}>{text}</BIColorCell>
}
function colorContrast(nums = [], signs='plus', colors) {
  const orderNums = orderFn(nums, signs);
  return nums.map(item => <BIColorCell order={orderNums.indexOf(item)} colors={colors}>{item}</BIColorCell>)
}
class BIContrastCell extends React.Component {
  render() {
    const content = colorContrast(this.props.nums, this.props.signs, this.props.colors);
    return (
      <>{content}</>
    );
  }
}

export default BIContrastCell;
BIContrastCell.colorContrast = colorContrast;
BIContrastCell.colorContrastSingle = colorContrastSingle;
