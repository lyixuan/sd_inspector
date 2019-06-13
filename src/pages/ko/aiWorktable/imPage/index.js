import React from 'react';
import { Spin } from 'antd';
import AiForm from '@/pages/ko/aiWorktable/components/AiForm';
import AiList from '@/pages/ko/aiWorktable/components/AiList';
import BIButton from '@/ant_components/BIButton';
import exportimg from '@/assets/ai/export.png';
import styles from '../style.less';
import { connect } from 'dva/index';

const workType = 1; //im bbs nps 对应的额type值为1， 2， 3
@connect(({ workTableModel, loading }) => ({
  workTableModel,
  currentPage: workTableModel.pageParams[workType],
  searchParams: workTableModel.searchParams[workType] || {},
}))
class imPage extends React.Component {
  constructor(props) {
    super(props);
    const { currentPage, searchParams } = this.props;
    this.state = { searchParams, currentPage };
    console.log(this.props)
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
        title: '内容',
        dataIndex: 'groupName',
        key: 'groupName',
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
        title: '咨询类型',
        dataIndex: 'taskStatus',
        key: 'taskStatus',
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
          <BIButton className={styles.exportBtn} size="large">
            <img src={exportimg}/> 导出
          </BIButton>
        </AiList>
      </div>
    );
  }
}

export default imPage;
