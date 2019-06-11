import React from 'react';
import styles from './styles.less';
import { Modal, Button } from 'antd';
/*
  * uploadImg
*/

class ExampleImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.props.hideExampleImg();
  };

  handleCancel = e => {
    this.props.hideExampleImg();
  };

  render() {
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button> */}
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal >
      </div >
    );
  }
}
export default ExampleImg;
