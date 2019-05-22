import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import {Spin } from 'antd';
import AppealInfo from './../component/appealInfo';
import SOPCheckResult from './../component/sopCheckResult';
import SubOrderDetail from './../../components/subOrderDetail';
import SuperiorCheck from './../component/superiorCheck';
import PersonInfo from './../../qualityNewSheet/detail/components/personInfo';
import router from 'umi/router';
import IllegalInfo from '../../qualityNewSheet/detail/components/illegalInfo';
import BIButton from '@/ant_components/BIButton';

@connect(({ appealDetail,loading }) => ({
  appealDetail,
  pageLoading: loading.effects['appealDetail/getDetailData']||loading.effects['appealDetail/getQualityDetailData']
}))
class AppealDetail extends React.Component {
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
    if(detailData.length>0){
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

            {item.sopAppealCheck&&item.sopAppealCheck.length>0 ? (
              <SOPCheckResult
                data={{
                  sopAppealCheck: item.sopAppealCheck,
                  isCollapse: this.state.appealInfoCollapse[index],
                }}
              />
            ):null}

            {item.masterAppealCheck ? (
              <SuperiorCheck
                data={{
                  masterAppealCheck: item.masterAppealCheck,
                  isCollapse: this.state.appealInfoCollapse[index],
                }}
              />
            ): null }
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
    const{appealDetail={}} = this.props;
    const detailData = appealDetail.DetailData;
    const qualityDetailData = appealDetail.QualityDetailData;
    const { masterQualityValue = '', masterMail = '' } = qualityDetailData;
    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.detailContainer}>
          <section>
            {/* 质检违规人员信息 */}
            <PersonInfo
              data={qualityDetailData}
              qualityInfoCollapse={this.state.qualityInfoCollapse}
              onClick={() => this.handleCollapse()}
            />

              {qualityDetailData.orderNum?(
                <div
                  className={
                    this.state.qualityInfoCollapse ? `${styles.showPanel} ` : `${styles.hidePanel}`
                  }
                >
                  <div className={styles.divideLine} />
                  <div className={styles.subOrderNum}>子订单编号：{qualityDetailData.orderNum}</div>
                  <SubOrderDetail data={qualityDetailData.orderDetail} />
                </div>
              ):null}
            <div className={styles.divideLine} />
            {/* 质检违规详情 */}
            <IllegalInfo data={qualityDetailData} masterQualityValue={masterQualityValue} masterMail={masterMail} />
          </section>
          <section className={styles.appealInfoCon}>
            {/* 申诉信息 */}
            {this.getAppealInfos(detailData)}
          </section>
          <section style={{ textAlign: 'right', marginTop: '20px' }}>
            <BIButton onClick={() => router.goBack()}>返回</BIButton>
          </section>
        </div>
      </Spin>
    );
  }
}

export default AppealDetail;
