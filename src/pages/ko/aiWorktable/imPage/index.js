import React from 'react';
import AiForm from '@/pages/ko/aiWorktable/components/AiForm';
import AiList from '@/pages/ko/aiWorktable/components/AiList';
import BIButton from '@/ant_components/BIButton';
import exportimg from '@/assets/ai/export.png';
import styles from '../style.less';
import { connect } from 'dva/index';
import ReactTooltip from 'react-tooltip';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';
import miniApp from '@/assets/miniApp.png';
import { STATIC_HOST } from '@/utils/constants';


const workType = 1; //im bbs nps 对应的额type值为1， 2， 3
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
    return <TeacherOrStudent item={props.li}/>;
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
              <span className={styles.dot}/>
            </div>
            <div className={styles.chatLeft}>
              <div className={styles.avatar}>
                <img src={avatarStudent}/>
                <p>{props.item.userName}</p>
              </div>
              <div className={`${styles.chatContent} ${styles.miniApp}`}>
                <img src={miniApp}/>
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
            <span className={styles.dot}/>
          </div>
          <div className={styles.chatLeft}>
            <div className={styles.avatar}>
              <img src={avatarStudent}/>
              <p>{props.item.userName}</p>
            </div>
            <div className={styles.chatContent}>
              <span className={styles.triangle}>
                <em/>
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
              <span className={styles.dot}/>
            </div>
            <div className={styles.chatRight}>
              <div className={`${styles.chatContent} ${styles.miniApp}`}>
                <img src={miniApp}/>
                {props.item.message}
              </div>
              <div className={styles.avatar}>
                <img src={avatarTeacher}/>
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
            <span className={styles.dot}/>
          </div>
          <div className={styles.chatRight}>
            <div className={styles.chatContent}>
              <span className={styles.triangle}>
                <em/>
              </span>
              {props.item.message}
            </div>
            <div className={styles.avatar}>
              <img src={avatarTeacher}/>
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
  currentPage: workTableModel.pageParams[workType],
  searchParams: workTableModel.searchParams[workType] || {},
}))
class imPage extends React.Component {
  constructor(props) {
    super(props);
    const { currentPage, searchParams,} = this.props;
    this.state = { searchParams, currentPage, contentList: [] };
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
          return (
            <span data-tip='' ref={ref => this.fooRef = ref} onMouseOver={this.handleMouseOver.bind(this, text)} onMouseOut={this.handleMouseOut}>wwwwww</span>
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
      contentList: text || []
    })
    ReactTooltip.show(this.fooRef);
  };
  handleMouseOut = (e) => {
    ReactTooltip.hide(this.fooRef);
  };
  handleEdit = () => {

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
      payload: { params: { ...searchParams, currentPage, type: workType } },
    });
  };
  getBlob(obj) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open('POS', obj.url, true);
      xhr.setContentType("application/vnd.ms-excel");
      xhr.setHeader("Content-Disposition", "attachment;filename=文件名");
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        }
      };
      xhr.send(obj.params);
    });
  }
  handleExportIm = (data) => {
    const name = `用户组${data.code}`;
    const url = `${STATIC_HOST}'workbench/export'`; // 创建下载的链接
    this.getBlob(url).then(blob => {
      this.saveAs(blob, name);
    });
    return;
  }

  render() {
    const { searchParams, currentPage, contentList } = this.state;
    return (
      <div>
        <ReactTooltip delayHide={1000} className={styles.listReactTooltip} place="right">
          {contentList.length > 0 && <Layout dataLists={contentList}></Layout>}
        </ReactTooltip>
        <AiForm {...this.props} workType={workType} searchParams={searchParams}
                onSearchChange={this.onSearchChange}></AiForm>
        <AiList {...this.props} currentPage={currentPage} onPageChange={this.onPageChange}
                columnsData={this.columnsData}>
          <BIButton onClick={this.handleExportIm} className={styles.exportBtn} size="large">
            <img src={exportimg}/> 导出
          </BIButton>
        </AiList>
      </div>
    );
  }
}

export default imPage;
