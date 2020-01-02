import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './cycleOptions.js';
import { connect } from 'dva';
import bingtu from '@/assets/bingtu@2x.png';

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
    let value = 0;
    if (getCycleListData && getCycleListData.length > 0) {
      getCycleListData.map(item => {
        value += item.value;
      });
    }
    const options = getOption(getCycleListData);
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
          {!value && (
            <img
              src={bingtu}
              style={{
                width: '150px',
                height: '150px',
              }}
            />
          )}
          {value > 0 && (
            <Echarts
              clickEvent={item => this.clickEvent(item)}
              options={options}
              style={{ width: '243px', height: 194 + 'px', marginTop: '24px' }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Cycle;
