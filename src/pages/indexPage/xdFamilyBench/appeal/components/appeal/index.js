import React from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import BIRadio from '@/ant_components/BIRadio';
import BITable from '@/ant_components/BITable';
import Container from '@/components/BIContainer';
import rankWarn from '@/assets/xdFamily/rankWarn.png';
import styles from './style.less';
import BILoading from '@/components/BILoading';
import { beforeAll } from 'lodash-decorators';
import moment from 'moment';
const { BI = {} } = window;

const tabsMsg = [
  {
    title: '未申诉',
    dataTrace: '{"widgetName":"未申诉","traceName":"家族长工作台/未申诉"}',
  },
  {
    title: '被驳回',
    dataTrace: '{"widgetName":"被驳回","traceName":"家族长工作台/被驳回"}',
  },
  {
    title: '审核中',
    dataTrace: '{"widgetName":"审核中","traceName":"家族长工作台/审核中"}',
  },
];

function appealParams(type, date) {
  let status = undefined;
  if (type === 1) {
    status = '1';
  }
  return {
    tabType: '1',
    type: '1',
    status,
    reduceScoreBeginDate: date && moment(date.startDate).format('YYYY-MM-DD'),
    reduceScoreEndDate: date && moment(date.endDate).format('YYYY-MM-DD'),
  };
}
function bottomParams(num, date, type, id) {
  let statusList = [];
  const creditBeginDate = date && moment(date.startDate).format('YYYY-MM-DD'); // 申诉开始日期
  const creditEndDate = date && moment(date.endDate).format('YYYY-MM-DD'); // 申诉结束日期
  if (type === 2) {
    statusList = ['3', '4', '7'];
  }
  if (type === 3) {
    statusList = ['1', '2', '5', '6'];
  }
  return {
    page: 1,
    pageSize: 30,
    dimensionType: num,
    creditBeginDate,
    creditEndDate,
    statusList,
    groupIdList: [`c-${id}`],
  };
}

let appealUrl, bottomLineUrl, imUrl, orderUrl, newExcellentUrl, incomeUrl;
const scoreAppeal = '/inspector/scoreAppeal/onAppeal'; // 在途申诉
const qualityAppeal = '/inspector/qualityAppeal/qualityAppeal'; // 质检
const awaitAppeal = '/inspector/scoreAppeal/awaitAppeal'; // 待申诉

function gotoUrl(type, date, id) {
  switch (type) {
    case 1:
      appealUrl = `${qualityAppeal}?p=${JSON.stringify(appealParams(type, date))}`; // 质检
      bottomLineUrl = `${awaitAppeal}?params=${JSON.stringify(bottomParams(23, date, type, id))}`; // 底线
      imUrl = `${awaitAppeal}?params=${JSON.stringify(bottomParams(14, date, type, id))}`; // im
      orderUrl = `${awaitAppeal}?params=${JSON.stringify(bottomParams(19, date, type, id))}`; // 工单
      newExcellentUrl = `${awaitAppeal}?params=${JSON.stringify(bottomParams(11, date, type, id))}`; // 优新
      incomeUrl = `${awaitAppeal}?params=${JSON.stringify(bottomParams(42, date, type, id))}`; // 创收
      break;
    case 2:
    case 3:
      appealUrl = `${qualityAppeal}?p=${JSON.stringify(appealParams(type, date))}`;
      bottomLineUrl = `${scoreAppeal}?params=${JSON.stringify(bottomParams(23, date, type, id))}`; // 底线
      imUrl = `${scoreAppeal}?params=${JSON.stringify(bottomParams(14, date, type, id))}`; // im
      orderUrl = `${scoreAppeal}?params=${JSON.stringify(bottomParams(19, date, type, id))}`; // 工单
      newExcellentUrl = `${scoreAppeal}?params=${JSON.stringify(bottomParams(11, date, type, id))}`; // 优新
      incomeUrl = `${scoreAppeal}?params=${JSON.stringify(bottomParams(42, date, type, id))}`; // 创收
      break;
    default:
      break;
  }
}

