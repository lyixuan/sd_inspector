import React from 'react';
import { Tooltip } from 'antd';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import styles from './style.less';
import {
  pathImUrl,
  jumpMarkingDetails,
  getSubStringValue,
  linkRoute, linkImgRouteBul,
} from '@/pages/ko/utils/utils';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';
import constants from '@/utils/constants';
import { handleDataTrace } from '@/utils/utils';

// 跳转学院档案
const linkStuFiles = {
  37: 'study', // 有效直播
  38: 'study', // 有效重播
  40: 'draw', // 课后作业
  41: 'draw', // 智能推题
  33: 'bbs', // 主帖
  34: 'bbs', // 跟帖
  20: 'draw',// 工单初次减分
  21: 'draw',// 工单二次减分
  22: 'draw',// 工单三次减分
  24: 'draw',// 事件
  25: 'draw',// 班投
  26: 'draw',// 退费
  27: 'draw',// 投诉
  47: 'draw',// 退挽
  12: 'study',// 开班电话
  13: 'draw', // 随堂考
  15: 'im',// 未回复会话
  16: 'im',// 不满意会话
  17: 'im',// 不及时消息
}
const linkStuName = {
  37: '有效直播',
  38: '有效重播',
  40: '课后作业',
  41: '智能推题',
  33: '主帖',
  34: '跟帖',
  20: '工单初次减分',
  21: '工单二次减分',
  22: '工单三次减分',
  24: '事件',
  25: '班投',
  26: '退费',
  27: '投诉',
  47: '退挽', 
  12: '开班电话',
  13: '随堂考', 
  15: '未回复会话',
  16: '不满意会话',
  17: '不及时消息',
}
function Layout(props) {
  const layout = <section>
    <ul className={styles.behavior}>
      {props.dataMark.contentList.map((item, index) => <ListItem item={item} dataMark={props.dataMark} key={index} />)}
    </ul>
  </section>;
  return layout;
}

const appealObj = ['', '质检', '底线', 'IM', '工单', '优新', '创收',];
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
            <span className={styles.dot} />
          </div>
          <div className={styles.chatLeft}>
            <div className={styles.avatar}>
              <img src={props.dataMark.stuHeadUrl ? (pathImUrl + props.dataMark.stuHeadUrl) : avatarStudent} />
              <p>{getSubStringValue(props.dataMark.stuName, 3)}</p>
            </div>
            <div className={linkImgRouteBul(props.item.content) ? styles.chatContentImg : styles.chatContent}>
              <span className={styles.triangle}>
                <em />
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
            <span className={styles.dot} />
          </div>
          <div className={styles.chatRight}>
            <div className={linkImgRouteBul(props.item.content) ? styles.chatContentImg : styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              {/*{props.item.content}*/}
              <span dangerouslySetInnerHTML={{ __html: linkRoute(props.item.content, styles.linkRoute) }}></span>
            </div>
            <div className={styles.avatar}>
              <img src={props.dataMark.teacherHeadUrl ? (pathImUrl + props.dataMark.teacherHeadUrl) : avatarTeacher} />
              <p>{getSubStringValue(props.dataMark.teacherName, 3)}</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
}


