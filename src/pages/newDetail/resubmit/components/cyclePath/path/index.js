import React from 'react';
import styles from './style.less';
import Echarts from '@/components/Echart';
import { getOption } from './pathOptions.js';
import { connect } from 'dva';

@connect(({ resubmitModal }) => ({
  resubmitModal,
  getPathListData: resubmitModal.getPathListData,
}))
class Path extends React.Component {
  clickEvent = item => {
    this.props.onParamsChange(Number(item.dataIndex) + 1, 'path');
  };
  render() {
    const { getPathListData } = this.props;
    let options = getOption(getPathListData);
    return (
      <div className={styles.familyWrap}>
        <p className={styles.title}>
          <span></span>
          转班路径
          <i>(自考)</i>
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Echarts
            clickEvent={item => this.clickEvent(item)}
            options={options}
            style={{ width: '720px', height: '240px' }}
          />
        </div>
      </div>
    );
  }
}

export default Path;
