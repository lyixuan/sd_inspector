import React from 'react';
import { Input, Modal } from 'antd';
import { connect } from 'dva/index';
import BIButton from '@/ant_components/BIButton';
import styles from './style.less'
import btnStyles from '@/pages/ko/entrancePlatform/commom.less';

const { TextArea } = Input;
@connect(({ loading }) => ({
  loading: loading.effects['examPlatformModal/createGroup'],
}))
class index  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 弹框是否显示标志
      groupName: undefined
    };
  }
  handleToggle = () => {
    this.setState({
      visible: !this.state.visible,
      groupName: ''
    });
  };
  handleOk = () => {
    const { queryCondition, userCount } = this.props;
    this.props.dispatch({
      type: 'examPlatformModal/createGroup',
      payload: {
        params: { queryCondition: this.props.handlePramas(queryCondition), userCount, groupName: this.state.groupName }
      },
      callback: () => {
        this.handleToggle();
      },
    });
  }
  handleroupName = (e) => {
    this.setState({
      groupName: e.target.value
    });
  }
  render() {
    const { loading, userCount, queryloading } = this.props;
    const { visible, groupName } = this.state;
    return (
      <>
        <Modal
          title="创建用户群"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleToggle}
          centered={true}
          footer={[
            <BIButton key="back" onClick={this.handleToggle} style={{ marginRight: '10px' }}>取消</BIButton>,
            <BIButton key="submit" type="primary" onClick={this.handleOk} loading={loading}>确定</BIButton>,
          ]}
        >
          <div className={styles.modalContent}>
            <div>
              用户群类型：报考通知
            </div>
            <div>
              用户群名称：<TextArea
              value={groupName}
              className={styles.inputTextArea}
              autosize={{ minRows: 4, maxRows: 4 }}
              placeholder="最多支持输入50个字"
              maxLength="50"
              onChange={this.handleroupName}
            />
            </div>
          </div>
        </Modal>
        {userCount != 0 && <BIButton disabled={queryloading} className={btnStyles.btnYellow} onClick={this.handleToggle} style={{ marginRight: '10px' }}>创建/导出用户群</BIButton>}
      </>
    )
  }
}
export default index
