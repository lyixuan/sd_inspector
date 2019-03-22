import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import AppealInfo from './../component/appealInfo';
import SOPCheckResult from './../component/sopCheckResult';
import SuperiorCheck from './../component/superiorCheck';
import PersonInfo from './../../qualityNewSheet/detail/components/personInfo';
// import IllegalInfo from './components/illegalInfo';
// import CheckInfo from './components/checkInfo';
import { Form, Icon, Row, Col, TreeSelect, Input, Upload, message } from 'antd';
import BIButton from '@/ant_components/BIButton';

@connect(({ appealDetail }) => ({
  appealDetail,
}))
class AppealDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        id: 1,
      },
      appealInfoCollapse: true,
      checkResultsCollapse: true,
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
  getAppealInfos(detailData) {
    let domFragment = [];
    console.log(444, detailData);
    detailData.forEach(item =>
      domFragment.push(
        <>
          <AppealInfo
            data={{
              appealStart: item.appealStart,
              appealEndDate: item.appealEndDate,
              id: item.id,
              type: item.type,
            }}
          />
          <SOPCheckResult data={item.sopAppealCheck} />
          <SuperiorCheck data={item.masterAppealCheck} />
        </>
      )
    );
    return domFragment;
  }
  handleCollapse() {
    this.setState({ appealInfoCollapse: !this.state.appealInfoCollapse });
  }
  handleCheckResultsCollapse() {
    this.setState({ checkResultsCollapse: !this.state.checkResultsCollapse });
  }
  render() {
    const detailData = this.props.appealDetail.DetailData;
    const qualityDetailData = this.props.appealDetail.QualityDetailData;
    return (
      <div className={styles.detailContainer}>
        <section>
          {/* 质检违规人员信息 */}
          <PersonInfo
            data={qualityDetailData}
            appealInfoCollapse={this.state.appealInfoCollapse}
            onClick={() => this.handleCollapse()}
          />
        </section>
        <section>
          {/* 申诉信息 */}
          {this.getAppealInfos(detailData)}
        </section>
        <section style={{ textAlign: 'right' }}>
          <BIButton>返回</BIButton>
        </section>
      </div>
    );
  }
}

export default AppealDetail;
