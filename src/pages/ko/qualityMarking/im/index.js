import React from 'react';
import { Tooltip } from 'antd';
// import router from 'umi/router';
import { connect } from 'dva/index';
import { pathImUrl, getSubStringValue, jumpMarkingDetails } from '../../utils/utils';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';
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
              <p>{props.dataMark.stuName}</p>
            </div>
            <div className={styles.chatContent}>
              <span className={styles.triangle}>
                <em/>
              </span>
              {props.item.content}
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
            <div className={styles.chatContent}>
              <span className={styles.triangle}>
                <em/>
              </span>
              {props.item.content}
            </div>
            <div className={styles.avatar}>
              <img src={props.dataMark.teacherHeadUrl ? (pathImUrl + props.dataMark.teacherHeadUrl) : avatarTeacher}/>
              <p>{props.dataMark.teacherName}</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

@connect(({ workTableModel }) => ({
  workTableModel,
  currentPage: workTableModel.pageParams[markType],
  searchParams: workTableModel.searchParams[markType] || {},
  collegeList: workTableModel.collegeList,// bbs nps
  consultList: [{ id: 0, name: '空' }].concat(workTableModel.consultList),// im
  reasonList: workTableModel.reasonList,// im bbs nps
  idList: workTableModel.idList,
}))
class imPage extends React.Component {
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
        title: '内容',
        dataIndex: 'contentList',
        key: 'contentList',
        render: (list, r) => {
          const content = list.length > 0 ? <Layout dataMark={r}></Layout> : r.content;
          const text = list.length > 0 ? list[0].content : '';
          return (
            <Tooltip overlayClassName={styles.listTooltip} placement="right" title={content}>
              <span>{getSubStringValue(text)}</span>
            </Tooltip>
          );
        },
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
        render: text => <span>{getSubStringValue(text, 20)}</span>
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
        render: text => <span>{getSubStringValue(text, 6)}</span>
      },
      {
        title: '原因分类',
        dataIndex: 'reason',
        key: 'reason',
        render: text => <span>{getSubStringValue(text, 6)}</span>
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
    jumpMarkingDetails(id, markType);
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

export default imPage;
