import React from 'react';
// import styles from './styles.less';

import Income from './block/compare';
import Top from './block/top';

class IncomeCompare extends React.Component {
  render() {
    const { date } = this.props.date;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Income />
        <Top date={date} />
      </div>
    );
  }
}

export default IncomeCompare;
