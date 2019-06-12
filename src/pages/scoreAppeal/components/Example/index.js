import React from 'react';
import styles from './styles.less';
import BIModal from '@/ant_components/BIModal';
import BIButton from '@/ant_components/BIButton';
import { STATIC_HOST } from '@/utils/constants';
/*
  * visible 显示隐藏
*/

class ExampleImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      dimensionType: this.props.dimensionType,
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
      src: '',
      title: ''
    };
    // eslint-disable-next-line default-case
    switch (dimensionType) {
      // 优新
      case 11:
      case 12:
        params.src = `${STATIC_HOST}/${"/upload/credit_appeal/demo/400_call.png"}`;
        params.title = '开班电话申诉 ——— 证据样例';
        break;

      // IM
      case 14:
      case 15:
      case 16:
      case 17:
        params.src = `${STATIC_HOST}/${"/upload/credit_appeal/demo/im.png"}`;
        params.title = 'IM申诉 ——— 证据样例';
        break;

      // 工单
      case 19:
      case 20:
      case 21:
      case 22:
        params.src = `${STATIC_HOST}/${"/upload/credit_appeal/demo/worker_order.png"}`;
        params.title = '工单申诉 ——— 证据样例';
        break;

      // 事件、班投
      case 23:
      case 24:
      case 25:
        params.src = `${STATIC_HOST}/${"/upload/credit_appeal/demo/event_complaint.png"}`;
        params.title = '事件、班投申诉 ——— 证据样例';
        break;
      // 退费
      case 26:
      case 47:
        params.src = `${STATIC_HOST}/${"/upload/credit_appeal/demo/event_detention.png"}`;
        params.title = '退费、退挽申诉 ——— 证据样例';
        break;
      // 创收
      case 42:
      case 43:
      case 44:
      case 45:
        params.src = `${STATIC_HOST}/${"/upload/credit_appeal/demo/stu_recommend.png"}`;
        params.title = '创收申诉 ——— 证据样例';
        break;
    }
    return params;
  }
  render() {
    const { dimensionType } = this.state;
    let src = this.formatFn(Number(dimensionType)).src;
    let title = this.formatFn(Number(dimensionType)).title;
    return (
      <div>
        <BIModal
          className={styles.modelcss}
          centered={true}
          width={910}
          title={title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <BIButton type="primary" onClick={this.handleOk}>确定</BIButton>
          ]}
        >
          <p style={{ height: 320, overflowY: 'scroll', }}>
            <img src={src} style={{ width: '100%', backgroundSize: '100%', }} />
          </p>
        </BIModal>
      </div >
    );
  }
}
export default ExampleImg;
