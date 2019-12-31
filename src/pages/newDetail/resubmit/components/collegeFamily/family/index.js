import React from 'react';
import styles from './style.less';
import Echarts from '@/components/Echart';
import { getOption } from './familyOptions.js';
import BIScrollbar from '@/ant_components/BIScrollbar';
import BILoading from '@/components/BILoading';
import { connect } from 'dva';

@connect(({ resubmitModal, loading }) => ({
  resubmitModal,
  getFamilyAnalyzeData: resubmitModal.getFamilyAnalyzeData,
  loading: loading.effects['resubmitModal/getFamilyAnalyze'],
}))
class Family extends React.Component {
  clickEvent = item => {
    const { getFamilyAnalyzeData } = this.props;
    this.props.onParamsChange(
      [
        getFamilyAnalyzeData[item.dataIndex].collegeId,
        getFamilyAnalyzeData[item.dataIndex].familyId,
      ],
      'orgId'
    );
  };

  render() {
    const { getFamilyAnalyzeData, loading } = this.props;
    let options = getOption(getFamilyAnalyzeData);
    return (
      <div className={styles.familyWrap} style={{ width: '761px' }}>
        <p className={styles.title}>
          <span></span>
          家族分析
        </p>
        <BILoading isLoading={loading}>
          <BIScrollbar style={{ minHeight: 240 }}>
            {!this.props.loading && (
              <Echarts
                options={options}
                style={{
                  height: '240px',
                  width:
                    getFamilyAnalyzeData.length * 35 > 761
                      ? getFamilyAnalyzeData.length * 35 + 'px'
                      : '761px',
                }}
                clickEvent={item => this.clickEvent(item)}
              />
            )}
          </BIScrollbar>
        </BILoading>
      </div>
    );
  }
}

export default Family;