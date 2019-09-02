import React from 'react';
import styles from './style.less';
import BITable from '@/ant_components/BITable';
import { connect } from 'dva/index';

@connect(({ workTableModel, loading }) => ({
  workList: workTableModel.workList,
  pageSize: workTableModel.pageSize,
  totalCount: workTableModel.totalCount,
  loading: loading.effects['workTableModel/getTableList'],
}))
class AiList extends React.Component {
  onChangeSize = (currentPage) => {
    const { onPageChange } = this.props;
    if (onPageChange) {
      onPageChange(currentPage);
    }
  };

  render() {
    const { pageSize = 15, totalCount, currentPage, loading, workList } = this.props;
    return (
      <div className={styles.tableContent}>
        <div className={styles.contentTop}>
          {this.props.children}
          <span className={styles.listTotal}>总数：{totalCount} 条</span>
        </div>
        <BITable 
            rowKey={record => record.id} 
            columns={this.props.columnsData()} 
            dataSource={workList}
            loading={loading}
            pagination={{
              onChange: this.onChangeSize,
              defaultPageSize: pageSize,
              current: currentPage,
              total: totalCount,
              showQuickJumper: true,
            }} 
          />
      </div>
    );
  }
}

export default AiList;
