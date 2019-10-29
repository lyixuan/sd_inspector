import React from 'react';
import { connect } from 'dva';
import styles from '../index.less';

@connect(({ loading }) => ({
  loading: loading.effects['xdFamilyModal/getIncomeKpiPkList'],
}))
class Pannel extends React.Component {
  render() {
    const prop = this.props;
    return (
      <div className={`${styles.performancePanel} ${styles[prop.className]}`}>
        <div className={styles.circle}></div>
        <div className={`${styles.circle} ${styles.circle2}`}></div>
        <div className={styles.details}>
          <div className={styles.top}>
            <span style={{ fontSize: '20px' }}>￥<em className={styles.num}>{prop.income}</em></span>
            <span>{prop.label}：{prop.level}</span>
          </div>
          <div className={styles.bottom}>{prop.name}</div>
        </div>
      </div>
    );
  }
}

export default Pannel;
