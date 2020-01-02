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
  constructor(props) {
    super(props);
    this.state = {
      bflag:
        JSON.parse(localStorage.getItem('resubmit_query')) &&
        JSON.parse(localStorage.getItem('resubmit_query')).path &&
        JSON.parse(localStorage.getItem('resubmit_query')).path.length > 0
          ? true
          : false,
    };
  }
  clickEvent = item => {
    const { getPathListData } = this.props;
    let { bflag } = this.state;
    if (!getPathListData[item.dataIndex].value) return;
    bflag = !bflag;

    if (bflag) {
      this.props.onParamsChange(Number(item.dataIndex) + 1, 'path');
    } else {
      this.props.onParamsChange(undefined, 'path');
    }
    this.setState({ bflag });
  };
  render() {
    const { getPathListData } = this.props;
    let options = getOption(getPathListData);
    return (
      <div className={styles.familyWrap}>
        <p className={styles.title}>
          <span></span>
          续报路径
          {/* <i>(自考)</i> */}
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
