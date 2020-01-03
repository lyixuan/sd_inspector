import React from 'react';
import style from './style.less';
import Cycle from './cycle';
import Path from './path';

class CyclePath extends React.Component {
  onParamsChange = (val, type) => {
    this.props.onParamsChange(val, type);
  };
  render() {
    return (
      <div className={style.cyclePathWrap}>
        <Cycle onParamsChange={this.onParamsChange} />
        <Path onParamsChange={this.onParamsChange} />
      </div>
    );
  }
}

export default CyclePath;
