import React from 'react';
import { Tooltip } from 'antd';
import { connect } from 'dva/index';
import { Link } from 'dva/router';
import {
  getSubStringValue,
  jumpMarkingDetails,
  handleDefaultPickerValueMark,
  getArrLastValue,
  emptyValue
} from '@/pages/ko/utils/utils';
import AuthButton from '@/components/AuthButton';
import ModalTip from '../components/modalTip';
import MarkForm from '../components/form';
import MarkList from '../components/list';
import styles from '../style.less';
import shapecolor from '@/assets/ai/shapecolor.svg'
import shape from '@/assets/ai/shape.svg';

const markType = 3; //im bbs nps 对应的额type值为1， 2， 3
const shapeArr = Array.from(Array(5), (v, k) => k);
@connect(({ workTableModel, koPlan }) => ({
  workTableModel,
  currentPage: workTableModel.pageParams[markType] || 1,
  searchParams: workTableModel.searchParams[markType] || {},
  collegeList: [{ id: 0, name: '空', nodeList: null }].concat(workTableModel.collegeList),
  consultList: [{ id: emptyValue, name: '空', nodeList: null }].concat(workTableModel.consultList),// NPS
  reasonList: workTableModel.reasonList,
  evaluateList: workTableModel.evaluateList,
  idList: workTableModel.idList,
  operatorList: workTableModel.operatorList,// im bbs nps
  currentServiceTime: koPlan.currentServiceTime,
  evaluationList: workTableModel.evaluationList,
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
              {text ? <Tooltip overlayClassName={styles.listMarkingTooltipOthers} placement="right" title={content}>
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
              {shapeArr.map((item, index) => <img className={styles.shapeMargin} key={index} src={index < Number(text) ? shapecolor : shape} />)}
            </>
          )
        }
      },
      {
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
        render: (text, record) => {
          return <Link
            className={`${styles.textEllipsis} ${styles.textname}`}
            rel="noopener noreferer"
            to={`/ko/behaviorPath?params=${JSON.stringify({ userId: record.stuId, target: 'study' })}`}
            target='_blank'>
            {text}
          </Link>
        }
        // render: (text, record) => <span onClick={() => jumpMarkingDetails(record.stuId, { target: 'study' })} className={`${styles.textEllipsis} ${styles.textname}`}>{text}</span>
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
        render: text => getSubStringValue(text, 6)
      },
    ];
    if (AuthButton.checkPathname('/qualityMarking/detail')) {
      columns.push({
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const params = this.handleParams(record.id)
          return <div>
            <Link
              className={styles.textname}
              rel="noopener noreferer"
              to={`/qualityMarking/detail?params=${JSON.stringify(params)}`}
              target='_blank'>
              编辑
            </Link>
          </div>
        }
        // render: (text, record) => (
        //   <div>
        //     <span className={styles.textname} onClick={() => this.handleEdit(record.id)}>编辑</span>
        //   </div>
        // ),
      });
    }
    return columns || [];
  };
  handleEdit = (id) => {
    const { choiceTime, reasonType = [], ...others } = this.state.searchParams;
    jumpMarkingDetails(id, {
      type: markType,
      reasonType: getArrLastValue(reasonType),
      ...others
    });
  };
  handleParams = (id) => {
    const { choiceTime, reasonType = [], ...others } = this.state.searchParams;
    return {
      id,
      type: {
        type: markType,
        reasonType: getArrLastValue(reasonType),
        ...others
      }
    }
  }
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

export default bbsPage;
