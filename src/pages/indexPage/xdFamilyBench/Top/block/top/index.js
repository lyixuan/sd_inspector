import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect';
import styles from './styles.less';
import BIWrapperTable from '../../../../components/BIWrapperTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import moment from 'moment';
import { thousandsFormatBigger } from '@/utils/utils';
import { Tooltip } from 'antd';
const { Option } = BISelect;

@connect(xdFamilyModal => ({
  xdFamilyModal,
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
    let newcollegeId = localStorage.getItem('orgValue') || this.props.userInfo.collegeId || '0';
    let { orgValue } = this.state;
    this.getData(newcollegeId);
    this.props
      .dispatch({
        type: 'xdFamilyModal/getHotList',
      })
      .then(res => {
        res.map((item, index) => {
          if (item.collegeId === newcollegeId) {
            orgValue = String(newcollegeId);
          }
        });
        this.setState({ typeList: res, orgValue });
      });
  }

  getData(collegeId) {
    const { date } = this.props;
    let { orgValue } = this.state;
    if (collegeId === 'undefined') {
      orgValue = 0;
    } else {
      orgValue = String(collegeId);
    }
    this.props
      .dispatch({
        type: 'xdFamilyModal/getPackageRankList',
        payload: {
          params: {
            beginDate: moment(date.startDate).format('YYYY-MM-DD'),
            endDate: moment(date.endDate).format('YYYY-MM-DD'),
            collegeId: collegeId !== 'undefined' ? collegeId : '0',
          },
        },
      })
      .then(res => {
        this.setState({ dataSource: res, orgValue });
      });
  }

  columns = () => {
    const columns = [
      {
        title: '排名',
        dataIndex: 'id',
        key: 'id',
        width: '60px',
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
        // width: '40%',
        render: (packageName, record) => {
          return (
            <Tooltip title={packageName}>
              <div style={{ textAlign: 'left' }}>{packageName}</div>
            </Tooltip>
          );
        },
      },
      {
        title: '创收单量',
        dataIndex: 'incomeOrder',
        key: 'incomeOrder',
        width: '25%',
        className: styles.marIncome,
        render: (incomeOrder, record) => {
          return <div style={{ textAlign: 'right', width: '70px' }}>{incomeOrder}</div>;
        },
      },
      {
        title: '创收流水',
        dataIndex: 'incomeFlowKpi',
        key: 'incomeFlowKpi',
        width: '100px',
        render: (incomeFlowKpi, record) => {
          const percent = record.incomeFlowKpiRatio * 100 + '%';
          const money = thousandsFormatBigger(incomeFlowKpi);
          return (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <BIWrapperProgress
                text={money}
                percent={percent}
                propsStyle={{ flex: 'inherit', width: '70px', textAlign: 'right' }}
              />
            </div>
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
          <div>
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
            name={'tableWrap'}
            columns={this.columns()}
            dataSource={dataSource}
            pagination={false}
            loading={this.props.loading}
            onRow={this.onClickRow}
            rowKey={record => record.id}
            scroll={{ y: 288 }}
            name="hotData"
          />
        </div>
      </div>
    );
  }
}

export default Top;
