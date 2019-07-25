import React from 'react';
import { Input, Modal, Button} from 'antd';
import { connect } from 'dva/index';
import styles from './style.less';
import btnStyles from '@/pages/ko/entrancePlatform/btnstyles.less';

const { TextArea } = Input;

@connect(({ examPlatformModal, loading }) => ({
  groupCheckFlag: examPlatformModal.groupCheckFlag,
  loading: loading.effects['examPlatformModal/createGroup'],
  checkloading: loading.effects['examPlatformModal/userGroupCheck'],
}))
class CreateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 弹框是否显示标志
      groupName: undefined,
    };
  }

  handleToggle = () => {
    this.setState({
      visible: !this.state.visible,
      groupName: '',
    });
  };
  handleOk = () => {
    const { queryCondition, userCount } = this.props;
    this.props.dispatch({
      type: 'examPlatformModal/createGroup',
      payload: {
        params: { queryCondition: this.props.handlePramas(queryCondition), userCount, groupName: this.state.groupName },
      },
      callback: () => {
        // this.handleToggle();
        this.props.onHandleRoute();
      },
    });
  };
  handlegroupName = (e) => {
    this.setState({
      groupName: e.target.value,
    });
  };
  handleCreate = () => {
    this.props.dispatch({
      type: 'examPlatformModal/userGroupCheck',
      payload: {},
      callback: () => {
        this.handleToggle();
      },
    });
  };

  render() {
    const { loading, userCount, queryloading, checkloading, groupCheckFlag } = this.props;
    const { visible, groupName } = this.state;
    return (
      <>
        <Modal
          title="创建用户群"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleToggle}
          centered={true}
          footer={groupCheckFlag ? [<Button className={btnStyles.btnPrimary} key="back" onClick={this.handleToggle}>{'确'}{'定'}</Button>] : [
            <Button className={btnStyles.btnWhite} key="back" onClick={this.handleToggle} style={{ marginRight: '10px' }}>{'取'}{'消'}</Button>,
            <Button className={btnStyles.btnPrimary} key="submit" onClick={this.handleOk} loading={loading}>{'确'}{'定'}</Button>,
          ]}
        >
          {!groupCheckFlag && <div className={styles.modalContent}>
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
              onChange={this.handlegroupName}
            />
            </div>
          </div>}
          {groupCheckFlag && <div style={{textAlign: 'center'}}>
            <p>你有一个正在创建的用户组</p>
            <p>预计需要5～10分钟</p>
            <p>请在用户运营页查看最新的创建状态。</p>
          </div>}
        </Modal>
        {userCount != 0 && <Button className={btnStyles.btnYellow} loading={checkloading} disabled={queryloading} onClick={this.handleCreate} style={{ marginRight: '10px' }}>创建/导出用户群</Button>}
      </>
    );
  }
}

export default CreateModal;
