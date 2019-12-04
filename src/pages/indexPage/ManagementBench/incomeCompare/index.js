import React from 'react';
import Income from './block/compare';
import Top from './block/top';

class IncomeCompare extends React.Component {
  render() {
    const { date, userInfo } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Income date={date} />
        <Top date={date} userInfo={userInfo} />
      </div>
    );
  }
}

export default IncomeCompare;
