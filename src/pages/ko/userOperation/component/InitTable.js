/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Tooltip, Popconfirm, message, Button } from 'antd';
import styles from '../style.less';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import BIInput from '@/ant_components/BIInput';
import userEdit from '@/assets/userEdit.png';
import router from 'umi/router';

const { TextArea } = BIInput;

const contentDel = (
  <div>
    <p style={{ marginBottom: '7px', color: "#fff" }}>是否确认删除</p>
  </div>
);


function Status(props) {
  if (props.type == 1) {
    return "未开始"
  } else if (props.type == 2) {
    return "更新中"
  } else if (props.type == 3) {
    return "成功"
  } else if (props.type == 4) {
    return "失败"
  }
}
@connect(({ userOperation }) => ({
  userOperation
}))
class InitTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.userOperation.visible,
      groupName: undefined,
      rowId: null,
      pageSize: 10,
      page: 1
    };
  }
  showPop = () => {
    this.setState({
      visible: true
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleDelete = (record) => {
    this.props.dispatch({
      type: 'userOperation/userGroupDelete',
      payload: { params: { page: this.state.page, pageSize: this.state.pageSize } },
    });
  }
  handleOk = () => {
    console.log('ok')
    if (!this.state.groupName) {
      message.info('请输入名称');
      return;
    }
    let params = {
      id: this.state.rowId,
      groupName: this.state.groupName
    }
    this.props.dispatch({
      type: 'userOperation/userGroupEdit',
      payload: { params: params },
    });
    this.setState({
      visible: false
    })
  }
  handleEdit = () => {
    this.setState({
      visible: true
    })
  }
  handleEditGroup = (record) => {
    router.push({
      pathname: '/ko/userGroupEdit',
      query: { code: record.code }
    });
  }
  edit = (record) => {
    this.setState({
      visible: true,
      rowId: record.id,
      groupName: record.groupName
    })
  }
  userGroupInput = (e) => {
    this.setState({
      groupName: e.target.value
    })
  }
  columnsData = () => {
    const columns = [
      {
        title: '编号',
        dataIndex: 'code',
        key: 'code'
      },
      {
        title: '用户组名称',
        dataIndex: 'groupName',
        key: 'groupName',
        render: (text, record) => (
          <div> {text} <img src={userEdit} style={{ marginLeft: '25px' }} onClick={() => this.edit(record)} /></div>
        ),
      },
      {
        title: '学员标签',
        dataIndex: 'userTag',
        key: 'userTag',
        render: (text, record) => (
          <Tooltip placement="bottom" title={text}>
            <span>查看…</span>
          </Tooltip>

        ),
      },
      {
        title: '学员数',
        dataIndex: 'userCount',
        key: 'userCount',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      {
        title: '状态',
        dataIndex: 'taskStatus',
        key: 'taskStatus',
        render: (text, record) => (
          <div><Status type={text}></Status></div>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <div className={styles.options}>
            <a href="javascript:;" onClick={() => this.handleEditGroup(record)} className={styles.highLight}>编辑</a>
            <Popconfirm className='pop22' placement="top" title={contentDel} onConfirm={() => this.handleDelete(record)} okText="确认" cancelText="取消">
              <a href="javascript:;" className={styles.highLight}>删除</a>
            </Popconfirm>
            <a href="javascript:;">导出</a>

          </div>
        ),
      },
    ];
    return columns || [];
  }

  render() {
    const data = this.props.list.list
    return (
      <>
        <Table rowKey={record => record.id} columns={this.columnsData()} dataSource={data} pagination={false} onClick={this.handleEdit} />
        <BIModal
          title={'用户组名称'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <BIButton key="back" style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton key="submit" type="primary" onClick={this.handleOk}>
              确定
            </BIButton>,
          ]}>
          <div className={styles.modalWrap}>
            <p>请设置用户组名称</p>
            <TextArea
              defaultValue={this.state.groupName}
              placeholder="输入名称"
              maxLength={50}
              onChange={this.userGroupInput}
              style={{ resize: 'none' }}
              autosize={{ minRows: 2, maxRows: 2 }}
            />
          </div>
        </BIModal>
      </>
    );
  }
}

export default InitTable;
