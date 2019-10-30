import React from 'react';
import { Tooltip } from 'antd';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import BIClassifyTable from '@/components/BIClassifyTable';
import BILoading from '@/components/BILoading';
import router from 'umi/router';
import styles from './style.less';
import {
  pathImUrl,
  jumpMarkingDetails,
  strLen,
  linkRoute,
  linkImgRouteBul,
} from '@/pages/ko/utils/utils';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';
import constants from '@/utils/constants';
const colors = ['rgba(255, 120, 120, 1)', 'rgba(255, 120, 120, 0.8)', 'rgba(255, 120, 120, .6)', 'rgba(255, 120, 120, .4)', 'rgba(255, 120, 120, .2)', 'rgba(255, 120, 120, .1)']

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
              <p>{strLen(props.dataMark.stuName, 3)}</p>
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
              <p>{strLen(props.dataMark.teacherName, 3)}</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

// @connect(({ loading, xdCreditModal }) => ({
//   xdCreditModal,
//   loading: loading.effects['xdCreditModal/reasonList']
// }))
@connect(({ loading, xdCreditModal }) => ({
  xdCreditModal,
  loading1: loading.effects['xdCreditModal/reasonList'],
  loading2: loading.effects['xdCreditModal/imDetailList'],
}))
class CreditImDetials extends React.Component {
  constructor(props) {
    super();
    this.state = {
      pageSize: 31
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.xdCreditModal.imDetailData != nextProps.xdCreditModal.imDetailData) {
      const tableWidth = nextProps.xdCreditModal.imDetailData.dataList.length * 50 + 100;
      const countPage = parseInt((1700 - tableWidth) / 48);
      this.setState({
        pageSize: countPage
      }, this.defaultPage(countPage))
    }
  }
  defaultPage = (pageSize) => {
    this.props.defaultPage(pageSize);
  }
  handleNameClick = (id) => {
    jumpMarkingDetails(id, { target: 'im' })
  }
  columnsTable = () => {
    const columns = [{
      type: 'leftFixed',
      name: '组织',
      width: 120
    }, {
      type: 'children',
      name: '',
      width: 1,
    }, {
      type: 'rightFixed',
      name: '汇总',
      width: 60,
      key: 'total'
    }];
    return columns || [];
  }
  columns = () => {
    const columns = [
      {
        title: '时间',
        dataIndex: 'bizDate',
        key: 'bizDate',
        // width: 110
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
        width: 200
      },
      {
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
        // width: 80,
        render: (text, record) => {
          return <span data-trace='{"widgetName":"选择学员","traceName":"数据服务/学分明细/不满意会话/选择学员"}' onClick={() => this.handleNameClick(record.stuId)} style={{ color: "#00CCC3", cursor: 'pointer' }}>{strLen(text, 6)}</span>
        }
      },
      {
        title: '后端归属',
        dataIndex: 'hdTeamName',
        key: 'hdTeamName',
        render: text => <Tooltip overlayClassName={styles.listMarkingTooltipOthers} placement="right"
          title={text}><span className={`${styles.textEllipsis} ${styles.textorg}`}>{text}</span></Tooltip>,
        // width: 180,
        //   render: (text, record) => {
        //     return <span>{strLen(text, 8)}</span>
        //   }
      },
      {
        title: '会话老师',
        dataIndex: 'consultTeaName',
        key: 'consultTeaName',
        // width: 70,
        render: (text, record) => {
          return <span>{strLen(text, 6)}</span>
        }
      },
      {
        title: '原因分类',
        dataIndex: 'reasonTypeName',
        key: 'reasonTypeName',
        // width: 70,
        render: (text, record) => {
          return <span>{strLen(text, 6)}</span>
        }
      },
      {
        title: '操作',
        dataIndex: 'address',
        key: 'address',
        render: (text, r) => {
          return <span onClick={() => this.getAppeal(r)} style={{ color: "#00CCC3", cursor: 'pointer' }}>申诉</span>
        },
        // width: 60
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
  onPageChange = (currentPage) => {
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
          window.open(`/inspector/qualityAppeal/qualityAppeal?p=${JSON.stringify({ "tabType": type, type, qualityNum: appealNo, })}`);
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

  render() {
    const { currentPage, pageSize2, loading1, loading2 } = this.props;
    const { imDetailData, imDetailList } = this.props.xdCreditModal;
    const totalCount = imDetailList.total || 0;
    return (
      <div className={`${styles.detials}`}>
        <div className={styles.classityBox} id="classityBox">
          {
            loading1 ? <div style={{ display: 'flex', height: '200px', alignItems: 'center', justifyContent: 'center' }}><BILoading isLoading={loading1} /></div> : imDetailData.titleList && <BIClassifyTable
              loading={this.props.loading}
              columns={this.columnsTable()}
              colors={colors}
              dataSource={imDetailData}
              cellWidth={85}
              style={{ cursor: 'pointer' }}
              isChecked={true}
              collegeType='college'
              defaultKey={{ id: 'orgId', name: 'orgName', unit: '%', classfy: '选择分类：' }}
              {...this.props}
            ></BIClassifyTable>
          }
        </div>
        <div className={styles.detailsTable}>
          {
            loading2 || loading2 ? <div style={{ display: 'flex', height: '200px', alignItems: 'center', justifyContent: 'center' }}><BILoading isLoading={loading2} /></div> : <BITable
              ellipsis={true}
              columns={this.columns()}
              dataSource={imDetailList.data}
              smalled
              pagination={{
                onChange: this.onPageChange,
                pageSize: pageSize2,
                current: currentPage,
                hideOnSinglePage: true,
                showQuickJumper: true,
                total: totalCount,
              }}
              rowKey={(record, index) => record.stuId + '' + index}
              rowClassName={this.setRowClassName}
            />
          }
        </div>
      </div >
    );
  }
}

export default CreditImDetials;
