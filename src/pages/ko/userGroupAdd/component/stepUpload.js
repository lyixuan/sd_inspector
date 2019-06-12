/*
* customTip 注意事项
* callBackParent
* saveFileList
* uploadUrl
* */
import React, { Component } from 'react';
import { message, Upload } from 'antd';
import uploadImg from '@/assets/uploadImg.png';
import BIInput from '@/ant_components/BIInput';
import styles from '../style.less';

let isExcel = false;
let isLt10M = false;
let isDel = false;
const { TextArea } = BIInput;
class stepUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: this.props.fileList,
      uniqueKey: props.uniqueKey ? props.uniqueKey : null,
      groupName: props.groupName ? props.groupName : '',
    };
  }
  // input双向绑定
  groupNameChange = (e) => {
    this.setState({
      groupName: e.target.value
    })
    const { callBackParent, getParams } = this.props;
    if (!e.target.value || !this.state.uniqueKey) {
      callBackParent(true, '');
    } else {
      callBackParent(false, '');
    }
    let param = {
      uniqueKey: this.state.uniqueKey,
      groupName: e.target.value
    }
    if (getParams) {
      getParams(param);
    }

  }
  handleChange = info => {
    // tip 目前支持上传一个文件
    let { fileList } = info;
    if (isLt10M) {
      fileList = fileList.slice(-1);
      if (isExcel) {
        this.setState({ fileList });
      }
    }
    const { callBackParent, saveFileList, getParams } = this.props;
    if (isDel) {
      return callBackParent(true, '');
    }
    callBackParent(true, '');
    if (info.file.response) {
      if (info.file.response.code === 20000) {
        this.setState({
          uniqueKey: info.file.response.data.uniqueKey
        })
        if (this.state.groupName && this.state.uniqueKey) {
          callBackParent(false, info.file.response.data);
        }

        if (saveFileList) {
          saveFileList(fileList);
        }
        if (getParams) {
          getParams({
            groupName: this.state.groupName,
            uniqueKey: info.file.response.data.uniqueKey
          });
        }
      } else {
        message.error(info.file.response.msgDetail);
      }
    }
  };
  render() {
    const { uploadUrl } = this.props;
    const props = {
      beforeUpload(file) {
        isDel = false;
        const arr = file.name.split('.');
        isExcel = arr[arr.length - 1] === 'xlsx' || arr[arr.length - 1] === 'xls';
        if (!isExcel) {
          message.error('请上传 Excel 文件！');
        }

        isLt10M = file.size / 1024 / 1024 < 20;
        if (!isLt10M) {
          message.error('文件不能大于20MB！');
        }
        return isExcel && isLt10M;
      },
      onChange: this.handleChange,
      onRemove(e) {
        isDel = true;
        console.log(e);
      },
    };

    return (
      <div className={styles.wrap}>
        <div className={styles.groupName}>
          <p>用户组名称：</p>
          <TextArea
            placeholder="输入名称"
            maxLength={50}
            defaultValue={this.props.groupName}
            style={{ resize: 'none' }}
            onChange={this.groupNameChange}
            autosize={{ minRows: 2, maxRows: 2 }}
          />
        </div>
        <div className={styles.upload}>
          <Upload {...uploadUrl} {...props} fileList={this.state.fileList}>
            <img className={styles.uploadImg} src={uploadImg} alt="上传Excel" />
            <p className={styles.uploadTxt}> 选择文件 </p>
          </Upload>
        </div>

      </div>
    );
  }
}

export default stepUpload;
