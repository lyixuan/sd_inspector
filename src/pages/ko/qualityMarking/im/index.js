import React from 'react';
import { Tooltip, Row, Col } from 'antd';
// import router from 'umi/router';
import BIDialog from '@/components/BIDialog';
import { connect } from 'dva/index';
import {
  handleDefaultPickerValueMark,
  pathImUrl,
  getSubStringValue,
  jumpMarkingDetails,
  linkRoute, linkImgRouteBul,
  emptyValue, getArrLastValue
} from '@/pages/ko/utils/utils';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';
import AuthButton from '@/components/AuthButton';
import ModalTip from '../components/modalTip';
import MarkForm from '../components/form';
import MarkList from '../components/list';
import styles from '../style.less';


const markType = 1; //im bbs nps 对应的额type值为1， 2， 3


@connect(({ workTableModel, koPlan }) => ({
  workTableModel,
  currentPage: workTableModel.pageParams[markType],
  searchParams: workTableModel.searchParams[markType] || {},
  collegeList: workTableModel.collegeList,// bbs nps
  consultList: [{ id: emptyValue, name: '空', nodeList: [] }].concat(workTableModel.consultList),// im
  reasonList: workTableModel.reasonList,// im
  operatorList: workTableModel.operatorList,// im bbs nps
  idList: workTableModel.idList,
  evaluationList: workTableModel.evaluationList,
  currentServiceTime: koPlan.currentServiceTime
}))
class imPage extends React.Component {
  constructor(props) {
    super(props);
    const { currentPage, searchParams, currentServiceTime } = this.props;
    this.state = { searchParams: { choiceTime: handleDefaultPickerValueMark(2, currentServiceTime), robot: 0, ...searchParams }, currentPage };
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
        dataIndex: 'contentList',
        key: 'contentList',
        width: 130,
        className: styles.contentListWith,
        render: (list, r) => {
          const content = list.length > 0 ? <BIDialog content={r}></BIDialog> : r.content;
          const text = list.length > 0 ? list[0].content : '';
          return (
            <Tooltip overlayClassName={styles.listMarkingTooltip} placement="right" title={content}>
              <span className={`${styles.textEllipsis} ${styles.textEllipsisContent}`}>{text}</span>
            </Tooltip>
          );
        },
      },
      {
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
        render: (text, record) => <span onClick={() => jumpMarkingDetails(record.stuId, { target: 'im' })} className={`${styles.textEllipsis} ${styles.textname}`}>{text}</span>,
      },
      {
        title: '后端归属',
        dataIndex: 'org',
        key: 'org',
        render: text => <Tooltip overlayClassName={styles.listMarkingTooltipOthers} placement="right"
          title={text}><span className={`${styles.textEllipsis} ${styles.textorg}`}>{text}</span></Tooltip>,
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
        title: '咨询类型',
        dataIndex: 'consult',
        key: 'consult',
        render: text => getSubStringValue(text, 6),
      },
      {
        title: '原因分类',
        dataIndex: 'reason',
        key: 'reason',
        render: text => getSubStringValue(text, 6),
      },
    ];
    if (AuthButton.checkPathname('/qualityMarking/detail')) {
      columns.push({
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <div>
            <span style={{ color: '#52c9c2', cursor: 'pointer' }} onClick={() => this.handleEdit(record.id)}>编辑</span>
          </div>
        ),
      });
    }
    return columns || [];
  };
  handleEdit = (id) => {
    const { choiceTime, consultType = [], reasonType = [], ...others } = this.state.searchParams;
    jumpMarkingDetails(id, {
      type: markType,
      consultType: getArrLastValue(consultType),
      reasonType: getArrLastValue(reasonType),
      ...others
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
      payload: {
        params: {
          ...searchParams,
          page: currentPage,
          type: markType,
        }
      },
    });
  };
  changeOperatorId = (key, v) => {
    this.setState({
      searchParams: { ...this.state.searchParams, [key]: v }
    });
  };

  render() {
    const { searchParams, currentPage } = this.state;
    const { choiceTime, ...others } = searchParams;

    return (
      <div>
        <MarkForm {...this.props} markType={markType} searchParams={searchParams}
          onSearchChange={this.onSearchChange} changeOperatorId={this.changeOperatorId}></MarkForm>
        <MarkList {...this.props} currentPage={currentPage} onPageChange={this.onPageChange}
          columnsData={this.columnsData}>
          <ModalTip markType={markType} othersSearch={others}></ModalTip>
        </MarkList>
      </div>
    );
  }
}

export default imPage;
