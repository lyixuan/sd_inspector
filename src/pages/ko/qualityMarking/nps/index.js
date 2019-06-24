import React from 'react';
import MarkForm from '../components/form';
import MarkList from '../components/list';
import ModalTip from '../components/modalTip';
import styles from '../style.less';
import { connect } from 'dva/index';
import router from 'umi/router';
import { Tooltip } from 'antd';

const markType = 3; //im bbs nps 对应的额type值为1， 2， 3
@connect(({ workTableModel }) => ({
  workTableModel,
  currentPage: workTableModel.pageParams[markType] || 1,
  searchParams: workTableModel.searchParams[markType] || {},
  collegeList: [{ id: 0, name: '空' }].concat(workTableModel.collegeList),
  consultList: workTableModel.consultList,
  reasonList: workTableModel.reasonList,
  evaluateList: workTableModel.evaluateList,
  idList: workTableModel.idList,
}))
class bbsPage extends React.Component {
  constructor(props) {
    super(props);
    const { currentPage, searchParams } = this.props;
    this.state = { searchParams, currentPage };
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
        dataIndex: 'content',
        key: 'content',
        render: text => {
          const l = text ? text.length : 0;
          return (
            <>
              <Tooltip overlayClassName={styles.listTooltip} placement="right" title={text}>
                <span>{l > 10 ? text.substring(0, 10) + '...' : text}</span>
              </Tooltip>
            </>
          );
        },
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
        render: text => {
          const l = text ? text.length : 0;
          return (
            <span>{l > 20 ? text.substring(0, 20) + '...' : text}</span>
          );
        },
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
  handleEdit = (record) => {
    router.push({
      pathname: `/qualityMarking/detail/${record.id}/${markType}`,
    });
    localStorage.removeItem('idList');
    localStorage.setItem('idList', this.props.idList);
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
      payload: { params: { ...searchParams, page: currentPage, type: markType } },
    });
  };

  render() {
    const { searchParams, currentPage } = this.state;
    const { choiceTime, ...others } = searchParams;

    return (
      <div>
        <MarkForm {...this.props} markType={markType} searchParams={searchParams}
                  onSearchChange={this.onSearchChange}></MarkForm>
        <MarkList {...this.props} currentPage={currentPage} onPageChange={this.onPageChange}
                  columnsData={this.columnsData}>
          <ModalTip markType={markType} othersSearch={others}></ModalTip>
        </MarkList>
      </div>
    );
  }
}

export default bbsPage;