@connect(({ loading }) => ({
  loading: loading.effects['xdCreditModal/getDimensionDetail'],
  loadingAppeal: loading.effects['xdCreditModal/getDimensionDetail'],
}))
class CreditImDetials extends React.Component {
  columns = () => {

    const { detailsData } = this.props;
    const { titleFour, titleFive } = detailsData;
    const columns = [
      {
        title: '序号',
        dataIndex: 'numOrder',
        key: 'numOrder',
        render: (text, r, i) => i + 1
      }, {
        title: detailsData.titleOne,
        dataIndex: 'valOne',
        key: 'valOne',
      }, {
        title: detailsData.titleTwo,
        dataIndex: 'valTwo',
        key: 'valTwo',
        render: (text, record) => {
          const target = linkStuFiles[this.props.dementionId];
          if (detailsData.titleTwo === '学员姓名' && record.stuId && target)  {
            return <span onClick={() => this.handleRouter(record.stuId, target)} className={styles.linkRecord}>{text}</span>
          } else {
            return text
          }
        }
      }, {
        title: detailsData.titleThree,
        dataIndex: 'valThree',
        key: 'valThree',
        render: (text, record) => {
          const target = linkStuFiles[this.props.dementionId];
          if (detailsData.titleThree === '学员姓名' && record.stuId && target)  {
            return <span onClick={() => this.handleRouter(record.stuId, target)} className={styles.linkRecord}>{text}</span>
          } else {
            return text
          }
        }
      }, {
        title: titleFour,
        dataIndex: 'valFour',
        key: 'valFour',
        render: (text, r) => {
          const target = linkStuFiles[this.props.dementionId];
          if (titleFour === '发帖人姓名' && r.stuId  && target)  {
            return <span onClick={() => this.handleRouter(r.stuId, target)} className={styles.linkRecord}>{text}</span>
          } else if (titleFour === '操作') {
            return (
              <Tooltip overlayClassName={styles.listMarkingTooltip2} placement="top" title={text}>
                <span style={{ color: "#00CCC3" }}>查看</span>
              </Tooltip>
            );
          } else {
            return <span>{text}</span>
          }
        }
      },
    ];
    if (titleFive) {
      columns.push({
        title: titleFive,
        dataIndex: 'action',
        key: 'action',
        render: (list, r) => {
          return (
            <>
              {this.getAactionContent(titleFive, r)}
            </>
          );
        }
      })
    }
    return columns || [];
  };
  getAactionContent = (titleFive, r) => {
    const content = r.contentList ? <Layout dataMark={r}></Layout> : r.content;
    const shensu = <span onClick={() => this.getAppeal(r)} style={{ color: "#00CCC3", cursor: 'pointer', marginLeft: titleFive === '操作' ? '8px' : '0px' }}>申诉</span>;
    const check = <Tooltip overlayClassName={styles.listMarkingTooltip} placement="right" title={content}>
      <span style={{ color: "#00CCC3" }}>查看</span>
    </Tooltip>;
    if (titleFive === '质检申诉') {
      return <span 
      style={{ 
        color: "#00CCC3", 
        cursor: 'pointer', 
      }}
      onClick={() => this.getAppeal(r)} >
        {(r.valFour === '待申诉' || r.valFour === '申诉失败') ? '申诉' : '查看'}
      </span>
    } else if (titleFive === '操作') {
      return <>{shensu}{check}</>;
    } else if (titleFive === '查看') {
      return check;
    } else if (titleFive === '申诉' || titleFive === '质检申诉') {
      return shensu;
    }
  }
  setRowClassName = (r, c, b) => {
    if (this.props.dementionId === r.id) {
      return styles.selectedRow;
    } else if (r.level === 4 && r.num) {
      return styles.clickRow;
    }
    return styles['rowBg' + b]
  }
  onChangeSize = (currentPage) => {
    const { onPageChange } = this.props;
    if (onPageChange) {
      onPageChange(currentPage);
    }
  };
  getAppeal = (r) => {
    const { dimensionType, appealNo } = r;
    const params = { dimensionType };
    if (dimensionType === 1) {
      params.qualityNum = appealNo;
    } else if (dimensionType === 2) {
      params.bottomLineNum = appealNo;
      params.bottomLineType = r.bottomLineType;
    } else {
      params.id = appealNo;
    }
    this.props.dispatch({
      type: 'xdCreditModal/getAppealType',
      payload: { params },
      callback: res => {
        const { type } = res;
        if (dimensionType === 1) { // 质检
          const { startTime, endTime } = this.props.timeDate;
          window.open(`/inspector/qualityAppeal/qualityAppeal?p=${JSON.stringify({ "tabType": type + '', type,  qualityNum: appealNo, reduceScoreBeginDate: startTime, reduceScoreEndDate: endTime})}`);
        } else { // 其它
          const dimensionData = constants.DIMENSION_TYPE.find(op => op.name === appealObj[dimensionType]);
          const params = { "page": 1, "pageSize": 30, "dimensionType": dimensionData ? dimensionData.id : constants.DIMENSION_TYPE[0].id };
          if (type === 0) { // 未申诉
            params.creditBeginDate = r.bizDate;
            params.creditEndDate = r.bizDate;
            params.stuId = r.stuId;
            window.open(`/inspector/scoreAppeal/awaitAppeal?params=${JSON.stringify(params)}`);

          } else if (type === 1) { // 其它状态
            params.appealOrderNum = res.appealNum;
            window.open(`/inspector/scoreAppeal/onAppeal?params=${JSON.stringify(params)}`);
          } else if (type === 2) {
            params.appealOrderNum = res.appealNum;
            window.open(`/inspector/scoreAppeal/finishAppeal?params=${JSON.stringify(params)}`);
          }
        }
      }
    });
  }
  handleRouter = (stuId, target) => {
    const dimensionName = linkStuName[this.props.dementionId];
    if (stuId) {
      jumpMarkingDetails(stuId, { target })
    }
    handleDataTrace({ "widgetName": `${dimensionName}进学员档案`, "traceName": `小德学分/学分/${dimensionName}进学员档案` })
  }
  render() {
    const { detailsData, pageSize = 15, currentPage } = this.props;
    const dataSource = detailsData.data || [];
    const totalCount = detailsData.total || 0;
    return (
        <BITable
            columns={this.columns()}
            dataSource={dataSource}
            rowClassName={this.setRowClassName}
            pagination={{
              onChange: this.onChangeSize,
              defaultPageSize: pageSize,
              current: currentPage,
              total: totalCount,
              hideOnSinglePage: true,
              showQuickJumper: true,
            }}
            rowKey={(record, index) => record.id + '' + index}
            loading={this.props.loading}
            smalled={true}
          />
    );
  }
}

export default CreditImDetials;
