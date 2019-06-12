import React from 'react';
import { Table } from 'antd';
import styles from './style.less'
import BIPagination from '@/ant_components/BIPagination';
import { connect } from 'dva/index';

@connect(({workTableModel}) => ({
  pageParams: workTableModel.pageParams,
  workList: workTableModel.workList
}))
class AiList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
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
    const { workList, pageParams } = this.props;
    return (
      <>
        <Table rowKey={record => record.id} columns={this.props.columnsData()} dataSource={workList} pagination={false}/>
        <div className={styles.pagination}>
          <BIPagination
            showQuickJumper
            defaultPageSize={pageParams.pageSize}
            current={pageParams.currentPage}
            onChange={this.onSizeChange}
            total={workList.length}
          />
        </div>
      </>
    );
  }
}

export default AiList;
