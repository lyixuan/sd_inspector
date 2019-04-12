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
    const {position = 'left'} =  this.props;
    this.setState({
      option: position === 'left'?getSangJiUpOption():getSangJiDownOption()
    })
  }
  render() {
    return (
      <div>
        <Echart style={{width:'300px',height:'300px'}} options={this.state.option} />
      </div>
    );
  }
}

export default SangJiEcharts;
