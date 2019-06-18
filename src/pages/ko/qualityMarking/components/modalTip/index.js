import React from 'react';
import { Modal } from 'antd';
import { connect } from 'dva/index';
import BIButton from '@/ant_components/BIButton';

@connect(({ loading }) => ({
  loading: loading.effects['workTableModel/exportExcelData'],
}))
class index  extends React.Component {
  render() {
    const { visible, handleOk, handleCancel, loading} = this.props;
    return (
      <Modal
        title="提示"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        footer={[
          <BIButton key="back" onClick={handleCancel} style={{ marginRight: '10px' }}>取消</BIButton>,
          <BIButton key="submit" type="primary" onClick={handleOk} loading={loading}>确定</BIButton>,
        ]}
      >
        <p style={{textAlign: 'center'}}>是否确定导出搜索出的数据？</p>
        <p style={{textAlign: 'center'}}>（如数据较多，可能需要多等待一会儿哦～）</p>
      </Modal>
    )
  }
}
export default index
