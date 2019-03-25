import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import styles from './style.less';
import CommonForm from '../../components/commonForm';


@connect(({ loading }) => ({
  loading
}))

class EditQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {

  }
  getQualityDetailData = () => {

    this.props.dispatch({
      type: 'qualityAppealHome/getQualityDetailData',
      id: null,
    })
  }

  onSubmit = (params) => {
    console.log(params)
  }

  render() {
    return (
      <div className={styles.qualityContainter}>
        <div className={styles.title}>质检违规详情</div>

        {/* form区域 */}
        <CommonForm {...this.props} onSubmit={this.onSubmit} />

        <BIModal
          title="提交确认"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton type="primary" onClick={this.handleOk}>
              确定
            </BIButton>,
          ]}
        >
          <div className={styles.modalWrap}>该条记录将被提交给质检主管进行审核，确定提交吗？</div>
        </BIModal>
      </div>
    );
  }
}

export default EditQualityNewSheet;
