import React from 'react';
// import styles from './styles.less';
import { connect } from 'dva';
import Top from './block/top';
import Surge from './block/surge';

@connect(({ newDetailModal }) => ({
  globalUserInfo: newDetailModal.globalUserInfo,
  globalDateRange: newDetailModal.globalDateRange,
}))
class IncomeCompare extends React.Component {
  render() {
    const { globalUserInfo, globalDateRange } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
        {globalDateRange && globalDateRange.startTime && (
          <Top date={globalDateRange} userInfo={globalUserInfo} />
        )}
        {globalDateRange && globalDateRange.startTime && (
          <Surge date={globalDateRange} userInfo={globalUserInfo} />
        )}
      </div>
    );
  }
}

export default IncomeCompare;
