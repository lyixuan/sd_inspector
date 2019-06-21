import React from 'react';
import MarkForm from '../components/form';
import MarkList from '../components/list';
import ModalTip from '../components/modalTip';
import BIButton from '@/ant_components/BIButton';
import router from 'umi/router';
import styles from '../style.less';
import { connect } from 'dva/index';
import exportimg from '@/assets/ai/export.png';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';
import { Tooltip } from 'antd';

const markType = 1; //im bbs nps 对应的额type值为1， 2， 3
const exportType = 11; // 导出类型：导出类型：11 - IM 21 - BBS 31 - NPS标签 32 - NPS自主评价
// 悬浮列表
function Layout(props) {
  const layout = <section>
    <ul className={styles.behavior}>
      {props.dataMark.contentList.map((item, index) => <ListItem item={item} dataMark={props.dataMark} key={index} />)}
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
  props.dataMark.teacherHeadUrl = props.dataMark.teacherHeadUrl || avatarTeacher;
  props.dataMark.stuHeadUrl = props.dataMark.stuHeadUrl || avatarStudent;
  if (props.item.type == 1) {
    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.time ? props.item.time : ''}
        </div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot} />
          </div>
          <div className={styles.chatLeft}>
            <div className={styles.avatar}>
              <img src={props.dataMark.stuHeadUrl} />
              <p>{props.dataMark.stuName}</p>
            </div>
            <div className={styles.chatContent}>
              <span className={styles.triangle}>
                <em />
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
            <span className={styles.dot} />
          </div>
          <div className={styles.chatRight}>
            <div className={styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              {props.item.content}
            </div>
            <div className={styles.avatar}>
              <img src={props.dataMark.teacherHeadUrl} />
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
    const { currentPage, searchParams, } = this.props;
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
        title: '内容',
        dataIndex: 'contentList',
        key: 'contentList',
        render: (list, r) => {
          const l = r.content ? r.content.length : 0;
          const content = list.length > 0 ? <Layout dataMark={r}></Layout> : r.content;
          return (
            <Tooltip mouseLeaveDelay={100} overlayClassName={styles.listTooltip} placement="right" title={content}>
              <span>{l > 20 ? r.content.substring(0, 20) : r.content}</span>
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
        render: text => {
          const l = text ? text.length : 0;
          return (
            <span>{l > 20 ? text.substring(0, 20) + '...' : ''}</span>
          )
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
        title: '咨询类型',
        dataIndex: 'consult',
        key: 'consult',
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
    localStorage.removeItem("idList")
    localStorage.setItem("idList", this.props.idList)
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
  handleExport = () => {// 导出类型：11 - IM21 - BBS31 - NPS标签 32 - NPS自主评价
    this.setState({ visible: true });
  };
  handleOk = () => {
    const { choiceTime, ...others } = this.state.searchParams;
    this.props.dispatch({
      type: 'workTableModel/exportExcelData',
      payload: {
        params: { ...others, type: exportType },
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
        <MarkForm {...this.props} markType={markType} searchParams={searchParams}
          onSearchChange={this.onSearchChange}></MarkForm>
        <MarkList {...this.props} currentPage={currentPage} onPageChange={this.onPageChange}
          columnsData={this.columnsData}>
          <BIButton onClick={this.handleExport} className={styles.exportBtn} size="large">
            <img src={exportimg} /> 导出
          </BIButton>
        </MarkList>
        <ModalTip visible={visible} handleOk={this.handleOk} handleCancel={this.handleCancel}></ModalTip>
      </div>
    );
  }
}

export default imPage;
