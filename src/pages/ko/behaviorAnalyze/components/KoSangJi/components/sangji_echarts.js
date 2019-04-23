import React from 'react';
import Echart from '@/components/Echart_SangJi';
import {getSangJiUpOption} from './sangji_options_up';
import {getSangJiDownOption} from './sangji_options_down';

class SangJiEcharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {},
    };
  }
  componentDidMount() {
    const {position = 'left',upPage,downPage,currentPage} =  this.props;
    this.setState({
      option: position === 'left'?getSangJiUpOption(upPage,currentPage):getSangJiDownOption(downPage,currentPage)
    })
  }
  render() {
    return (
      <Echart {...this.props} options={this.state.option}/>
    );
  }
}

export default SangJiEcharts;
