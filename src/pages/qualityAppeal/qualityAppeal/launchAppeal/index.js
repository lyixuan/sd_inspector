import React from 'react';
import styles from './style.less';
import { Row, Col, Form, Input, Upload, message,Spin } from 'antd';
import BIButton from '@/ant_components/BIButton';
import SubOrderDetail from './../../components/subOrderDetail';
import PersonInfo from './../../qualityNewSheet/detail/components/personInfo';
import IllegalInfo from './../../qualityNewSheet/detail/components/illegalInfo';
import { uploadAttachment } from '../../services';
import AppealInfo from './../component/appealInfo';
import SOPCheckResult from './../component/sopCheckResult';
import SuperiorCheck from './../component/superiorCheck';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
const { TextArea } = Input;
let isLt10M = false;
let isZip = false;
@connect(({ Launch, qualityAppealHome,loading }) => ({
  Launch,
  qualityAppealHome,
  loading: loading.effects['Launch/launchAppeal'],
  pageLoading: loading.effects['qualityAppealHome/getDetailData']||loading.effects['qualityAppealHome/getQualityDetailData']
}))
class Launch extends React.Component {
  constructor(props) {
    super(props);
    const {id=null}=props.location.query;
    this.state = {
      paramId: {
        id,
      },
      params: {
        firstAppealEndDate: undefined,
        type: 1,// 一次提交申诉
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
  handleSubmit = () => {
    const {secondAppealEndDate}=this.props.location.query;
    let params = this.state.params;
    params.firstAppealEndDate = this.firstAppealEndDate;
    if(secondAppealEndDate){// 二次提交申诉
      params.type=2;
    }
    if (!this.state.params.desc.replace(/(^\s*)/g, "")) {
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
  inputChange = e => {
    e.persist();
    this.state.params.desc = e.target.value;
    this.setState({ params: this.state.params });
  };
  handleCollapse() {
    this.setState({ qualityInfoCollapse: !this.state.qualityInfoCollapse });
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
    fileList = fileList.slice(-1);
    this.setState({ fileList });
    const { response = {} } = fileList[0] || {};
    if (response.code === 20000) {
      this.state.params.attUrl = response.data.fileUrl;
    } else {
      this.state.params.attUrl = '';
    }
  };
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
  render() {
    const {qualityAppealHome = {},loading} = this.props;
    const qualityDetailData = qualityAppealHome.QualityDetailData;
    this.firstAppealEndDate = qualityDetailData.firstAppealEndDate;
    const {masterQualityValue='',masterMail=''} = qualityAppealHome;
    const {secondAppealEndDate} = this.props.location.query

    return (
      <Spin spinning={this.props.pageLoading}>
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
              <IllegalInfo data={qualityDetailData} masterQualityValue={masterQualityValue} masterMail={masterMail}/>
            </article>
          </section>
          {secondAppealEndDate?
            (
              <div>
                {this.getAppealInfos(qualityAppealHome.DetailData)}
                <div className={styles.appealInfo}>
                  二次申诉
                  <span>
                二次申诉截止日期：
                    {moment(Number(secondAppealEndDate)).format('YYYY-MM-DD')}
                      </span>
                </div>
                <div className={styles.originator}>申诉发起人</div>
                <div className={styles.flexStyle}>
                  <div className={styles.label}>附件:</div>
                  <div style={{ marginLeft: '20px', marginTop: '-5px' }}>
                    <Upload
                      {...uploadAttachment()}
                      data={{ type: qualityDetailData.qualityType }}
                      onChange={this.uploadFileChange}
                      beforeUpload={this.beforeUpload}
                      fileList={this.state.fileList}
                    >
                      <BIButton type="primary">上传附件</BIButton>
                      <span style={{color:'#aaa',fontSize:12}}>（请上传10M以内的rar、zip格式文件）</span>
                    </Upload>
                  </div>
                </div>

                <div className={styles.flexStyle}>
                  <div className={styles.label}>申诉说明:</div>
                  <div className={styles.intro}>
                    <TextArea maxLength={500}  rows={4} onChange={this.inputChange} />
                  </div>
                </div>
              </div>
            ):
            (
              <div className={styles.info}>
                <div className={styles.title}>申诉信息</div>
                <div>
                  <div className={styles.appealInfo}>
                    一次申诉
                    <span>（一次申诉截止日期：{moment(qualityDetailData.firstAppealEndDate).format('YYYY-MM-DD')}） </span>
                  </div>
                  <div className={styles.originator}>申诉发起人</div>
                  <div className={styles.flexStyle}>
                    <div className={styles.label}>附件:</div>
                    <div style={{ marginLeft: '20px', marginTop: '-5px' }}>
                      <Upload
                        {...uploadAttachment()}
                        data={{ type: qualityDetailData.qualityType }}
                        onChange={this.uploadFileChange}
                        beforeUpload={this.beforeUpload}
                        fileList={this.state.fileList}
                      >
                        <BIButton type="primary">上传附件</BIButton>
                        <span style={{color:'#aaa',fontSize:12}}>（请上传10M以内的rar、zip格式文件）</span>
                      </Upload>
                    </div>
                  </div>

                  <div className={styles.flexStyle}>
                    <div className={styles.label}>*申诉说明:</div>
                    <div className={styles.intro}>
                      <TextArea maxLength={500}  rows={4} onChange={this.inputChange} />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
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

// export default Launch;
