import React from 'react';
import styles from './style.less';
import { Row, Col, Form, Input, Upload, message, Spin } from 'antd';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import AppealInfoComponent from '../appealBlock/appealInfoComponent';
import SOPCheckResult from '../../../qualityAppeal/component/sopCheckResult';
import SuperiorCheck from '../../../qualityAppeal/component/superiorCheck';
import AppealUpload from '../appealBlock/appealUpload';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
const { TextArea } = Input;
let isLt10M = false;
const confirm = BIModal.confirm;
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
    const that = this;
    confirm({
      className: 'BIConfirm',
      title: '是否确认提交？',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        that.props.dispatch({
          type: 'Launch/launchAppeal',
          payload: { params },
        });
      },
      onCancel() {},
    });
  };
  handleCancel = () => {
    const that = this;
    confirm({
      className: 'BIConfirm',
      title: '此操作将不保存已录入内容，是否确认？',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        router.goBack();
      },
      onCancel() {},
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
    if (detailData.length > 0) {
      detailData.forEach((item, index) => {
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
    const { qualityDetailData = {}, loading, detailData } = this.props;
    this.firstAppealEndDate = qualityDetailData.firstAppealEndDate;
    const { secondAppealEndDate } = this.props.location.query;
    return (
      <Spin spinning={this.props.pageLoading}>
        <div>
          {secondAppealEndDate ? (
            <div className={styles.info}>
              {this.getAppealInfos(detailData)}
              <div className={styles.appealInfo} style={{ marginTop: '20px', background: 'none' }}>
                二次申诉
                <span>
                  二次申诉截止日期：
                  {moment(Number(secondAppealEndDate)).format('YYYY-MM-DD')}
                </span>
              </div>
              <AppealUpload
                {...this.props}
                qualityDetailData={qualityDetailData}
                detailData={detailData}
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
                {/* <div className={styles.appealInfo}>
                  一次申诉
                  <span>
                    （一次申诉截止日期：
                    {moment(qualityDetailData.firstAppealEndDate).format('YYYY-MM-DD')}）
                  </span>
                </div> */}
                {this.getAppealInfos(detailData)}
                <AppealUpload
                  {...this.props}
                  qualityDetailData={qualityDetailData}
                  detailData={detailData}
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
                  <BIButton onClick={this.handleCancel}>取消</BIButton>
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
