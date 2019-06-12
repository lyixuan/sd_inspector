import React from 'react';
import { Table } from 'antd';
import { thousandsFormat } from '@/utils/utils';
import styles from './style.less'
import BIPagination from '@/ant_components/BIPagination';

class AiList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      userGroupName: '',
      pageSize: 15,
      page: 1
    }
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
      },
      {
        title: '学员标签',
        dataIndex: 'userTag',
        key: 'userTag',
      },
      {
        title: '学员数',
        dataIndex: 'userCount',
        key: 'userCount',
        render: (text, record) => (
          <span>{thousandsFormat(text)}</span>
        )
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
      },
      {
        title: '操作',
        key: 'action',
      },
    ];
    return columns || [];
  }
  onSizeChange = (page) => {
    return
    this.setState({
      page: page
    })
    let params = {
      page: page,
      pageSize: this.state.pageSize
    }
    this.getInitData(params)
  }
  render() {
    const data=[];
    return (
      <>
        <Table rowKey={record => record.id} columns={this.columnsData()} dataSource={data} pagination={false}/>
        <div className={styles.pagination}>
          <BIPagination
            showQuickJumper
            defaultPageSize={this.state.pageSize}
            current={this.state.page}
            onChange={this.onSizeChange}
            total={100}
          />
        </div>
      </>
    );
  }
}

export default AiList;
