import React from 'react';
import styles from './styles.less';
import { Upload, Icon, Modal, message } from 'antd';
import leftImgDisable from '@/assets/scoreQuality/left-moren.png';
import leftImg from '@/assets/scoreQuality/left-moren1.png';
import rightImgDisable from '@/assets/scoreQuality/right-moren.png';
import rightImg from '@/assets/scoreQuality/right-moren1.png';
import { uploadMultipleFile } from '../../onAppeal/createAppeal/services';
import PropTypes from 'prop-types';
/*
 * uploadImg 外层回调,上传组件的回调
 * fileList 返回列表
 * width 图片的宽度，没有默认为128
 * limitImgNum 最多上传多少个图片  没有默认为6个
 * mainNum 展示几个图片 默认展示3个
 * limit 限制最多可以上传多大尺寸 默认是2m
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
      limitImgNum: this.props.limitImg || 6,
      previewVisible: false,
      previewImage: '',
      width: this.props.width || 128, //元素的宽度
      currentIndex: 0,
      mainNum: 3, // 默认展示三个,
      hoverLeft: false,
      hoverRight: false,
      appealProof: [],
      isShowDelBtn: this.props.showDelBtn || 'show',
    };
  }
  static propTypes = {
    fileList: PropTypes.array,
    limitImgNum: PropTypes.number,
    width: PropTypes.number,
    isShowDelBtn: PropTypes.string,
  };

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
    const { type, status, size, response, appealProof } = file;
    const { currentIndex, mainNum, fileList: { length } } = this.state;
    // eslint-disable-next-line default-case
    switch (status) {
      // 上传
      case 'uploading':
        if (type !== 'image/jpeg' && type !== 'image/png') {
          message.error('只允许上传png/jpg/jpeg结尾的文件');
          return false;
        }
        if (size / 1024 / 1024 >= 2) {
          message.error('图片不能超过2MB!');
          return false;
        }
        break;
      // 上传完毕
      case 'done':
        if (response.code !== 20000) {
          message.error('code错误');
          return false;
        } else {
          this.props.uploadImg(fileList);
          this.setIndex(currentIndex + 1);
        }
        break;
      case 'removed':
        this.props.uploadImg(fileList);
        if (length - currentIndex < mainNum)
          this.setIndex(currentIndex - 1);
        break;
    }
    this.setState({ fileList: [...fileList] });
    return true;
  };

  handleBefore = file => {
    return false;
  };

  setIndex(index) {
    const {
      limitImgNum,
      mainNum,
      fileList: { length },
    } = this.state;
    // index小于等于展示数与默认显示数的差,则设置currentIndex
    if (index <= Math.min(limitImgNum, length + 1) - mainNum) {
      // 设置currentIndex为index 或 0 ,
      this.setState({ currentIndex: Math.max(index, 0) });
    }
  }

  handleRemove = file => {
    const { fileList } = this.state;
    this.setState({
      fileList: fileList.filter(uid => uid !== file.uid),
    });
  };

  toggleHover = () => {
    this.setState({ hoverLeft: !this.state.hoverLeft });
  };
  toggleHoverRig = () => {
    this.setState({ hoverRight: !this.state.hoverRight });
  };
  render() {
    const {
      width,
      currentIndex,
      fileList,
      mainNum,
      limitImgNum,
      hoverLeft,
      hoverRight,
      isShowDelBtn,
    } = this.state;

    const offset = -currentIndex * width;
    const len = this.state.fileList.length;

    let iconLeft;
    let iconRight;

    if (hoverLeft) {
      iconLeft = <img src={leftImg} alt="" />;
    } else {
      iconLeft = <img src={leftImgDisable} alt="" />;
    }

    if (hoverRight) {
      iconRight = <img src={rightImg} alt="" />;
    } else {
      iconRight = <img src={rightImgDisable} alt="" />;
    }

    const leftButtonStyle = {
      left: 0,
      marginRight: 10,
      display:
        isShowDelBtn === 'show'
          ? len >= mainNum
            ? 'block'
            : 'none'
          : len > mainNum
            ? 'block'
            : 'none',
    };

    const rightButtonStyle = {
      right: 0,
      display:
        isShowDelBtn === 'show'
          ? len >= mainNum
            ? 'block'
            : 'none'
          : len > mainNum
            ? 'block'
            : 'none',
    };

    const contentStyle = {
      width: len >= limitImgNum ? width * len : width * len + width,
      height: 80,
      display: 'inline-block',
      marginLeft: offset,
      transition: '.2s',
    };

    const listContent = {
      width: mainNum * width,
    };

    const { previewVisible, previewImage } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    let name = isShowDelBtn === 'show' ? 'showDelBtn' : 'hideDelBtn';
    return (
      <div className="clearfix">
        <div className={styles.uploadImgWrap}>
          <a
            style={leftButtonStyle}
            onClick={() => this.setIndex(currentIndex - 1)}
            href="javscript:void(0)"
            className={styles.arrowLeft}
            onMouseOver={this.toggleHover}
            onMouseOut={this.toggleHover}
          >
            {iconLeft}
          </a>
          <div className={styles.listContent} style={listContent}>
            <div style={contentStyle}>
              <Upload
                className={name}
                {...uploadMultipleFile()}
                onChange={this.handleChange}
                beforeUpload={this.beforeUpload}
                onPreview={this.handlePreview}
                onRemove={this.handleRemove}
                fileList={fileList}
                listType="picture-card"
                accept="image/*"
              >
                {fileList.length >= limitImgNum ? null : uploadButton}
              </Upload>
            </div>
          </div>
          <a
            style={rightButtonStyle}
            onClick={() => this.setIndex(currentIndex + 1)}
            href="javscript:void(0)"
            className={styles.arrowRight}
            onMouseOver={this.toggleHoverRig}
            onMouseOut={this.toggleHoverRig}
          >
            {iconRight}
          </a>
        </div>

        <Modal width={'70%'} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default UploadImg;
