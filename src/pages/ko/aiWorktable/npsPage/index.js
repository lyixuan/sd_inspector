import React from 'react';
import AiForm from '@/pages/ko/aiWorktable/components/AiForm';
import AiList from '@/pages/ko/aiWorktable/components/AiList';
import BIButton from '@/ant_components/BIButton';
import styles from '../style.less';
import { connect } from 'dva/index';
import ReactTooltip from 'react-tooltip';

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
    this.state = { searchParams, currentPage};
  }

  columnsData = () => {
    const columns = [
      {
        title: '时间',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '自主评价',
        dataIndex: 'evaluate',
        key: 'evaluate',
        render: text => (
          <>
            <span data-tip={text} ref={ref => this.fooRef = ref}
                  onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>{text.substring(0, 2)}</span>
          </>
        ),
      },
      {
        title: '星级',
        dataIndex: 'starLevel',
        key: 'starLevel',
      },
      {
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
      },
      {
        title: '后端归属',
        dataIndex: 'org',
        key: 'org',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
        key: 'operator',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      {
        title: '原因分类',
        dataIndex: 'reason',
        key: 'reason',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <div>
            <a href="javascript:;" onClick={() => this.handleEdit(record)}>编辑</a>
          </div>
        ),
      },
    ];
    return columns || [];
  };
  handleMouseOver = (e) => {
    ReactTooltip.show(this.fooRef);
  };
  handleMouseOut = (e) => {
    ReactTooltip.hide(this.fooRef);
  };
  handleEdit = () => {

  };
  onSearchChange = (searchParams) => {
    this.setState({
      searchParams,
      currentPage: 1,
    }, () => this.queryData());
  };
  onPageChange = (currentPage) => {
    this.setState({
      currentPage,
    }, () => this.queryData());
  };
  queryData = () => {
    const { searchParams, currentPage } = this.state;
    this.props.dispatch({
      type: 'workTableModel/getTableList',
      payload: { params: { ...searchParams, currentPage, type: workType } },
    });
  };

  render() {
    const { searchParams, currentPage } = this.state;
    return (
      <div>
        <ReactTooltip delayHide={1000} className={styles.listReactTooltip} place="right"/>
        <AiForm {...this.props} workType={workType} searchParams={searchParams}
                onSearchChange={this.onSearchChange} ></AiForm>
        <AiList {...this.props} currentPage={currentPage} onPageChange={this.onPageChange}
                columnsData={this.columnsData}>
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
