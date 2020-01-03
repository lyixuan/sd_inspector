import React from 'react';
import styles from './style.less';
import Echarts from '@/components/Echart';
import { getOption } from './familyOptions.js';
import BIScrollbar from '@/ant_components/BIScrollbar';
import BILoading from '@/components/BILoading';
import { connect } from 'dva';
import zhutu from '@/assets/zhutu@2x.png';

@connect(({ resubmitModal, loading }) => ({
  resubmitModal,
  getFamilyAnalyzeData: resubmitModal.getFamilyAnalyzeData,
  paramsQuery: resubmitModal.paramsQuery || {},
  loading: loading.effects['resubmitModal/getFamilyAnalyze'],
}))
class Family extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bflag: false,
    };
  }
  clickEvent = item => {
    const { getFamilyAnalyzeData } = this.props;
    if (!getFamilyAnalyzeData[item.dataIndex].value) return;
    const orgId = this.props.paramsQuery.orgId;
    let orgIdVal = [
      getFamilyAnalyzeData[item.dataIndex].collegeId,
      getFamilyAnalyzeData[item.dataIndex].familyId,
    ];
    if (orgId && orgId.length && orgId[1] == getFamilyAnalyzeData[item.dataIndex].familyId) {
      orgIdVal = [getFamilyAnalyzeData[item.dataIndex].collegeId];
    }
    this.props.onParamsChange(orgIdVal, 'orgId');
  };

  render() {
    const { getFamilyAnalyzeData, loading } = this.props;
    let options = getOption(getFamilyAnalyzeData);
    let value = 0;
    if (getFamilyAnalyzeData && getFamilyAnalyzeData.length > 0) {
      getFamilyAnalyzeData.map(item => {
        value += item.value;
      });
    }
    return (
      <div className={styles.familyWrap} style={{ width: '761px' }}>
        <p className={styles.title}>
          <span></span>
          家族分析
        </p>
        <BILoading isLoading={loading}>
          <BIScrollbar style={{ minHeight: 240 }}>
            {!this.props.loading && (
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
                    options={options}
                    style={{
                      height: '240px',
                      width: '761px',
                    }}
                    clickEvent={item => this.clickEvent(item)}
                  />
                )}
              </div>
            )}
          </BIScrollbar>
        </BILoading>
      </div>
    );
  }
}

export default Family;
