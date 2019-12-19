import React from 'react';
// import styles from './styles.less';
import { connect } from 'dva';
import Top from './block/top';
import Surge from './block/surge';

@connect(({ newDetailModal }) => ({
  globalUserInfo: newDetailModal.globalUserInfo,
  globalDate: newDetailModal.globalDate,
}))
class IncomeCompare extends React.Component {
  render() {
    const { globalUserInfo, globalDate } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
        {globalDate && globalDate.startDate && (
          <Top date={globalDate} userInfo={globalUserInfo} />
        )}
        {globalDate && globalDate.startDate && (
          <Surge date={globalDate} userInfo={globalUserInfo} />
        )}
      </div>
    );
  }
}

export default IncomeCompare;
