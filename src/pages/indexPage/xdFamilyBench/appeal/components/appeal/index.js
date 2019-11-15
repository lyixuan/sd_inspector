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
function bottomParams(num, date, type) {
  return {
    page: 1,
    pageSize: 30,
    dimensionType: num,
    date,
    type,
  };
}

let bottomLineUrl, imUrl, orderUrl, newExcellentUrl, incomeUrl;

function gotoUrl(type, date) {
  switch (type) {
    case 1:
      bottomLineUrl = `/inspector/scoreAppeal/awaitAppeal?params=${JSON.stringify(
        bottomParams(23, date, type)
      )}`; // 底线
      imUrl = `/inspector/scoreAppeal/awaitAppeal?params=${JSON.stringify(bottomParams(14))}`; // im
      orderUrl = `/inspector/scoreAppeal/awaitAppeal?params=${JSON.stringify(bottomParams(19))}`; // 工单
      newExcellentUrl = `/inspector/scoreAppeal/awaitAppeal?params=${JSON.stringify(
        bottomParams(11, date, type)
      )}`; // 优新
      incomeUrl = `/inspector/scoreAppeal/onAppeal?params=${JSON.stringify(bottomParams(42))}`; // 创收
      break;
    case 2:
      bottomLineUrl = `/inspector/scoreAppeal/onAppeal?params=${JSON.stringify(bottomParams(23))}`; // 底线
      imUrl = `/inspector/scoreAppeal/onAppeal?params=${JSON.stringify(bottomParams(14))}`; // im
      orderUrl = `/inspector/scoreAppeal/onAppeal?params=${JSON.stringify(bottomParams(19))}`; // 工单
      newExcellentUrl = `/inspector/scoreAppeal/onAppeal?params=${JSON.stringify(
        bottomParams(11, date, type)
      )}`; // 优新
      incomeUrl = `/inspector/scoreAppeal/onAppeal?params=${JSON.stringify(bottomParams(42))}`; // 创收
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
    gotoUrl(appealType, date);
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
                <a href="/inspector/qualityAppeal/qualityNewSheet" target="_blank">
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
            {text ? (
              <div className={styles.rankMarkGreen}>
                <a href={bottomLineUrl} target="_blank">
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
            {text ? (
              <div className={styles.rankMarkGreen}>
                <a href={imUrl} target="_blank">
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
            {text ? (
              <div className={styles.rankMarkGreen}>
                <a href={orderUrl} target="_blank">
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
            {text ? (
              <div className={styles.rankMarkGreen}>
                <a href={newExcellentUrl} target="_blank">
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
    console.log(this.state.appealType, 'dataSource');
    return (
      <div className={styles.appealWrap}>
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
      </div>
    );
  }
}

export default appeal;
