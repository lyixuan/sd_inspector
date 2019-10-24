import React from 'react';
// import styles from './styles.less';

import Income from './block/compare';
import Top from './block/top';

class IncomeCompare extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <Income />
        <Top />
      </div>
    );
  }
}

export default IncomeCompare;
