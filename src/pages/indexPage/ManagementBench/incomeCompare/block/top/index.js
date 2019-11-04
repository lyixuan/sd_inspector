import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect';
import styles from './styles.less';
import BITable from '@/ant_components/BITable';
import Progress from '../../../../components/progress';
import IndentNum from '../../../../components/indentNum';
import Container from '@/components/BIContainer';
import BIWrapperTable from '../../../../components/BIWrapperTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import moment from 'moment';
import { thousandsFormatBigger } from '@/utils/utils';

function CustomExpandIcon(props) {
  return <a />;
}

const { Option } = BISelect;

@connect(xdManagementBench => ({
  xdManagementBench,
}))
class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originlist: [
        {
          id: 1,
          collegeName: '自变量',
          badPostNum: '0.12',
          notInTime: 400,
          Unanswered: 500,
        },
        {
          id: 2,
          collegeName: 'π学院',
          badPostNum: '0.12',
          notInTime: 400,
          Unanswered: 500,
        },
        {
          id: 3,
          collegeName: '芒格',
          badPostNum: '0.12',
          notInTime: 400,
          Unanswered: 500,
        },
        {
          id: 4,
          collegeName: '狐逻泰罗',
          badPostNum: '0.12',
          notInTime: 400,
          Unanswered: 500,
        },
        {
          id: 5,
          collegeName: '芝士',
          badPostNum: '0.12',
          notInTime: 400,
          Unanswered: 500,
        },
      ],
      typeList: null,
      orgValue: localStorage.getItem('orgValue') || '0',
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getData(localStorage.getItem('orgValue'));
    this.props
      .dispatch({
        type: 'xdManagementBench/getHotList',
      })
      .then(res => {
        this.setState({ typeList: res });
      });
  }

  getData(collegeId) {
    const { date } = this.props;
    if (collegeId === 'undefined') {
      this.setState({
        orgValue: '0',
      });
    }
    this.props
      .dispatch({
        type: 'xdManagementBench/getPackageRankList',
        payload: {
          params: {
            beginDate: moment(date.startDate).format('YYYY-MM-DD'),
            endDate: moment(date.endDate).format('YYYY-MM-DD'),
            collegeId: collegeId !== 'undefined' ? collegeId : '0',
          },
        },
      })
      .then(res => {
        this.setState({ dataSource: res });
      });
  }

  columns = () => {
    const columns = [
      {
        title: '排名',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => {
          let className = '';
          let rank = 1;
          if (record.id == 1) {
            rank = rank1;
          } else if (record.id == 2) {
            rank = rank2;
          } else if (record.id == 3) {
            rank = rank3;
          }
          return (
            <div className={`${styles.rankColumn} ${styles[className]}`}>
              {record.id > 3 ? (
                <span className={styles.rankSpan}>{record.id}</span>
              ) : (
                <img className={styles.rank} src={rank} />
              )}
            </div>
          );
        },
      },
      {
        title: '创收产品包',
        dataIndex: 'packageName',
        key: 'packageName',
      },
      {
        title: '创收单量',
        dataIndex: 'incomeOrder',
        key: 'incomeOrder',
        width: 70,
      },
      {
        title: '创收流水',
        dataIndex: 'incomeFlowKpi',
        key: 'incomeFlowKpi',
        render: (incomeFlowKpi, record) => {
          const percent = record.incomeFlowKpiRatio * 100 + '%';
          const money = thousandsFormatBigger(incomeFlowKpi);
          return (
            <BIWrapperProgress
              text={money}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
    ];
    return columns || [];
  };

  onFormChange = val => {
    this.getData(val);
    this.setState({
      orgValue: val,
    });
    localStorage.setItem('orgValue', val);
  };

  render() {
    const { typeList, orgValue, dataSource } = this.state;
    return (
      <div className={styles.topCon}>
        <div className={styles.title}>
          <span>热销产品包榜单</span>
          <div v-if="typeList">
            <BISelect
              style={{ width: 136, marginLeft: 12 }}
              placeholder="请选择"
              value={orgValue}
              onChange={val => this.onFormChange(val)}
            >
              <Option
                key={'0'}
                data-trace='{"widgetName":"产品包学院筛选","traceName":"管理层工作台/产品包学院筛选"}'
              >
                全部
              </Option>
              {typeList &&
                typeList.map((item, index) => (
                  <Option
                    key={item.collegeId}
                    data-trace='{"widgetName":"产品包学院筛选","traceName":"管理层工作台/产品包学院筛选"}'
                  >
                    {item.collegeName}
                  </Option>
                ))}
            </BISelect>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <BIWrapperTable
            columns={this.columns()}
            dataSource={dataSource}
            pagination={false}
            loading={this.props.loading}
            onRow={this.onClickRow}
            rowKey={record => record.id}
            scroll={{ y: 288 }}
          />
        </div>
      </div>
    );
  }
}

export default Top;
