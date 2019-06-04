import React from 'react';
import { Upload, Icon, Modal } from 'antd';

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
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <div style={{ width: '100%' }}>
      </div>
    );
  }
}
