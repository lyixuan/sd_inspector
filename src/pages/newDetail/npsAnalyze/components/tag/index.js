import React from 'react';
import { connect } from 'dva';
import Echart from '@/components/Echart';
import { getOption } from './tagOptions.js';
import styles from './style.less';
import { Spin } from 'antd';

@connect(({ npsAnalyzeModel, loading }) => ({
  npsAnalyzeModel,
  paramsQuery: npsAnalyzeModel.paramsQuery || {},
  getTagListData: npsAnalyzeModel.getTagListData,
  loadingTime: loading.effects['npsAnalyzeModel/getTagList'],
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

  render() {
    const { tabActive } = this.state;
    const { getTagListData, loadingTime } = this.props;
    const tabMenu = [];
    const tabCon = [];
    // let options;s
    if (getTagListData.length) {
      tabMenu.push(getTagListData[tabActive].name.replace('服务', ''));
      tabCon.push(getTagListData[tabActive].nodeList);
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
              className={tabActive === 0 ? styles.current : styles.normal}
              onClick={() => this.clickTab(0)}
            >
              班主任
            </span>
            <span
              className={tabActive === 1 ? styles.current : styles.normal}
              onClick={() => this.clickTab(1)}
            >
              授课
            </span>
          </div>
          {tabCon.length > 0 && (
            <Echart options={options} style={{ width: '310px', height: '189px' }} />
          )}
        </div>
        {/* </Spin> */}
      </div>
    );
  }
}

export default Tag;
