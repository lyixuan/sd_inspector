import React from 'react';
import { connect } from 'dva';
import styles from '../index.less';

@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getIncomeKpiPkList'],
}))
class Pannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }
  }

  render() {
    const prop = this.props;
    return (
      <div className={`${styles.performancePanel} ${styles[prop.className]}`}>
        <div className={styles.circle}></div>
        <div className={`${styles.circle} ${styles.circle2}`}></div>
        <div className={styles.details}>
          <div className={styles.top}>
            <span style={{ fontSize: '20px' }}>￥<em className={styles.num}>47,000</em></span>
            <span>{prop.label}：2</span>
          </div>
          <div className={styles.bottom}>{prop.name}</div>
        </div>
      </div>
    );
  }
}

export default Pannel;
