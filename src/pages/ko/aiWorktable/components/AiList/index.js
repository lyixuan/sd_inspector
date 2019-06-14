import React from 'react';
import { Table, Spin } from 'antd';
import styles from './style.less';
import BIPagination from '@/ant_components/BIPagination';
import { connect } from 'dva/index';

@connect(({ workTableModel, loading }) => ({
  workList: workTableModel.workList,
  pageSize: workTableModel.pageSize,
  totalCount: workTableModel.totalCount,
  loading: loading.effects['workTableModel/getTableList'],
}))
class AiList extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeSize = (currentPage) => {
    const { onPageChange } = this.props;
    if (onPageChange) {
      onPageChange(currentPage);
    }
  };

  render() {
    const { pageSize, totalCount, currentPage, loading } = this.props;
    const workList = [
      {id: 1, evaluate: '1111'},
      {id: 2, evaluate: '是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，我是帖子详情，'},
      {id: 3, evaluate: 'pppppp'},
      {id: 4, evaluate: 'pppppp'},
      {id: 5, evaluate: 'pppppp'},
      {id: 6, evaluate: 'pppppp'},
      {id: 7, evaluate: 'pppppp'},
      {id: 8, evaluate: 'pppppp'},
    ]
    return (
      <div className={styles.tableContent}>
        <div className={styles.contentTop}>
          {this.props.children}
          <span className={styles.listTotal}>总数：{totalCount} 条</span>
        </div>
        <Spin spinning={loading}>
          <Table rowKey={record => record.id} columns={this.props.columnsData()} dataSource={workList}
                 pagination={false}/>
          <div className={styles.pagination}>
            <BIPagination
              showQuickJumper
              defaultPageSize={pageSize ? pageSize : 15}
              current={currentPage}
              onChange={this.onChangeSize}
              total={totalCount}
            />
          </div>
        </Spin>
      </div>
    );
  }
}

export default AiList;
