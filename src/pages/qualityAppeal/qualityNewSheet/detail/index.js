import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import SubOrderDetail from './../../components/subOrderDetail';
import PersonInfo from './components/personInfo';
import IllegalInfo from './components/illegalInfo';
import CheckInfo from './components/checkInfo';
import { Form, Row, Col, Spin } from 'antd';
import BIButton from '@/ant_components/BIButton';
import router from 'umi/router';

@connect(({ qualityDetail, loading }) => ({
  qualityDetail,
  pageLoading: loading.effects['qualityDetail/getQualityDetailData']
}))
class QualityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        id: this.props.location.query.id || 1,
      },
      qualityInfoCollapse: true,
      checkResultsCollapse: true,
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'qualityDetail/getQualityDetailData',
      payload: this.state.params,
    });
  }
  handleCollapse() {
    this.setState({ qualityInfoCollapse: !this.state.qualityInfoCollapse });
  }
  handleCheckResultsCollapse() {
    this.setState({ checkResultsCollapse: !this.state.checkResultsCollapse });
  }
  render() {
    const { qualityDetail = {} } = this.props;
    const qualityDetailData = qualityDetail.QualityDetailData || {};
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
            <article
              className={
                this.state.qualityInfoCollapse ? `${styles.showPanel} ` : `${styles.hidePanel}`
              }
            >
              {qualityDetailData.orderNum?(
                <div>
                  <div className={styles.subOrderNum}>子订单编号：{qualityDetailData.orderNum}</div>
                  <SubOrderDetail data={qualityDetailData.orderDetail} />
                  <div className={styles.divideLine} />
                </div>
              ):null}
              {/* 质检违规详情 */}
              <IllegalInfo data={qualityDetailData} masterQualityValue={masterQualityValue} masterMail={masterMail} />
            </article>
          </section>
          {qualityDetailData.qualityAudit && qualityDetailData.qualityAudit.length>0?(
            <section>
              {/* 质检审核 */}
              <CheckInfo
                firstAppealEndDate={qualityDetailData.firstAppealEndDate}
                data={qualityDetailData.qualityAudit}
                checkResultsCollapse={this.state.checkResultsCollapse}
                onClick={() => this.handleCheckResultsCollapse()}
              />
            </section>
          ):null}
          <section>
            <Form layout="inline" className={styles.formBox}>
              <div className={styles.content}>
                <Row className="gutter-row">
                  <Col span={24}>
                    <div className={styles.gutterBox1}>
                      <span className={styles.gutterBtn2}>
                        <BIButton onClick={() => router.goBack()}>返回</BIButton>
                      </span>
                      {/* <span className={styles.gutterBtn1}>
                      <BIButton type="primary">提交</BIButton>
                    </span> */}
                    </div>
                  </Col>
                </Row>
              </div>
            </Form>
          </section>
        </div>
      </Spin>
    );
  }
}

export default QualityDetail;
