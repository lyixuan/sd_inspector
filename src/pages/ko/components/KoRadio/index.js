import React from 'react';
import { Radio } from 'antd';
import './style.less';

class KoRadio extends React.Component {

  render() {
    return (
      <span className='KoRadio'>
        <Radio.Group {...this.props}>
          {this.props.children}
        </Radio.Group>
      </span>
    );
  }
}

export { KoRadio as default };
KoRadio.Radio = Radio;
