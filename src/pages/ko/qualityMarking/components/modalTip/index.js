import React from 'react';
import { Modal, Button } from 'antd';
import { connect } from 'dva/index'
import btnStyles from '@/pages/ko/entrancePlatform/btnstyles.less'
import exportimg from '@/assets/ai/export.svg';
import styles from '../../style.less'

@connect(({ loading }) => ({
  loading: loading.effects['workTableModel/exportExcelData'],
}))
class index  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 弹框是否显示标志
      exportType: undefined, // 导出类型：导出类型：11 - IM 21 - BBS 31 - NPS标签 32 - NPS自主评价
    };
  }
  handleExport = (type) => {// 导出类型：11 - IM21 - BBS31 - NPS标签 32 - NPS自主评价
    this.setState({
      visible: true,
      exportType: this.props.markType + '' + type,
    });
  };
  handleOk = () => {
    this.props.dispatch({
      type: 'workTableModel/exportExcelData',
      payload: {
        params: { ...this.props.othersSearch, type: this.state.exportType},
      },
      callback: (res) => {
        this.handleCancel();
      },
    });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {
    const { loading, markType} = this.props;
    const { visible } = this.state;
    return (
      <>
        <Modal
          title="提示"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered={true}
          footer={[
            <Button className={btnStyles.btnWhite} key="back" onClick={this.handleCancel} style={{ marginRight: '10px' }}>{'取'}{'消'}</Button>,
            <Button className={btnStyles.btnPrimary} key="submit" onClick={this.handleOk} loading={loading}>{'确'}{'定'}</Button>,
          ]}
        >
          <p style={{textAlign: 'center'}}>是否确定导出搜索出的数据？</p>
          <p style={{textAlign: 'center'}}>（如数据较多，可能需要多等待一会儿哦～）</p>
        </Modal>
        {markType !== 3 && <Button className={`${btnStyles.btnYellow} ${styles.exportBtn}`} onClick={() => this.handleExport(1)}>
          <img src={exportimg} /> 导出
        </Button>}
        {markType === 3 && <div style={{display: 'flex'}}>
          <Button onClick={() => this.handleExport(1)} className={btnStyles.btnYellow} style={{ marginRight: '10px' }}>导出标签</Button>
          <Button onClick={() => this.handleExport(2)} className={btnStyles.btnBlue}>导出自主评价</Button>
        </div>}
      </>
    )
  }
}
export default index
