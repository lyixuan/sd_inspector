import React from 'react';
import MarkForm from '../components/form';
import MarkList from '../components/list';
import ModalTip from '../components/modalTip';
import BIButton from '@/ant_components/BIButton';
import router from 'umi/router';
import styles from '../style.less';
import { connect } from 'dva/index';
import ReactTooltip from 'react-tooltip';
import exportimg from '@/assets/ai/export.png';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';
import miniApp from '@/assets/miniApp.png';


const markType = 1; //im bbs nps 对应的额type值为1， 2， 3
const exportType = 11; // 导出类型：导出类型：11 - IM 21 - BBS 31 - NPS标签 32 - NPS自主评价
// 悬浮列表
function Layout(props) {
  const layout = <section>
    <ul className={styles.behavior}>
      {props.dataLists.map((item, index) => <ListItem li={item} key={index} />)}
    </ul>
  </section>;
  return layout;
}

//对话区域行
function ListItem(props) {
  if (!props.li) {
    return null;
  } else {
    return <TeacherOrStudent item={props.li} />;
  }
}

// 判断是老师还是学员
function TeacherOrStudent(props) {
  if (props.item.userType == 1) {
    if (props.item.appletFlag) {
      return (
        <li className={styles.step}>
          <div className={styles.time}>
            {props.item.consultTime ? props.item.consultTime : ''}
          </div>
          <div className={styles.content}>
            <div className={styles.bigDot}>
              <span className={styles.dot} />
            </div>
            <div className={styles.chatLeft}>
              <div className={styles.avatar}>
                <img src={avatarStudent} />
                <p>{props.item.userName}</p>
              </div>
              <div className={`${styles.chatContent} ${styles.miniApp}`}>
                <img src={miniApp} />
                {props.item.message}
              </div>
            </div>
          </div>
        </li>
      );
    }
    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.consultTime ? props.item.consultTime : ''}
        </div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot} />
          </div>
          <div className={styles.chatLeft}>
            <div className={styles.avatar}>
              <img src={avatarStudent} />
              <p>{props.item.userName}</p>
            </div>
            <div className={styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              {props.item.message}
            </div>
          </div>
        </div>
      </li>
    );
  } else {
    if (props.item.appletFlag) {
      return (
        <li className={styles.step}>
          <div className={styles.time}>
            {props.item.consultTime ? props.item.consultTime : ''}
          </div>
          <div className={styles.content}>
            <div className={styles.bigDot}>
              <span className={styles.dot} />
            </div>
            <div className={styles.chatRight}>
              <div className={`${styles.chatContent} ${styles.miniApp}`}>
                <img src={miniApp} />
                {props.item.message}
              </div>
              <div className={styles.avatar}>
                <img src={avatarTeacher} />
                <p>{props.item.userName}</p>
              </div>
            </div>
          </div>
        </li>
      );
    }

    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.consultTime ? props.item.consultTime : ''}
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
              {props.item.message}
            </div>
            <div className={styles.avatar}>
              <img src={avatarTeacher} />
              <p>{props.item.userName}</p>
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
}))
class imPage extends React.Component {
  constructor(props) {
    super(props);
    const { currentPage, searchParams, } = this.props;
    this.state = {
      searchParams,
      currentPage,
      contentList: [],
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
        render: text => {
          const content = Array.isArray(text) && text[0] ? text[0].message : '';
          const showText = content.length > 10 ? content.substring(0, 10) + '...' : content;
          return (
            <span data-tip='' ref={ref => this.fooRef = ref} onMouseOver={this.handleMouseOver.bind(this, text)}
              onMouseOut={this.handleMouseOut}>{showText}</span>
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

  handleMouseOver(text) {
    this.setState({
      contentList: text || [],
    });
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
    const { searchParams, currentPage, contentList, visible } = this.state;
    return (
      <div>
        <ReactTooltip delayHide={1000} className={styles.listReactTooltip} place="right">
          {contentList.length > 0 && <Layout dataLists={contentList}></Layout>}
        </ReactTooltip>
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
