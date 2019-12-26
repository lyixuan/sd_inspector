import React from 'react';
import style from './style.less';
import Cycle from './cycle';
import Path from './path';

class CyclePath extends React.Component {
  render() {
    return (
      <div className={style.cyclePathWrap}>
        <Cycle />
        <Path />
      </div>
    );
  }
}

export default CyclePath;
