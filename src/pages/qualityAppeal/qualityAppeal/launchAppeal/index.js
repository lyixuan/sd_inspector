import React from 'react';
import styles from './style.less';
import { Row, Col, Form, Input, Upload, message } from 'antd';
import BIButton from '@/ant_components/BIButton';
import SubOrderDetail from './../../components/subOrderDetail';
import PersonInfo from './../../qualityNewSheet/detail/components/personInfo';
import IllegalInfo from './../../qualityNewSheet/detail/components/illegalInfo';
import { connect } from 'dva';
import moment from 'moment';
const { TextArea } = Input;
let isLt10M = false;
let isZip = false;
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
      fileList: this.props.fileList,
      appealInfoCollapse: true,
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
    if (!this.state.params.desc) {
      alert("请填写申诉说明");
      return;
    }
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
  // 上传附件
  // 文件预上传判断
  beforeUpload = file => {
    const arr = file.name.split('.');
    isZip = arr[arr.length - 1] === 'zip' || arr[arr.length - 1] === 'rar';
    if (!isZip) {
      message.error('文件仅支持zip或rar格式!');
    }
    isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('文件不能大于10MB！');
    }
    return isZip && isLt10M;
  };

  uploadFileChange = info => {
    // tip 目前支持上传一个文件
    let { fileList } = info;
    if (isLt10M) {
      fileList = fileList.slice(-1);
      console.log(89, info, fileList)
      if (isZip) {
        this.setState({ fileList });
        // this.props.dispatch({
        //   type: 'Launch/uploadFile',
        //   payload: { file: fileList[0].name, type: this.state.params.type },
        // })
      }
    }

  };
  render() {
    const qualityDetailData = this.props.qualityAppealHome.QualityDetailData;
    const props = {
      beforeUpload: this.beforeUpload,
      onChange: this.uploadFileChange,
    };
    this.state.params.firstAppealEndDate = qualityDetailData.firstAppealEndDate
    this.state.params.type = qualityDetailData.qualityType
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
                <Upload {...props} fileList={this.state.fileList} action='http://172.16.117.65:3000/mock/29/quality/uploadAttachment'>
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
