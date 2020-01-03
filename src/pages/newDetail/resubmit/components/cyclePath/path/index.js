import React from 'react';
import styles from './style.less';
import Echarts from '@/components/Echart';
import { getOption } from './pathOptions.js';
import { connect } from 'dva';
import zhutu from '@/assets/zhutu@2x.png';

@connect(({ resubmitModal }) => ({
  resubmitModal,
  getPathListData: resubmitModal.getPathListData,
  paramsQuery: resubmitModal.paramsQuery || {},
}))
class Path extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bflag: false,
    };
  }
  clickEvent = item => {
    const { getPathListData } = this.props;
    const pathVal = this.props.paramsQuery.path;
    let val = Number(item.dataIndex) + 1;
    if (pathVal && pathVal == val) {
      val = undefined;
    }
    this.props.onParamsChange(val, 'path');
  };
  render() {
    const { getPathListData } = this.props;
    let value = 0;
    if (getPathListData && getPathListData.length > 0) {
      getPathListData.map(item => {
        value += item.value;
      });
    }
    let options = getOption(getPathListData);
    return (
      <div className={styles.familyWrap}>
        <p className={styles.title}>
          <span></span>
          续报路径
          {/* <i>(自考)</i> */}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '240px',
          }}
        >
          {!value && (
            <img
              src={zhutu}
              style={{
                width: '193px',
                height: '145px',
              }}
            />
          )}
          {value > 0 && (
            <Echarts
              clickEvent={item => this.clickEvent(item)}
              options={options}
              style={{ width: '720px', height: '240px' }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Path;
