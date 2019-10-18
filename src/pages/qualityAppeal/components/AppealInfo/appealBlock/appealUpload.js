import React from 'react';
import styles from './launch.less';
import { Row, Col, Form, Input, Upload, message, Spin } from 'antd';
import BIButton from '@/ant_components/BIButton';
import { uploadAttachment } from '../../../../qualityAppeal/services';
const { TextArea } = Input;
let isLt10M = false;
let isZip = false;
class AppealUpload extends React.Component {
  // 发起申诉
  constructor(props) {
    super(props);
    const { id = null } = this.props.location.query;
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
  inputChange = e => {
    e.persist();
    this.state.params.desc = e.target.value;
    this.props.inputChange(this.state.params.desc);
  };
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
    this.props.uploadFileChange(this.state.params.attUrl);
  };

  render() {
    const { qualityDetailData = {}, loading, detailData } = this.props;
    this.firstAppealEndDate = qualityDetailData.firstAppealEndDate;
    const { secondAppealEndDate } = this.props.location.query;
    return (
      <div className={styles.launchContainer} style={{ paddingLeft: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px' }}>
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
                <span style={{ color: '#aaa', fontSize: 12 }}>
                  （请上传10M以内的rar、zip格式文件）
                </span>
              </Upload>
            </div>
          </div>
          <div className={styles.flexStyle}>
            <div className={styles.label}>*申诉说明:</div>
            <div className={styles.intro}>
              <TextArea maxLength={500} rows={4} onChange={this.inputChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppealUpload;
