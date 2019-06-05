import React from 'react';
import styles from  './styles.css';
import { Upload, Icon, Modal } from 'antd';
import leftImgDisable from '@/assets/scoreQuality/left-moren.png';
import leftImg from '@/assets/scoreQuality/left-moren.png';
import rightImgDisable from '@/assets/scoreQuality/right-moren.png';
import rightImg from '@/assets/scoreQuality/right-moren.png';

export default class UploadImgs extends React.Component {
  state = {
    previewVisible: false,
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { imgList } = this.props;
    return (
      <div style={{ width: '100%' }}>
        <span><img src={leftImgDisable} width={30} height={30}/></span>
        <img src={imgList[0]} className={styles.img}/>
        <span style={{ width: 20,height:1,float:'left' }}/>
        <img src={imgList[1]}  className={styles.img}/>
        <span style={{ width: 20,height:1,float:'left' }}/>
        <img src={imgList[0]}  className={styles.img}/>
        <span><img src={rightImg} width={30} height={30}/></span>
      </div>
    );
  }
}
