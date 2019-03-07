import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import Popconfirm from 'antd/lib/popconfirm';
import Table from 'antd/lib/table';
import Breadcrumb from 'antd/lib/breadcrumb';
import Link from 'umi/link';
import SelfPagination from '../../components/Pagination';
import { STATIC_HOST } from '@/utils/constants'
import { BiFilter, formatDate } from '@/utils/utils';
import styles from '../style.less'

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
    const arr = data.zipPath.split('.');
    const filename = arr[arr.length - 1];
    const a = document.createElement("a");
    a.href = `${STATIC_HOST}${data.zipPath}`;
    if (filename === 'zip') {
      a.download = `${data.taskName}.zip`;
      // console.log(a.download)
    } else {
      a.download = `${formatDate(data.createTime)}明细数据.xlsx`;
      // console.log(data.createTime)
    }
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
        title: '学院订单数',
        dataIndex: 'orderCount',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (text, record) => {
          return (
            <>
              <Icon type="download" onClick={() => { this.downloadFn(record) }} style={{ marginRight: '8px' }} />
              <Popconfirm title='确定删除该任务么' onConfirm={() => this.deleteFn(record)} okText="确定" cancelText="取消">
                <Icon type="delete" />
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
        <div className={styles.breadcrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>当前位置:</Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/smartPlatform/details">明细数据查询</Link></Breadcrumb.Item>
            <Breadcrumb.Item>任务列表</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.tableBox}>
          <div className={styles.tableHead}>
            <span className={styles.tableHeadLeft}>任务列表</span>
          </div>
          <Table dataSource={tableList} pagination={false} columns={columns} bordered loading={this.props.loading} />
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
