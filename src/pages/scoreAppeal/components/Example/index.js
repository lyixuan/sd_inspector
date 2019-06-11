import React from 'react';
import styles from './styles.less';
import BIModal from '@/ant_components/BIModal';
import BIButton from '@/ant_components/BIButton';
/*
  * visible 显示隐藏
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
        <BIModal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <BIButton type="primary" onClick={this.handleOk}>确定</BIButton>
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
        </BIModal>
      </div >
    );
  }
}
export default ExampleImg;
