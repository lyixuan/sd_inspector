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
      visible: this.props.visible,
      title: '',
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

  formatFn = (dimensionType) => {
    let params = {
      dimensionTypeHtml: '',
      title: ''
    };
    // eslint-disable-next-line default-case
    switch (dimensionType) {
      // 优新
      case 12:
        params.dimensionTypeHtml = '<img />';
        params.title = '';
        break;

      // IM
      case 15:
      case 16:
      case 17:
        params.dimensionTypeHtml = '<img />';
        params.title = '';
        break;

      // 工单
      case 20:
      case 21:
      case 22:
        params.dimensionTypeHtml = '<img />';
        params.title = '';
        break;

      // 底线
      case 24:
      case 25:
      case 26:
      case 47:
        params.dimensionTypeHtml = '<img />';
        params.title = '';
        break;
      // 创收
      case 43:
      case 44:
      case 45:
        params.dimensionTypeHtml = '<img />';
        params.title = '';
        break;
    }

    return params;
  }
  render() {
    const { dimensionType } = this.props;
    let dimensionTypeHtml = this.formatFn(dimensionType).dimensionTypeHtml;
    let title = this.formatFn(dimensionType).title;
    return (
      <div>
        <BIModal
          title={title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <BIButton type="primary" onClick={this.handleOk}>确定</BIButton>
          ]}
        >
          {dimensionTypeHtml}
        </BIModal>
      </div >
    );
  }
}
export default ExampleImg;
