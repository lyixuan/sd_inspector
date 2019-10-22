import React from 'react';
import { Tooltip } from 'antd';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
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
class CreditDetials extends React.Component {
  columns = () => {
   
    const { detailsData } = this.props;
    const { titleFive } = detailsData;
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
      }, {
        title: detailsData.titleThree,
        dataIndex: 'valThree',
        key: 'valThree',
      }, {
        title: detailsData.titleFour,
        dataIndex: 'valFour',
        key: 'valFour',
        render: (text, r) => {
          if (detailsData.titleFour === '操作') {
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
          const content = r.contentList ? <Layout dataMark={r}></Layout> : r.content;
          return (
            <>
              {titleFive !== '申诉' && <Tooltip overlayClassName={styles.listMarkingTooltip} placement="right" title={content}>
                <span style={{ color: "#00CCC3" }}>查看</span>
              </Tooltip>}
              {titleFive !== '查看' && <span onClick={() => this.getAppeal(r)} style={{ color: "#00CCC3", cursor: 'pointer', marginLeft: titleFive === '操作' ? '8px' : '0px' }}>申诉</span>}
            </>
          );
        }
      })
    }
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
          window.open(`/inspector/qualityAppeal/qualityAppeal?p=${JSON.stringify({ "tabType": type, type,  qualityNum: appealNo, })}`);
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
    const { dementionId, detailsData, pageSize = 15, currentPage } = this.props;
    const dataSource = detailsData.data || [];
    const totalCount = detailsData.total || 0;
    return (
      <div className={`${styles.detials} ${dementionId ? '' : styles.noneData}`}>
        {
          dementionId ? <BITable
            columns={this.columns()}
            dataSource={dataSource}
            rowClassName={this.setRowClassName}
            pagination={{
              onChange: this.onChangeSize,
              defaultPageSize: pageSize,
              current: currentPage,
              total: totalCount,
              showQuickJumper: true,
            }}
            rowKey={(record, index) => record.id + '' + index}
            loading={this.props.loading}
            smalled={true}
          /> : <img src={creditImg} alt='权限' />
        }
      </div>
    );
  }
}

export default CreditDetials;
