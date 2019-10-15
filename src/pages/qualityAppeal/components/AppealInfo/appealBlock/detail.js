import React from 'react';
import styles from './detail.less';
import { connect } from 'dva';
import AppealInfo from '../../../qualityAppeal/component/appealInfo';
import SOPCheckResult from '../../../qualityAppeal/component/sopCheckResult';
import SuperiorCheck from '../../../qualityAppeal/component/superiorCheck';

@connect(({ appealDetail, loading }) => ({
  appealDetail,
  pageLoading:
    loading.effects['appealDetail/getDetailData'] ||
    loading.effects['appealDetail/getQualityDetailData'],
}))
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        id: this.props.location.query.id || 1,
      },
      qualityInfoCollapse: true,
      appealInfoCollapse: [],
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'appealDetail/getDetailData',
      payload: this.state.params,
    });
    this.props.dispatch({
      type: 'appealDetail/getQualityDetailData',
      payload: this.state.params,
    });
  }
  handleAppealInfoCollapse(index) {
    this.state.appealInfoCollapse[index] = !this.state.appealInfoCollapse[index];
    this.setState({ appealInfoCollapse: this.state.appealInfoCollapse });
  }
  getAppealInfos(detailData) {
    let domFragment = [];
    if (detailData.length > 0) {
      detailData.forEach((item, index) => {
        domFragment.push(
          <div key={index}>
            <AppealInfo
              data={{
                appealStart: item.appealStart,
                appealEndDate: item.appealEndDate,
                id: item.id,
                type: item.type,
                index: index,
                isCollapse: this.state.appealInfoCollapse[index],
              }}
              onClick={index => this.handleAppealInfoCollapse(index)}
            />

            {item.sopAppealCheck && item.sopAppealCheck.length > 0 ? (
              <SOPCheckResult
                data={{
                  sopAppealCheck: item.sopAppealCheck,
                  isCollapse: this.state.appealInfoCollapse[index],
                }}
              />
            ) : null}

            {item.masterAppealCheck ? (
              <SuperiorCheck
                data={{
                  masterAppealCheck: item.masterAppealCheck,
                  isCollapse: this.state.appealInfoCollapse[index],
                }}
              />
            ) : null}
          </div>
        );
        this.state.appealInfoCollapse.push(false);
      });
    }
    return domFragment;
  }
  handleCollapse() {
    this.setState({ qualityInfoCollapse: !this.state.qualityInfoCollapse });
  }
  render() {
    const { appealDetail = {} } = this.props;
    const detailData = appealDetail.DetailData || {};
    return (
      <section className={styles.appealInfoCon}>
        {/* 申诉信息 */}
        {this.getAppealInfos(detailData)}
      </section>
    );
  }
}

export default Detail;
