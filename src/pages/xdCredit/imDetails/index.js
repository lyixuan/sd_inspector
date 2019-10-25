import React from 'react';
import { Tooltip } from 'antd';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import BIClassifyTable from '@/components/BIClassifyTable';
import creditImg from '@/assets/xdcredit/credit.gif';
import router from 'umi/router';
import styles from './style.less';
import {
  pathImUrl,
  getSubStringValue,
  linkRoute, linkImgRouteBul,
} from '@/pages/ko/utils/utils';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';
import constants from '@/utils/constants';
const colors = ['rgba(255, 89, 89, 1)', 'rgba(255, 89, 89, 0.8)', 'rgba(255, 89, 89, .6)', 'rgba(255, 89, 89, .5)', 'rgba(255, 89, 89, .4)', 'rgba(255, 89, 89, .3)']



function Layout(props) {
  const layout = <section>
    <ul className={styles.behavior}>
      {props.dataMark.content.map((item, index) => <ListItem item={item} dataMark={props.dataMark} key={index} />)}
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

@connect(({ loading, xdCreditModal }) => ({
  xdCreditModal,
  loading: loading.effects['xdCreditModal/reasonList']
}))
class CreditImDetials extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isChecked: true
    }
  }
  columns = () => {
    const columns = [
      {
        title: '时间',
        dataIndex: 'bizDate',
        key: 'bizDate',
        width: 100
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        render: (text, record) => {
          const content = text ? <Layout dataMark={record}></Layout> : record.content;
          return (
            <Tooltip overlayClassName={styles.listMarkingTooltip} placement="right" title={content}>
              <div className={styles.content}>{text[0].content}</div>
            </Tooltip>

          )
        },
        width: 170
      },
      {
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
        width: 80
      },
      {
        title: '后端归属',
        dataIndex: 'hdTeamName',
        key: 'hdTeamName',
        width: 180
      },
      {
        title: '会话老师',
        dataIndex: 'consultTeaName',
        key: 'consultTeaName',
        width: 70
      },
      {
        title: '原因分类',
        dataIndex: 'reasonTypeName',
        key: 'reasonTypeName',
        width: 70
      },
      {
        title: '操作',
        dataIndex: 'address',
        key: 'address',
        render: (text, r) => {
          return <span onClick={() => this.getAppeal(r)} style={{ color: "#00CCC3", cursor: 'pointer' }}>申诉</span>
        },
        width: 50
      },
    ];
    return columns || [];
  };
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
          router.push({
            pathname: '/qualityAppeal/qualityAppeal',
            query: { p: JSON.stringify({ "tabType": type, type, qualityNum: appealNo, }) }
          });
        } else { // 其它
          const dimensionData = constants.DIMENSION_TYPE.find(op => op.name === appealObj[dimensionType]);
          const params = { "page": 1, "pageSize": 30, "dimensionType": dimensionData ? dimensionData.id : constants.DIMENSION_TYPE[0].id };
          if (type === 0) { // 未申诉
            params.creditBeginDate = r.bizDate;
            params.creditEndDate = r.bizDate;
            params.stuId = r.stuId;
            router.push({
              pathname: '/scoreAppeal/awaitAppeal',
              query: { params: JSON.stringify(params) }
            });
          } else if (type === 1) { // 其它状态
            params.appealOrderNum = res.appealNum;
            router.push({
              pathname: '/scoreAppeal/onAppeal',
              query: { params: JSON.stringify(params) }
            });
          } else if (type === 2) {
            params.appealOrderNum = res.appealNum;
            router.push({
              pathname: '/scoreAppeal/finishAppeal',
              query: { params: JSON.stringify(params) }
            });
          }
        }
      }
    });
  }
  reasonTypeClick = (item) => {
    // this.setState({
    //   isChecked: false
    // })
    this.props.reasonTypeClick(item);
  }
  cellClick = (item, record, type) => {
    this.props.cellClick(item, record, type);
  }
  componentDidMount() {
    // this.getData();
  }

  render() {
    const { imDetailData, imDetailList } = this.props.xdCreditModal;
    return (
      <div className={`${styles.detials}`}>
        <div className={styles.classityBox} id="classityBox">
          <BIClassifyTable
            loading={this.props.loading}
            others='%'
            colors={colors}
            dataSource={imDetailData}
            isChecked={this.state.isChecked}
            defaultKey={{ id: 'orgId', name: 'orgName' }}
            cellClick={this.cellClick}
            reasonTypeClick={this.reasonTypeClick}
          ></BIClassifyTable>
        </div>
        <BITable
          ellipsis={true}
          columns={this.columns()}
          pagination={{
            hideOnSinglePage: true,
            showQuickJumper: true,
          }}
          rowKey={(record, index) => record.stuId + '' + index}
          dataSource={imDetailList}
          rowClassName={this.setRowClassName}
        />
      </div >
    );
  }
}

export default CreditImDetials;
