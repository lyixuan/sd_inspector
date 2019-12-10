import React from 'react';
import { Tooltip, Row, Col } from 'antd';
// import router from 'umi/router';
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
// 悬浮列表
function Layout(props) {
  const layout = <section>
    <ul className={styles.behavior}>
      {props.dataMark.contentList.map((item, index) => <ListItem item={item} dataMark={props.dataMark} key={index}/>)}
    </ul>
  </section>;
  return layout;
}

//对话区域行
function ListItem(props) {
  if (!props.item) {
    return null;
  } else {
    return <TeacherOrStudent {...props} />;
  }
}

// 判断是老师还是学员
function TeacherOrStudent(props) {
  if (props.item.type == 1) {
    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.time ? props.item.time : ''}
        </div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot}/>
          </div>
          <div className={styles.chatLeft}>
            <div className={styles.avatar}>
              <img src={props.dataMark.stuHeadUrl ? (pathImUrl + props.dataMark.stuHeadUrl) : avatarStudent}/>
              <p>{getSubStringValue(props.dataMark.stuName, 3)}</p>
            </div>
            <div className={linkImgRouteBul(props.item.content) ? styles.chatContentImg : styles.chatContent}>
              <span className={styles.triangle}>
                <em/>
              </span>
              {/*{props.item.content}*/}
              <span dangerouslySetInnerHTML={{ __html: linkRoute(props.item.content, styles.linkRoute) }}></span>
            </div>
          </div>
        </div>
      </li>
    );
  } else {
    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.time ? props.item.time : ''}
        </div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot}/>
          </div>
          <div className={styles.chatRight}>
            <div className={linkImgRouteBul(props.item.content) ? styles.chatContentImg : styles.chatContent}>
              <span className={styles.triangle}>
                <em/>
              </span>
              {/*{props.item.content}*/}
              <span dangerouslySetInnerHTML={{ __html: linkRoute(props.item.content, styles.linkRoute) }}></span>
            </div>
            <div className={styles.avatar}>
              <img src={props.dataMark.teacherHeadUrl ? (pathImUrl + props.dataMark.teacherHeadUrl) : avatarTeacher}/>
              <p>{getSubStringValue(props.dataMark.teacherName, 3)}</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
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
          const content = list.length > 0 ? <Layout dataMark={r}></Layout> : r.content;
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
            <span style={{ color: '#52c9c2', cursor: 'pointer'}} onClick={() => this.handleEdit(record.id)}>编辑</span>
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
      payload: { params: { 
        ...searchParams, 
        page: currentPage, 
        type: markType,
       } },
    });
  };
  changeOperatorId = (key, v) => {
    this.setState({
      searchParams: {...this.state.searchParams, [key]: v}
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
