import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import SubOrderDetail from './../../components/subOrderDetail';
import PersonInfo from './components/personInfo';
import IllegalInfo from './components/illegalInfo';
import CheckInfo from './components/checkInfo';
import { Form, Icon, Row, Col, TreeSelect, Input, Upload, message } from 'antd';
import BIButton from '@/ant_components/BIButton';

@connect(({ qualityDetail }) => ({
  qualityDetail,
}))
class QualityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        id: this.props.location.query.id,
      },
      appealInfoCollapse: true,
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
    this.setState({ appealInfoCollapse: !this.state.appealInfoCollapse });
  }
  handleCheckResultsCollapse() {
    this.setState({ checkResultsCollapse: !this.state.checkResultsCollapse });
  }
  render() {
    const qualityDetailData = this.props.qualityDetail.QualityDetailData;
    return (
      <div className={styles.detailContainer}>
        <section>
          {/* 质检违规人员信息 */}
          <PersonInfo
            data={qualityDetailData}
            appealInfoCollapse={this.state.appealInfoCollapse}
            onClick={() => this.handleCollapse()}
          />
          <article
            className={
              this.state.appealInfoCollapse ? `${styles.showPanel} ` : `${styles.hidePanel}`
            }
          >
            <div className={styles.subOrderNum}>子订单编号：{qualityDetailData.orderNum}</div>
            <SubOrderDetail data={qualityDetailData.orderDetail} />
            {/* 质检违规详情 */}
            <div className={styles.divideLine} />
            <IllegalInfo data={qualityDetailData} />
          </article>
        </section>
        <section>
          {/* 质检审核 */}
          <CheckInfo
            data={qualityDetailData.qualityAudit}
            checkResultsCollapse={this.state.checkResultsCollapse}
            onClick={() => this.handleCheckResultsCollapse()}
          />
        </section>
        <section>
          <Form layout="inline" className={styles.formBox}>
            <div className={styles.content}>
              <Row className="gutter-row">
                <Col span={24}>
                  <div className={styles.gutterBox1}>
                    <span className={styles.gutterBtn2}>
                      <BIButton>取消</BIButton>
                    </span>
                    <span className={styles.gutterBtn1}>
                      <BIButton type="primary">提交</BIButton>
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        </section>
      </div>
    );
  }
}

export default QualityDetail;
