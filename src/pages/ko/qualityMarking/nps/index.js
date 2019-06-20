import React from 'react';
import MarkForm from '../components/form';
import MarkList from '../components/list';
import ModalTip from '../components/modalTip';
import BIButton from '@/ant_components/BIButton';
import styles from '../style.less';
import { connect } from 'dva/index';
import ReactTooltip from 'react-tooltip';
import router from 'umi/router';

const markType = 3; //im bbs nps 对应的额type值为1， 2， 3
let exportType = ''; // 导出类型：11 - IM 21 - BBS 31 - NPS标签 32 - NPS自主评价
@connect(({ workTableModel, loading }) => ({
  workTableModel,
  currentPage: workTableModel.pageParams[markType] || 1,
  searchParams: workTableModel.searchParams[markType] || {},
  collegeList: [{id: 0, name: '空'}].concat(workTableModel.collegeList),
  consultList: workTableModel.consultList,
  reasonList: workTableModel.reasonList,
  evaluateList: workTableModel.evaluateList,
}))
class bbsPage extends React.Component {
  constructor(props) {
    super(props);
    const { currentPage, searchParams } = this.props;
    this.state = {
      searchParams,
      currentPage,
      visible: false, // 弹框是否显示标志
    };
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
  handleEdit = (record) => {
    router.push({
      pathname: '/qualityMarking/detail',
      query: {
        id: record.id,
        type: markType,
      }
    });
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
      payload: { params: { ...searchParams, currentPage, type: markType } },
    });
  };
  handleExport(type) {
    exportType = type;
    this.setState({ visible: true });
  };
  handleOk = () => {
    alert(exportType)
    const { choiceTime, ...others } = this.state.searchParams;
    this.props.dispatch({
      type: 'workTableModel/exportExcelData',
      payload: {
        params: {
          data: { ...others, type: exportType },
          headers: {
            'Content-Type': 'application/vnd.ms-excel',
          },
        },
      },
      callback: (res) => {
        this.handleCancel();
      },
    });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const { searchParams, currentPage, visible } = this.state;
    return (
      <div>
        <ReactTooltip delayHide={1000} className={styles.listReactTooltip} place="right"/>
        <MarkForm {...this.props} markType={markType} searchParams={searchParams}
                onSearchChange={this.onSearchChange} ></MarkForm>
        <MarkList {...this.props} currentPage={currentPage} onPageChange={this.onPageChange}
                columnsData={this.columnsData}>
          <div>
            <BIButton onClick={() => this.handleExport(31)} className={styles.exportBtn}>导出标签</BIButton>
            <BIButton onClick={() => this.handleExport(32)} className={styles.exportEvaluate}>导出自主评价</BIButton>
          </div>
        </MarkList>
        <ModalTip visible={visible} handleOk={this.handleOk} handleCancel={this.handleCancel}></ModalTip>
      </div>
    );
  }
}

export default bbsPage;
