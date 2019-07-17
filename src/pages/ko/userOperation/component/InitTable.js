/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Tooltip, Popconfirm, message, Button, Switch, Input } from 'antd';
import styles from '../style.less';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import BIInput from '@/ant_components/BIInput';
import userEdit from '@/assets/userEdit.svg';
import { STATIC_HOST } from '@/utils/constants'
import { thousandsFormat, downBlob } from '@/utils/utils';
// import { downBlob, msgF } from '@/utils/utils';
import router from 'umi/router';

const { TextArea } = BIInput;

const contentDel = (
  <div>
    <p style={{ marginBottom: '7px' }}>是否确认删除</p>
  </div>
);


function Status(props) {
  if (props.type == 1) {
    return "创建中"
  } else if (props.type == 2) {
    return "更新中"
  } else if (props.type == 3) {
    return "已创建"
  } else if (props.type == 4) {
    return "已失败"
  }
}
function StudentLabel(props) {
  if (props.text) {
    return (
      < Tooltip placement="bottom" title={props.text} >
        <span>查看…</span>
      </Tooltip >
    )
  }
  return null


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
    let params = {
      id: record.id,
      page: {
        pageSize: this.state.pageSize,
        page: this.state.page
      }
    }
    this.props.dispatch({
      type: 'userOperation/userGroupDelete',
      payload: { params: params },
    });
  }
  handleOk = () => {
    if (!this.state.groupName) {
      message.info('请输入名称');
      return;
    }
    let params = {
      id: this.state.rowId,
      groupName: this.state.groupName,
      page: {
        pageSize: this.state.pageSize,
        page: this.state.page
      }
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
      pathname: '/koUserOperation/userGroupEdit',
      query: { code: record.code, id: record.id }
    });
  }
  getBlob(url) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        }
      };
      xhr.send();
    });
  }
  saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      const body = document.querySelector('body');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.style.display = 'none';
      body.appendChild(link);
      link.click();
      body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    }
  }
  // 下载任务
  downloadFn = data => {
    const name = `用户组${data.code}`;
    const url = `${STATIC_HOST}${data.filePath}`; // 创建下载的链接
    this.getBlob(url).then(blob => {
      this.saveAs(blob, name);
    });
    return;
  };
  // 编辑用户组名称
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
  onPushedChange = (id, pushed)=> {
    this.props.dispatch({
      type: 'userOperation/userGroupUpdate',
      payload: { params: {id, pushed} },
      callback: () => {
        this.props.getInitData();
      }
    })
  }
  updateUserGroup = (record, type, e) => {
    if (!e || !e.target) return;
    const v = e.target.value || '';
    const t = record[type] || '';
    if (v === t) return;
    this.props.dispatch({
      type: 'userOperation/userGroupUpdate',
      payload: { params: {id: record.id, [type] : e.target.value} },
      callback: () => {
        this.props.getInitData();
      }
    })
  }
  doubleClick = (record, key) => {
    console.log(record, key)
    // record[key] = false;
  }
  columnsData = (record, key) => {
    const columns = [
      {
        title: '编号',
        dataIndex: 'code',
        key: 'code',
        fixed: 'left',
        width: 160,
      },
      {
        title: '用户群类型',
        dataIndex: 'groupType',
        key: 'groupType',
        width: 120,
        render: (text) => text === 1 ? '报考通知' : 'KO运营'
      },
      {
        title: '用户组名称',
        dataIndex: 'groupName',
        key: 'groupName',
        width: 120,
        render: (text, record) => (
          <div style={{ display: 'flex', justifyItems: 'center' }}>
            <img src={userEdit} style={{ marginRight: '15px', width: '15px', height: '15px', marginTop: '3px', cursor: "pointer" }} onClick={() => this.edit(record)} />
            <Tooltip placement="bottom" title={text} >
              <span style={{ maxWidth: '100px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</span>
            </Tooltip >
          </div>
        ),
      },
      {
        title: '学员标签',
        dataIndex: 'userTag',
        key: 'userTag',
        width: 120,
        render: (text, record) => (
          <StudentLabel text={text}></StudentLabel>
          // < Tooltip placement="bottom" title={text} >
          //   <span>查看…</span>
          // </Tooltip >

        ),
      },
      {
        title: '学员数',
        dataIndex: 'userCount',
        key: 'userCount',
        width: 120,
        render: (text, record) => (
          <span>{thousandsFormat(text)}</span>
        )
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 200,
      },
      {
        title: '状态',
        dataIndex: 'taskStatus',
        key: 'taskStatus',
        width: 120,
        render: (text, record) => (
          <div><Status type={text}></Status></div>
        ),
      },
      {
        title: '是否推送',
        dataIndex: 'pushed',
        key: 'pushed',
        width: 120,
        render: (text, record) => <Switch defaultChecked={text} onChange={this.onPushedChange.bind(undefined, record.id)}></Switch>
      },
      {
        title: '推送人',
        dataIndex: 'pusher',
        key: 'pusher',
        width: 200,
        render: (text, record) => <div ><Input onDoubleClick={() => this.doubleClick.bind(record, 'pusherDis')} disabled={record.pusherDis} maxLength={50} className={styles.tableInput} placeholder="请输入263账号前缀" defaultValue={text} onBlur={this.updateUserGroup.bind(undefined, record, 'pusher')} onPressEnter={this.updateUserGroup.bind(undefined, record, 'pusher')}/></div>
      },
      {
        title: '用户来源码',
        dataIndex: 'sourceCode',
        key: 'sourceCode',
        render: (text, record)=> <div onDoubleClick={() => this.doubleClick(record, 'sourceCodeDis')}><Input disabled={record.sourceCodeDis} maxLength={50} className={styles.tableInput} placeholder="推送模版落地页为尚小德时，此项必填" defaultValue={text} onBlur={this.updateUserGroup.bind(undefined, record, 'sourceCode')} onPressEnter={this.updateUserGroup.bind(undefined, record, 'sourceCode')}/></div>
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 200,
        render: (text, record) => (
          <div className={styles.options}>
            <a href="javascript:;" onClick={() => this.handleEditGroup(record)} disabled={record.taskStatus == 1 || record.taskStatus == 2 || record.taskStatus == 4}>编辑</a>
            <Popconfirm placement="top" title={contentDel} onConfirm={() => this.handleDelete(record)} okText="确认" cancelText="取消">
              <a href="javascript:;" disabled={record.taskStatus == 1 || record.taskStatus == 2}>删除</a>
              {/* <a href="javascript:;">删除</a> */}
            </Popconfirm>
            <a href="javascript:;" onClick={() => { this.downloadFn(record) }} disabled={record.taskStatus == 1 || record.taskStatus == 2 || record.taskStatus == 4}>导出</a>

          </div>
        ),
      },
    ];
    return columns || [];
  }
  render() {
    const data = this.props.list.list;
    const defaultValue = this.state.groupName;
    return (
      <>
        <Table
          rowKey={record => record.id}
          columns={this.columnsData()}
          dataSource={data}
          pagination={false}
          onClick={this.handleEdit}
          scroll={{ x: 1800}}
        />
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
              value={defaultValue}
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