const tabSource = {
  1: 'nonAppealList',
  2: 'rejectedAppealList',
  3: 'auditingAppealList',
};
@connect(({ xdFamilyModal, loading }) => ({
  familyAppeal: xdFamilyModal.familyAppeal || {},
  loading: loading.effects['xdFamilyModal/getFamilyRecord'],
}))
class appeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appealType: 1,
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdFamilyModal/getFamilyRecord',
      payload: { params: { id: this.props.userId } },
    });
  }

  columns = () => {
    const { appealType } = this.state;
    const { date } = this.props;
    const columns = [
      {
        title: '家族小组',
        dataIndex: 'groupName',
        key: 'groupName',
        render: (text, record) => {
          return <div>{text}</div>;
        },
      },
      {
        title: '质检',
        dataIndex: 'qualityNum',
        key: 'qualityNum',
        render: (text, record) => (
          <>
            {gotoUrl(appealType, date, record.groupId)}
            {record.primaryViolationFlag ? (
              <div className={styles.rankMark}>
                {text}
                {
                  <Tooltip placement="bottom" title="含一级违规">
                    <img src={rankWarn} alt="icon" />
                  </Tooltip>
                }
              </div>
            ) : text ? (
              <div className={styles.rankMarkGreen}>
                <a
                  href={appealUrl}
                  target="_blank"
                  data-trace='{"traceName":"家族长工作台/本期申诉","widgetName":"本期申诉数据详情"}'
                >
                  {text}
                </a>
              </div>
            ) : (
              text
            )}
          </>
        ),
      },
      {
        title: '底线',
        dataIndex: 'bottomLineNum',
        key: 'bottomLineNum',
        render: (text, record) => (
          <>
            {gotoUrl(appealType, date, record.groupId)}
            {text ? (
              <div className={styles.rankMarkGreen}>
                <a
                  href={bottomLineUrl}
                  target="_blank"
                  data-trace='{"traceName":"家族长工作台/本期申诉","widgetName":"本期申诉数据详情"}'
                >
                  {text}
                </a>
              </div>
            ) : (
              text
            )}
          </>
        ),
      },
      {
        title: 'IM',
        dataIndex: 'imNum',
        key: 'imNum',
        render: (text, record) => (
          <>
            {gotoUrl(appealType, date, record.groupId)}
            {text ? (
              <div className={styles.rankMarkGreen}>
                <a
                  href={imUrl}
                  target="_blank"
                  data-trace='{"traceName":"家族长工作台/本期申诉","widgetName":"本期申诉数据详情"}'
                >
                  {text}
                </a>
              </div>
            ) : (
              text
            )}
          </>
        ),
      },
      {
        title: '工单',
        dataIndex: 'orderNum',
        key: 'orderNum',
        render: (text, record) => (
          <>
            {gotoUrl(appealType, date, record.groupId)}
            {text ? (
              <div className={styles.rankMarkGreen}>
                <a
                  href={orderUrl}
                  target="_blank"
                  data-trace='{"traceName":"家族长工作台/本期申诉","widgetName":"本期申诉数据详情"}'
                >
                  {text}
                </a>
              </div>
            ) : (
              text
            )}
          </>
        ),
      },
      {
        title: '优新',
        dataIndex: 'newExcellentNum',
        key: 'newExcellentNum',
        render: (text, record) => (
          <>
            {gotoUrl(appealType, date, record.groupId)}
            {text ? (
              <div className={styles.rankMarkGreen}>
                <a
                  href={newExcellentUrl}
                  target="_blank"
                  data-trace='{"traceName":"家族长工作台/本期申诉","widgetName":"本期申诉数据详情"}'
                >
                  {text}
                </a>
              </div>
            ) : (
              text
            )}
          </>
        ),
      },
      {
        title: '创收',
        dataIndex: 'incomeNum',
        key: 'incomeNum',
        render: (text, record) => (
          <>
            {gotoUrl(appealType, date, record.groupId)}
            {text ? (
              <div className={styles.rankMarkGreen}>
                <a href={incomeUrl} target="_blank">
                  {text}
                </a>
              </div>
            ) : (
              text
            )}
          </>
        ),
      },
    ];
    return columns || [];
  };
  handleChange = e => {
    this.setState({
      appealType: e.target.value,
    });
  };

  render() {
    const dataSource = this.props.familyAppeal[tabSource[this.state.appealType]] || [];
    return (
      <div className={styles.appealWrap}>
        <Container title="本期申诉">
          <BIRadio
            onChange={this.handleChange}
            value={this.state.appealType}
            style={{ marginBottom: 16 }}
          >
            {tabsMsg.map((item, index) => (
              <BIRadio.Radio.Button value={index + 1} key={index}>
                <div data-trace={item.dataTrace}>{item.title}</div>
              </BIRadio.Radio.Button>
            ))}
          </BIRadio>
          <BILoading isLoading={this.props.loading}>
            <BITable
              columns={this.columns(this.state.appealType)}
              dataSource={dataSource}
              pagination={false}
              rowKey={(record, index) => index}
              smalled
            />
          </BILoading>
        </Container>
      </div>
    );
  }
}

export default appeal;
