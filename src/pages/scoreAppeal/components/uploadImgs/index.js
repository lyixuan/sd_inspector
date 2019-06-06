import React from 'react';
import styles from './styles.less';
import { Upload, Icon, Modal, message } from 'antd';
import leftImgDisable from '@/assets/scoreQuality/left-moren.png';
import leftImg from '@/assets/scoreQuality/left-moren1.png';
import rightImgDisable from '@/assets/scoreQuality/right-moren.png';
import rightImg from '@/assets/scoreQuality/right-moren1.png';
import { uploadMultipleFile } from '../../appeal_create/services';
/*
  * uploadImg 外层回调,上传组件的回调
  * fileList 返回列表
  * width 图片的宽度，没有默认为128
  * limitImg 最多上传多少个图片  没有默认为6个
*/

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class UploadImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: this.props.fileList || [],
      limitImg: this.props.limitImg || 6,
      previewVisible: false,
      previewImage: '',
      width: this.props.width || 128, //元素的宽度
      currentIndex: 0,
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async ({ file, fileList }) => {
    const { type, status, size, response } = file
    const { currentIndex } = this.state
    // eslint-disable-next-line default-case
    switch (status) {
      // 上传
      case 'uploading':
        if (type !== 'image/jpeg') {
          message.error('只允许上传png/jpg结尾的文件')
          return false
        }
        if (size / 1024 / 1024 >= 2) {
          message.error('图片不能超过2MB!')
          return false
        }
        break
      // 上传完毕
      case 'done':
        if (response.code !== 20000) {
          message.error('code错误')
          return false
        } else {
          this.setIndex(currentIndex + 1)
        }
        break
      case 'removed':
        this.setIndex(currentIndex - 1)
        break
    }
    this.setState({ fileList: [...fileList] })
    return true;
  }

  handleBefore = (file) => {
    return false;
  }

  setIndex(index) {
    const len = this.state.fileList.length;
    // 默认展示2+ 一个upload按钮 所以少于三个不出现按钮
    if (len <= 2) return;

    let nextIndex = (index + len) % len;

    if (index <= 0) {
      this.setState({ currentIndex: 0 });
      return;
    };

    //由于有一个框，等于限制的6个，就隐藏掉框所以判断条件不一致
    if (len === 6) {
      if (len <= index + this.props.fileList.length) {
        return;
      }
    } else {
      if (len < index + this.props.fileList.length) {
        return;
      }
    }
    this.setState({ currentIndex: nextIndex });
  }
  handleRemove = (file) => {
    const { fileList } = this.state;

    this.setState({
      fileList: fileList.filter(uid => uid !== file.uid)
    });
  }

  render() {
    const { width, currentIndex, fileList } = this.state;

    const offset = -currentIndex * width;
    const len = this.state.fileList.length;
    const leftButtonStyle = {
      left: 0,
      marginRight: 10,
      display: len >= 3 ? 'block' : 'none',
    };

    const rightButtonStyle = {
      right: 0,
      display: (len >= 3) ? 'block' : 'none',
    };

    const contentStyle = {
      width: len >= 6 ? width * len : width * len + 130,
      height: 80,
      display: 'inline-block',
      marginLeft: offset,
      transition: '.2s'
    }

    const { previewVisible, previewImage } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="clearfix">
        <div className={styles.uploadImgWrap}>
          <a
            style={leftButtonStyle}
            onClick={() => this.setIndex(currentIndex - 1)}
            href="javscript:void(0)" className={styles.arrowLeft}>
            <Icon type="left-circle" style={{ fontSize: '30px', color: '#ccc' }} />
          </a>
          <div className={styles.listContent}>
            <div style={contentStyle}>
              <Upload
                {...uploadMultipleFile()}
                onChange={this.handleChange}
                beforeUpload={this.beforeUpload}
                onPreview={this.handlePreview}
                onRemove={this.handleRemove}
                fileList={fileList}
                listType="picture-card"
              >
                {fileList.length >= 6 ? null : uploadButton}
              </Upload>
            </div>
          </div>
          <a
            style={rightButtonStyle}
            onClick={() => this.setIndex(currentIndex + 1)}
            href="javscript:void(0)" className={styles.arrowRight}>
            <Icon type="right-circle" style={{ fontSize: '30px', color: '#ccc' }} />
          </a>
        </div>

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div >
    );
  }
}
export default UploadImg;
