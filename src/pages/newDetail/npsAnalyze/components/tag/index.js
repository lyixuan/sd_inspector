import React from 'react';
import { connect } from 'dva';
import Echart from '@/components/Echart';
import { getOption } from './tagOptions.js';
import styles from './style.less';
import { Spin } from 'antd';

@connect(({ npsAnalyzeModel }) => ({
  npsAnalyzeModel,
  paramsQuery: npsAnalyzeModel.paramsQuery || {},
  npsData: npsAnalyzeModel.npsData,
}))
class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActive: 0,
    };
  }

  clickTab = tabActive => {
    this.setState({
      tabActive,
    });
  };

  clickEvent = item => {
    const {
      npsData: { starList },
    } = this.props;
    if (!starList[item.dataIndex].value) return;
    const starVal = this.props.paramsQuery.star;
    let val = Number(item.dataIndex) + 1;
    if (starVal && starVal == val) {
      val = undefined;
    }
    this.props.onParamsChange(val, 'tagId');
  };

  render() {
    const { tabActive } = this.state;
    const { npsData, loadingTime } = this.props;
    let tabMenu = [];
    let tabCon = [[], []];
    if (npsData.tagImageDtoList) {
      tabMenu = ['班主任', '授课'];
      tabCon = [npsData.tagImageDtoList, npsData.tagImageDtoList2];
    }
    const options = getOption(tabCon[tabActive]);
    return (
      <div className={styles.TagWrap}>
        <p className={styles.title}>
          <span></span>
          NPS标签
        </p>
        {/* <Spin spinning={loadingTime}> */}
        <div
          className={styles.tabWrap}
          style={{
            width: '345px',
            height: '213px',
            margin: '0 auto',
            background: 'rgba(255,255,255,1)',
            boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.14)',
            borderRadius: '20px',
          }}
        >
          <div className={styles.tab}>
            <span
              className={tabActive === 0 ? styles[`current${tabActive}`] : styles.normal}
              onClick={() => this.clickTab(0)}
            >
              班主任
            </span>
            <span
              className={tabActive === 1 ? styles[`current${tabActive}`] : styles.normal1}
              onClick={() => this.clickTab(1)}
            >
              授课
            </span>
          </div>
          {tabCon[tabActive].length > 0 && (
            <Echart
              options={options}
              style={{ width: '310px', height: '189px' }}
              clickEvent={item => this.clickEvent(item)}
            />
          )}
          {tabCon[tabActive].length === 0 && <div className={styles.none}>暂无数据</div>}
        </div>
        {/* </Spin> */}
      </div>
    );
  }
}

export default Tag;
