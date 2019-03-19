import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import {Popconfirm} from 'antd';
import BITable from '@/ant_components/BITable';
import BIButton from '@/ant_components/BIButton';

import SelfPagination from '../../components/Pagination';
import { STATIC_HOST } from '@/utils/constants'
import { BiFilter } from '@/utils/utils';
import styles from './style.less'

@connect(({ detail, loading }) => ({
  detail,
  loading: loading.models.detail,
}))
class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 10
    };
  }
  componentDidMount() {
    this.getData(this.state);
  }
  // 获取列表数据
  getData = params => {
    this.props.dispatch({
      type: 'detail/getTaskPage',
      payload: params,
    });
  };
  // 删除任务
  deleteFn = data => {
    this.props.dispatch({
      type: 'detail/deleteTask',
      payload: { delParam: { id: data.id }, listParam: this.state },
    });
  };
  // 重新加载任务
  reloadFn = data => {
    this.props.dispatch({
      type: 'detail/reloadTask',
      payload: { id: data.id },
    });
  };
  // 下载任务
  downloadFn = data => {
    const a = document.createElement("a");
    a.href = `${STATIC_HOST}${data.zipPath}`;
    // if (filename === 'zip') {
    //   a.download = `${data.taskName}.zip`;
    //   // console.log(a.download)
    // } else {
    //   a.download = `${formatDate(data.createTime)}明细数据.xlsx`;
    //   // console.log(data.createTime)
    // }
    a.click();
  };
  // 点击某一页函数
  changePage = (page, size) => {
    this.getData({
      pageSize: size,
      page,
    });
    this.setState({
      page: page,
    });
  };

  // 点击显示每页多少条数据函数
  onShowSizeChange = (current, pageSize) => {
    this.changePage(current, pageSize);
  };

  // 刷新
  redo = () => {
    this.getData(this.state);
  };
  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        title: '创建人',
        dataIndex: 'creator',
      },
      {
        title: '任务名称',
        dataIndex: 'taskName',
      },
      {
        title: '查询条件',
        dataIndex: 'queryCondition',
      },
      {
        title: '任务状态',
        dataIndex: 'taskStatus',
        render: (text, record) => {
          return (
            <>
              {
                BiFilter('TASK_STATES').map(item => {
                  if (text === item.id) {
                    return (
                      <div key={record.key}>
                        <span style={{ color: item.color, marginRight: '6px' }}>{item.name}</span>
                        {text === 4 ? <Icon type="reload" onClick={() => { this.reloadFn(record) }} /> : null}
                      </div>
                    )
                  }
                  return null
                })
              }
            </>
          );
        },
      },
      {
        title: '学员订单数',
        dataIndex: 'orderCount',
        render: (text, record) => {
          return (
            <>
              {record.taskStatus === 3 ? <span>{text} </span> : '--'}
            </>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (text, record) => {
          return (
            <>
              {record.taskStatus === 3 ? <span style={{color:'#52C9C2',marginRight: '8px',cursor:'pointer'}} onClick={() => { this.downloadFn(record) }}>下载</span> : <span style={{ marginRight: '35px' }} />}
              <Popconfirm title='确定删除该任务么' onConfirm={() => this.deleteFn(record)} okText="确定" cancelText="取消">
                <span style={{color:'#52C9C2',marginRight: '8px',cursor:'pointer'}}>删除</span>
              </Popconfirm>
            </>
          );
        },
      },
    ];
    const { tableList, total } = this.props.detail;
    const { page } = this.state;
    return (
      <>
        <div className={styles.tableBox}>
          <div><BIButton type="primary" onClick={this.redo}>刷新</BIButton></div>
          <br/>
          <BITable dataSource={tableList} pagination={false} columns={columns}  loading={this.props.loading} />
          <br/>
            <SelfPagination
              onChange={(current, pageSize) => {
                this.changePage(current, pageSize);
              }}
              onShowSizeChange={(current, pageSize) => {
                this.onShowSizeChange(current, pageSize);
              }}
              defaultCurrent={page}
              total={total}
            />
        </div>
      </>
    );
  }
}

export default Tasks;
