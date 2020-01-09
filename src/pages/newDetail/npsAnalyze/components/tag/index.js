import React from 'react';
import { connect } from 'dva';
import Echart from '@/components/Echart';
import { getOption } from './tagOptions.js';
import styles from './style.less';
import { Spin } from 'antd';

@connect(({ npsAnalyzeModel, loading }) => ({
  npsAnalyzeModel,
  paramsQuery: npsAnalyzeModel.paramsQuery || {},
  npsData: npsAnalyzeModel.npsData,
  loadingTime: loading.effects['npsAnalyzeModel/getNpsData'],
}))
class Tag extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   tabActive: this.props.paramsQuery.tagId && this.props.paramsQuery.tagId[0] == 30 ? 0 : 1,
    // };
  }

  clickTab = tabActive => {
    // const flag =
    //   this.props.paramsQuery.tagId && this.props.paramsQuery.tagId.toString() == val.toString();
    this.props.onParamsChange(tabActive === 0 ? [30] : [31], 'tagId');
  };

  clickEvent = item => {
    const {
      npsData: { starList },
    } = this.props;
    if (!item.data.value) return;

    let val = [];
    if (this.props.paramsQuery.tagId && this.props.paramsQuery.tagId[0] == 31) {
      //31
      val = [31, item.data.id];
    } else {
      val = [30, item.data.id];
    }
    const flag =
      this.props.paramsQuery.tagId && this.props.paramsQuery.tagId.toString() == val.toString();
    this.props.onParamsChange(flag ? [] : val, 'tagId');
  };

  render() {
    const tabActive = this.props.paramsQuery.tagId && this.props.paramsQuery.tagId[0] == 31 ? 1 : 0;
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
        <Spin spinning={loadingTime}>
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
        </Spin>
      </div>
    );
  }
}

export default Tag;
