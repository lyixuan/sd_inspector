import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './npsOptions.js';
import { connect } from 'dva';
import zhutu from '@/assets/zhutu@2x.png';

@connect(({ npsAnalyzeModel }) => ({
  npsAnalyzeModel,
  paramsQuery: npsAnalyzeModel.paramsQuery || {},
  getCycleListData: npsAnalyzeModel.getCycleListData,
}))
class NPS extends React.Component {
  clickEvent = item => {
    const { getCycleListData } = this.props;
    if (!getCycleListData[item.dataIndex].value) return;
    const cycle = this.props.paramsQuery.lifeCycle;
    let val = item.name.replace('天', '');
    if (cycle && cycle.length && cycle == item.name.replace('天', '')) {
      val = undefined;
    }
    this.props.onParamsChange(val, 'lifeCycle');
  };

  render() {
    const colorArr = [
      '#6665DD',
      '#FF602F',
      '#33D195',
      '#B5E1F9',
      '#FFC442',
      '#4A5F75',
      '#0496FF',
      '#AEB89F',
    ];
    const WorkbenchImPieData = [
      { name: '图层自变量' },
      { name: 'π' },
      { name: '芒格' },
      { name: '狐逻&泰罗' },
      { name: '睿博' },
      { name: '芝士' },
    ];
    const dot = WorkbenchImPieData.map((item, idx) => {
      return (
        <span key={idx} className={styles.colorArr}>
          <i
            style={{
              backgroundColor: `${colorArr[idx]}`,
              width: '8px',
              height: '8px',
              display: 'inline-block',
              borderRadius: '50%',
              marginRight: '3px',
            }}
          />
          {item.name}
        </span>
      );
    });

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
          净推荐值趋势
          <i>（5星占比-1-3星占比）</i>
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '240px',
          }}
        >
          {/* {!value && (
            <img
              src={zhutu}
              style={{
                width: '150px',
                height: '150px',
              }}
            />
          )} */}
          {/* {value > 0 && ( */}
          <Echarts
            clickEvent={item => this.clickEvent(item)}
            options={options}
            style={{ width: '761px', height: '210px' }}
          />
          {/* )} */}
        </div>
        <div className={styles.dot}>{dot}</div>
      </div>
    );
  }
}

export default NPS;
