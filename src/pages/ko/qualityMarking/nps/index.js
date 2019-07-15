import React from 'react';
import { Tooltip } from 'antd';
import { connect } from 'dva/index';
import { getSubStringValue, jumpMarkingDetails, handleDefaultPickerValueMark } from '../../utils/utils';
import AuthButton from '@/components/AuthButton';
import ModalTip from '../components/modalTip';
import MarkForm from '../components/form';
import MarkList from '../components/list';
import styles from '../style.less';
import shapecolor from '@/assets/ai/shapecolor.svg'
import shape from '@/assets/ai/shape.svg';

const markType = 3; //im bbs nps 对应的额type值为1， 2， 3
const shapeArr = Array.from(Array(5), (v,k) =>k);
@connect(({ workTableModel, koPlan }) => ({
  workTableModel,
  currentPage: workTableModel.pageParams[markType] || 1,
  searchParams: workTableModel.searchParams[markType] || {},
  collegeList: [{ id: 0, name: '空' }].concat(workTableModel.collegeList),
  consultList: workTableModel.consultList,
  reasonList: workTableModel.reasonList,
  evaluateList: workTableModel.evaluateList,
  idList: workTableModel.idList,
  currentServiceTime: koPlan.currentServiceTime
}))
class bbsPage extends React.Component {
  constructor(props) {
    super(props);
    const { currentPage, searchParams, currentServiceTime } = this.props;
    this.state = { searchParams: { choiceTime: handleDefaultPickerValueMark(2, currentServiceTime), ...searchParams }, currentPage };
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
          const content = <div className={styles.behaviorOthers}>{text}</div>;
          return (
            <>
              {text ? <Tooltip overlayClassName="listMarkingTooltipOthers" placement="right" title={content}>
                <span className={`${styles.textEllipsis} ${styles.textEllipsisContent}`}>{text}</span>
              </Tooltip> : <span className={`${styles.textEllipsis} ${styles.textEllipsisContent}`}>{text}</span>}
            </>
          );
        },
      },
      {
        title: '星级',
        dataIndex: 'starLevel',
        key: 'starLevel',
        render: text => {
          return (
            <>
              {shapeArr.map((item, index) => <img className={styles.shapeMargin} key={index} src={index < Number(text)  ?  shapecolor : shape}/>)}
            </>
          )
        }
      },
      {
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
        render: (text, record) => <span onClick={() => jumpMarkingDetails(record.stuId, { target: 'study' })} className={`${styles.textEllipsis} ${styles.textname}`}>{text}</span>
      },
      {
        title: '后端归属',
        dataIndex: 'org',
        key: 'org',
        render: text => <Tooltip overlayClassName="listMarkingTooltipOthers" placement="right"
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
        title: '原因分类',
        dataIndex: 'reason',
        key: 'reason',
        render: text => getSubStringValue(text, 6)
      },
    ];
    if (AuthButton.checkPathname('/qualityMarking/detail')) {
      columns.push({
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <div>
            <a href="javascript:;" onClick={() => this.handleEdit(record.id)}>编辑</a>
          </div>
        ),
      });
    }
    return columns || [];
  };
  handleEdit = (id) => {
    const { choiceTime, ...others } = this.state.searchParams;
    jumpMarkingDetails(id, { type: markType, ...others });
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
