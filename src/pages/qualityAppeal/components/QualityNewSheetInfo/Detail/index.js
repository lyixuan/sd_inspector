import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import CheckInfo from '../checkInfo';
import { Form, Row, Col, Spin } from 'antd';
import BIButton from '@/ant_components/BIButton';
import router from 'umi/router';

class QualityNewSheetDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityInfoCollapse: true,
      checkResultsCollapse: true,
    };
  }

  handleCollapse() {
    this.setState({ qualityInfoCollapse: !this.state.qualityInfoCollapse });
  }
  handleCheckResultsCollapse() {
    this.setState({ checkResultsCollapse: !this.state.checkResultsCollapse });
  }
  render() {
    const { qualityDetailData = {} } = this.props;
    return (
      <div className={styles.detailContainer}>
        {qualityDetailData.qualityAudit && qualityDetailData.qualityAudit.length > 0 ? (
          <section>
            <CheckInfo
              firstAppealEndDate={qualityDetailData.firstAppealEndDate}
              data={qualityDetailData.qualityAudit}
              checkResultsCollapse={this.state.checkResultsCollapse}
              onClick={() => this.handleCheckResultsCollapse()}
            />
          </section>
        ) : null}
        <section>
          <Form layout="inline" className={styles.formBox}>
            <div className={styles.content}>
              <Row className="gutter-row">
                <Col span={24}>
                  <div className={styles.gutterBox1}>
                    <span className={styles.gutterBtn2}>
                      <BIButton onClick={() => router.goBack()}>返回</BIButton>
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

export default QualityNewSheetDetail;
