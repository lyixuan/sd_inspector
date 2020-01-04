import React from 'react';
import styles from './style.less';
import { connect } from 'dva';

// @connect(({ resubmitModal }) => ({
//   resubmitModal,
//   paramsQuery: resubmitModal.paramsQuery || {},
//   getCycleListData: resubmitModal.getCycleListData,
// }))
class Reson extends React.Component {
  render() {
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          续报学员生命周期分布
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '240px',
          }}
        >
          11
        </div>
      </div>
    );
  }
}

export default Reson;
