import React from 'react';
import styles from './styles.less';
import { Upload, Icon, Modal, message } from 'antd';
import leftImgDisable from '@/assets/scoreQuality/left-moren.png';
import leftImg from '@/assets/scoreQuality/left-moren1.png';
import rightImgDisable from '@/assets/scoreQuality/right-moren.png';
import rightImg from '@/assets/scoreQuality/right-moren1.png';
/*
  * beforeUpload 默认上传行为之前的钩子函数，用来限制上传文件
  * uploadImg 外层回调,上传组件的回调
  * fileList 返回列表
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
      fileList: this.props.fileList || [
        // {
        //   uid: '-1',
        //   name: 'xxx.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //   uid: '-2',
        //   name: 'xxx.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
      ],
      previewVisible: false,
      previewImage: '',
      width: 130, //元素的宽度
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

  handleChange = ({ file, fileList }) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return false;
    }
    console.log(file.name,'file');
    if (isJPG && isLt2M) {
      this.props.UploadImg(file.thumbUrl);
      this.setState({ fileList })
    }
  };

  handleBefore = (file) => {
    return false;
  }

  setIndex(index) {
    const len = this.state.fileList.length;
    if (len <= 2) return;  // 默认展示2+ 一个upload按钮 所以少于三个不出现按钮

    let nextIndex = (index + len) % len;
    if (index <= 0) {
      this.setState({ currentIndex: 0 });
      return;
    };
    if (index >= len - this.props.fileList.length) {
      // this.setState({ currentIndex: });
    }; // 大于全部的值
    this.setState({ currentIndex: nextIndex });
  }

  render() {
    const { width, currentIndex, fileList } = this.state;

    const offset = -currentIndex * width;
    const len = this.state.fileList.length;
    const leftButtonStyle = {
      left: 0,
      display: len >= 3 ? 'block' : 'none',
    };

    const rightButtonStyle = {
      right: 0,
      display: len >= 3 || len >= 6 ? 'block' : 'none',
    };

    const contentStyle = {
      width: len >= 6 ? width * len : width * len + 130,
      height: 80,
      display: 'inline-block',
      marginLeft: offset,
      transition: '.2s'
    }

    const { previewVisible, previewImage, appid, secret } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const props = {
      action: this.state.action,
      fileList: fileList,
      data: {
        appid: appid,
        secret: secret,
      },
      headers: { 'X-Requested-With': null },
      // accept: "image/*",
      accept: "image/jpg,image/jpeg,image/png",
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload,
      onPreview: this.handlePreview,
      listType: "picture-card",
    };


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
                {...props}
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
      </div>
    );
  }
}
export default UploadImg;
