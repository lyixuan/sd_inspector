import React from 'react';
import { Tooltip } from 'antd';
import { connect } from 'dva/index';
import { getSubStringValue, jumpMarkingDetails } from '../../utils/utils';
import ModalTip from '../components/modalTip';
import MarkForm from '../components/form';
import MarkList from '../components/list';
import styles from '../style.less';
import { handleDefaultPickerValueMark } from '@/pages/ko/utils/utils';

const markType = 2; //im bbs nps 对应的type值为1， 2， 3
@connect(({ workTableModel }) => ({
  workTableModel,
  currentPage: workTableModel.pageParams[markType],
  searchParams: workTableModel.searchParams[markType] || {},
  collegeList: [{ id: 0, name: '空' }].concat(workTableModel.collegeList),
  consultList: workTableModel.consultList,
  reasonList: workTableModel.reasonList,
  idList: workTableModel.idList,
}))
class bbsPage extends React.Component {
  constructor(props) {
    super(props);
    const { currentPage, searchParams } = this.props;
    this.state = { searchParams: { choiceTime: handleDefaultPickerValueMark(), ...searchParams }, currentPage };
  }

  columnsData = () => {
    const columns = [
      {
        title: '时间',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        render: text => {
          const content = <div className={styles.behaviorOthers}>{text}</div>;
          return (
            <Tooltip overlayClassName="listMarkingTooltipOthers" placement="right" title={content}>
              <span>{getSubStringValue(text)}</span>
            </Tooltip>
          );
        },
      },
      {
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
        render: text => getSubStringValue(text, 3)
      },
      {
        title: '后端归属',
        dataIndex: 'org',
        key: 'org',
        render: text => <Tooltip overlayClassName="listMarkingTooltipOthers" placement="right" title={text}><span>{getSubStringValue(text, 6)}</span></Tooltip>
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
        render: text => getSubStringValue(text, 6)
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <div>
            <a href="javascript:;" onClick={() => this.handleEdit(record.id)}>编辑</a>
          </div>
        ),
      },
    ];
    return columns || [];
  };
  handleEdit = (id) => {
    // router.push({
    //   pathname: `/qualityMarking/detail/${id}/${markType}`,
    // });
    const { choiceTime, ...others } = this.state.searchParams;
    jumpMarkingDetails(id, { type: markType, ...others });
    // localStorage.removeItem('idList');
    // localStorage.setItem('idList', this.props.idList);
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
