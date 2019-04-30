import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import styles from './style.less';
import CommonForm from '../../components/commonForm';

@connect(({ loading }) => ({
  loading,
}))
class EditQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paramsId: {
        id: 1,
      },
      // params: this.paramsModel.initModel,
      type: undefined,
      mail: undefined,
      user: undefined,
      userRole: undefined,
      organize: undefined,
      order: undefined,
      dateViolation: undefined,
      dateDeduction: undefined,
      treeValue: undefined,
      dimension: undefined,
      visible: false,
      fileList: this.props.fileList,
    };
  }
  onSubmit = params => {
    console.log(params);
  };
  render() {
    return (
      <div className={styles.qualityContainter}>
        <div className={styles.title}>质检违规详情</div>
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
