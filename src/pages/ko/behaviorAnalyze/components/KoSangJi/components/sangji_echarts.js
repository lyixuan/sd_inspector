import React from 'react';
import Echart from '@/components/Echart_SangJi';
import { getSangJiUpOption } from './sangji_options_up';
import { getSangJiDownOption } from './sangji_options_down';

class SangJiEcharts extends React.Component {

  render() {
    const { position = 'left', upPage, downPage, currentPage } = this.props;
    const option = position === 'left' ? getSangJiUpOption(upPage, currentPage) : getSangJiDownOption(downPage, currentPage);

    console.log('oop',option)
    return (
      <Echart {...this.props} options={option}/>
    );
  }
}

export default SangJiEcharts;
