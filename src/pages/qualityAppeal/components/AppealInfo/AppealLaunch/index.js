import React from 'react';
import styles from './style.less';
import { Row, Col, Form, Input, Upload, message, Spin } from 'antd';
import BIButton from '@/ant_components/BIButton';
import AppealInfoComponent from '../appealBlock/appealInfoComponent';
import SOPCheckResult from '../../../qualityAppeal/component/sopCheckResult';
import SuperiorCheck from '../../../qualityAppeal/component/superiorCheck';
import AppealUpload from '../appealBlock/appealUpload';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
const { TextArea } = Input;
let isLt10M = false;
let isZip = false;
@connect(({ Launch, qualityAppealHome, loading }) => ({
  Launch,
  qualityAppealHome,
  loading: loading.effects['Launch/launchAppeal'],
  pageLoading:
    loading.effects['qualityAppealHome/getDetailData'] ||
    loading.effects['qualityAppealHome/getQualityDetailData'],
}))
class Launch extends React.Component {
  constructor(props) {
    super(props);
    const { id = null } = props.location.query;
    this.state = {
      paramId: {
        id,
      },
      params: {
        firstAppealEndDate: undefined,
        type: 1, // 一次提交申诉
        attUrl: '',
        desc: '',
        qualityId: id,
      },
      fileList: this.props.fileList,
      appealInfoCollapse: [],
      qualityInfoCollapse: true,
      checkResultsCollapse: true,
    };
    this.firstAppealEndDate = null;
  }
  // componentDidMount() {
  //   this.props.dispatch({
  //     type: 'qualityAppealHome/getDetailData',
  //     payload: this.state.paramId,
  //   });
  //   this.props.dispatch({
  //     type: 'qualityAppealHome/getQualityDetailData',
  //     payload: this.state.paramId,
  //   });
  // }
  handleSubmit = () => {
    const { secondAppealEndDate } = this.props.location.query;
    let params = this.state.params;
    params.firstAppealEndDate = this.firstAppealEndDate;
    if (secondAppealEndDate) {
      // 二次提交申诉
      params.type = 2;
      params.firstAppealEndDate = secondAppealEndDate;
    }
    if (!this.state.params.desc.replace(/(^\s*)/g, '')) {
      message.error('请填写申诉说明');
      return;
    }
    this.props.dispatch({
      type: 'Launch/launchAppeal',
      payload: { params },
    });
  };
  handleAppealInfoCollapse(index) {
    this.state.appealInfoCollapse[index] = !this.state.appealInfoCollapse[index];
    this.setState({ appealInfoCollapse: this.state.appealInfoCollapse });
  }
  inputChange = desc => {
    this.state.params.desc = desc;
    this.setState({ params: this.state.params });
  };

  uploadFileChange = attUrl => {
    this.state.params.attUrl = attUrl;
    this.setState({ params: this.state.params });
  };

  getAppealInfos(detailData) {
    let domFragment = [];
    console.log(detailData, 'detailData');
    if (detailData.length > 0) {
      detailData.forEach((item, index) => {
        console.log(item, item.type, 'type');
        domFragment.push(
          <div key={index}>
            <AppealInfoComponent
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
  render() {
    const { qualityAppealHome = {}, loading } = this.props;
    const qualityDetailData = qualityAppealHome.QualityDetailData;
    this.firstAppealEndDate = qualityDetailData.firstAppealEndDate;
    const { secondAppealEndDate } = this.props.location.query;
    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.launchContainer}>
          {secondAppealEndDate ? (
            <div className={styles.info}>
              {this.getAppealInfos(qualityAppealHome.DetailData)}
              <div className={styles.appealInfo}>
                二次申诉
                <span>
                  二次申诉截止日期：
                  {moment(Number(secondAppealEndDate)).format('YYYY-MM-DD')}
                </span>
              </div>
              <AppealUpload
                {...this.props}
                inputChange={desc => this.inputChange(desc)}
                uploadFileChange={attUrl => {
                  this.uploadFileChange(attUrl);
                }}
              />
            </div>
          ) : (
            <div className={styles.info}>
              <div className={styles.title}>申诉信息</div>
              <div className={styles.appealInfoWrap}>
                <div className={styles.appealInfo}>
                  一次申诉
                  <span>
                    （一次申诉截止日期：
                    {moment(qualityDetailData.firstAppealEndDate).format('YYYY-MM-DD')}）
                  </span>
                </div>
                <AppealUpload
                  {...this.props}
                  inputChange={desc => this.inputChange(desc)}
                  uploadFileChange={attUrl => {
                    this.uploadFileChange(attUrl);
                  }}
                />
              </div>
            </div>
          )}
          <Row className="gutter-row">
            <Col span={24}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterBtn2}>
                  <BIButton onClick={() => router.goBack()}>取消</BIButton>
                </span>
                <span className={styles.gutterBtn1}>
                  <BIButton type="primary" loading={loading} onClick={this.handleSubmit}>
                    提交申诉
                  </BIButton>
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </Spin>
    );
  }
}

const submitForm = Form.create({ name: 'form' })(Launch);

export default submitForm;
