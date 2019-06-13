import React from 'react';
import { Spin } from 'antd';
import AiForm from '@/pages/ko/aiWorktable/components/AiForm';
import AiList from '@/pages/ko/aiWorktable/components/AiList';
import BIButton from '@/ant_components/BIButton';
import styles from '../style.less';
import { connect } from 'dva/index';

const workType = 3; //im bbs nps 对应的额type值为1， 2， 3
@connect(({ workTableModel, loading }) => ({
  workTableModel,
  currentPage: workTableModel.pageParams[workType] || 1,
  searchParams: workTableModel.searchParams[workType] || {},
}))
class bbsPage extends React.Component {
  constructor(props) {
    super(props);
    const { currentPage, searchParams } = this.props;
    this.state = { searchParams, currentPage };
  }

  componentDidMount() {
    this.queryData();
  }

  columnsData = () => {
    const columns = [
      {
        title: '时间',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '自主评价',
        dataIndex: 'groupName',
        key: 'groupName',
      },
      {
        title: '星级',
        dataIndex: 'star',
        key: 'star',
      },
      {
        title: '学员姓名',
        dataIndex: 'userTag',
        key: 'userTag',
      },
      {
        title: '后端归属',
        dataIndex: 'us1erTag',
        key: 'us1erTag',
      },
      {
        title: '操作人',
        dataIndex: 'userCount',
        key: 'userCount',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      {
        title: '原因分类',
        dataIndex: '1taskStatus',
        key: '1taskStatus',
      },
      {
        title: '操作',
        key: 'action',
      },
    ];
    return columns || [];
  };
  onSearchChange = (searchParams) => {
    this.setState({
      searchParams,
    }, this.queryData());
  }
  onPageChange = (currentPage) => {
    this.setState({
      currentPage,
    }, this.queryData());
  }
  queryData = () => {
    const { searchParams, currentPage} = this.state;
    this.props.dispatch({
      type: 'workTableModel/getTableList',
      payload: { params: {...searchParams, currentPage, type: workType} },
    });
  }

  render() {
    const { searchParams, currentPage } = this.state;
    return (
      <div>
        <AiForm {...this.props} workType={workType} searchParams={searchParams} onSearchChange={this.onSearchChange}></AiForm>

        <AiList {...this.props} currentPage={currentPage} onPageChange={this.onPageChange} columnsData={this.columnsData}>
          <div>
            <BIButton className={styles.exportBtn}>导出标签</BIButton>
            <BIButton className={styles.exportEvaluate}>导出自主评价</BIButton>
          </div>
        </AiList>
      </div>
    );
  }
}

export default bbsPage;
