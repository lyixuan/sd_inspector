import React from 'react';
import styles from './style.less';
import { Row, Col, Form, Input, Upload } from 'antd';
import BIButton from '@/ant_components/BIButton';
import SubOrderDetail from './../../components/subOrderDetail';
import PersonInfo from './../../qualityNewSheet/detail/components/personInfo';
import IllegalInfo from './../../qualityNewSheet/detail/components/illegalInfo';
import { connect } from 'dva';
import moment from 'moment';
const { TextArea } = Input;
@connect(({ Launch, qualityAppealHome }) => ({
  Launch,
  qualityAppealHome,
}))
class Launch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paramId: {
        id: this.props.location.query.id || 1,
      },
      params: {
        firstAppealEndDate: undefined,
        type: 1,
        attUrl: '123',
        desc: '',
        qualityId: this.props.location.query.id || 1,
      },
      qualityInfoCollapse: true,
      checkResultsCollapse: true,
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'qualityAppealHome/getDetailData',
      payload: this.state.paramId,
    });
    this.props.dispatch({
      type: 'qualityAppealHome/getQualityDetailData',
      payload: this.state.paramId,
    });
  }
  handleSubmit = e => {
    let params = this.state.params;
    console.log(82, params);
    this.props.dispatch({
      type: 'Launch/launchAppeal',
      payload: { params },
    });
  };
  inputChange = e => {
    e.persist();
    this.state.params.desc = e.target.value;
    this.setState({ params: this.state.params });
  };
  handleCollapse() {
    this.setState({ qualityInfoCollapse: !this.state.qualityInfoCollapse });
  }
  handleCheckResultsCollapse() {
    this.setState({ checkResultsCollapse: !this.state.checkResultsCollapse });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const qualityDetailData = this.props.qualityAppealHome.QualityDetailData;
    console.log(604, qualityDetailData);
    this.state.params.firstAppealEndDate = qualityDetailData.firstAppealEndDate;
    this.state.params.type = qualityDetailData.type;
    return (
      <div className={styles.launchContainer}>
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
            <div className={styles.subOrderNum}>子订单编号：{qualityDetailData.orderNum}</div>
            <SubOrderDetail data={qualityDetailData.orderDetail} />
            {/* 质检违规详情 */}
            <div className={styles.divideLine} />
            <IllegalInfo data={qualityDetailData} />
          </article>
        </section>
        <div className={styles.info}>
          <div className={styles.title}>申诉信息</div>
          <div>
            <div className={styles.appealInfo}>
              一次申诉
              <span>
                一次申诉截止日期：
                {moment(qualityDetailData.firstAppealEndDate).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </div>
            <div className={styles.originator}>申诉发起人</div>
            <div className={styles.flexStyle}>
              <div className={styles.label}>附件:</div>
              <div style={{ marginLeft: '20px', marginTop: '-5px' }}>
                <Upload>
                  <BIButton type="primary">上传附件</BIButton>
                </Upload>
              </div>
            </div>

            <div className={styles.flexStyle}>
              <div className={styles.label}>申诉说明:</div>
              <div className={styles.intro}>
                <TextArea rows={4} onChange={this.inputChange} />
              </div>
            </div>
          </div>
        </div>

        <Row className="gutter-row">
          <Col span={24}>
            <div className={styles.gutterBox1}>
              <span className={styles.gutterBtn2}>
                <BIButton>取消</BIButton>
              </span>
              <span className={styles.gutterBtn1}>
                <BIButton type="primary" onClick={this.handleSubmit}>
                  提交申诉
                </BIButton>
              </span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const submitForm = Form.create({ name: 'form' })(Launch);

export default submitForm;

// export default Launch;
