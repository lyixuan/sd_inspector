import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './cycleOptions.js';
import { connect } from 'dva';

@connect(({ resubmitModal }) => ({
  resubmitModal,
  getCycleListData: resubmitModal.getCycleListData,
}))
class Cycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bflag:
        JSON.parse(localStorage.getItem('resubmit_query')) &&
        JSON.parse(localStorage.getItem('resubmit_query')).lifeCycle &&
        JSON.parse(localStorage.getItem('resubmit_query')).lifeCycle.length > 0
          ? true
          : false,
    };
  }
  clickEvent = item => {
    let { bflag } = this.state;
    bflag = !bflag;

    if (bflag) {
      this.props.onParamsChange(item.name.replace('天', ''), 'lifeCycle');
    } else {
      this.props.onParamsChange(undefined, 'lifeCycle');
    }
    this.setState({ bflag });
  };

  render() {
    const { getCycleListData } = this.props;
    const options = getOption(getCycleListData);
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          续报学员生命周期分布
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Echarts
            clickEvent={item => this.clickEvent(item)}
            options={options}
            style={{ width: '243px', height: 194 + 'px', marginTop: '24px' }}
          />
        </div>
      </div>
    );
  }
}

export default Cycle;
