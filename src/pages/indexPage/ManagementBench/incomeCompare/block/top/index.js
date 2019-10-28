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
function CustomExpandIcon(props) {
  return <a />;
}

const { Option } = BISelect;

@connect(xdWorkModal => ({
  xdWorkModal,
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
      orgValue: undefined,
      dataSource:[],
    };
  }

  componentDidMount() {
    this.getData();
    this.props
      .dispatch({
        type: 'xdWorkModal/getHotList',
      })
      .then(res => {
        this.setState({ typeList: res });
      });
  }

  getData(collegeId) {
    const { date } = this.props;
    this.props
      .dispatch({
        type: 'xdWorkModal/getPackageRankList',
        payload: { params: { beginDate: '2019-08-09', endDate: '2019-10-10', collegeId } },
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
        width:70,
      },
      {
        title: '创收流水',
        dataIndex: 'incomeFlowKpi',
        key: 'incomeFlowKpi',
        render: (incomeFlowKpi, record) => {
          const percent = record.incomeFlowKpiRatio * 100 + '%';
          return (
            <BIWrapperProgress
              text={incomeFlowKpi}
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
  };

  render() {
    const familyScoreList = [
      {
        averageStudentNumber: 749,
        credit: 3.41,
        creditRanking: 1,
        creditRankingCoefficient: 3.0,
        familyId: 229,
        familyName: '狐逻会计',
        myFamily: false,
      },
      {
        averageStudentNumber: 2052,
        credit: 2.96,
        creditRanking: 2,
        creditRankingCoefficient: 3.0,
        familyId: 251,
        familyName: '广东人力本2',
        myFamily: false,
      },
      {
        averageStudentNumber: 1879,
        credit: 2.87,
        creditRanking: 3,
        creditRankingCoefficient: 3.0,
        familyId: 200,
        familyName: '学前教育',
        myFamily: false,
      },
      {
        averageStudentNumber: 1738,
        credit: 2.59,
        creditRanking: 4,
        creditRankingCoefficient: 3.0,
        familyId: 170,
        familyName: '江苏人力',
        myFamily: false,
      },
      {
        averageStudentNumber: 1595,
        credit: 2.52,
        creditRanking: 5,
        creditRankingCoefficient: 2.0,
        familyId: 172,
        familyName: '汉语言本科1',
        myFamily: false,
      },
      {
        averageStudentNumber: 1746,
        credit: 2.49,
        creditRanking: 6,
        creditRankingCoefficient: 2.0,
        familyId: 306,
        familyName: '汉语言本科2',
        myFamily: false,
      },
      {
        averageStudentNumber: 1522,
        credit: 2.29,
        creditRanking: 7,
        creditRankingCoefficient: 2.0,
        familyId: 244,
        familyName: '行管2',
        myFamily: false,
      },
      {
        averageStudentNumber: 1641,
        credit: 2.27,
        creditRanking: 8,
        creditRankingCoefficient: 2.0,
        familyId: 322,
        familyName: '现代企管（芒格）',
        myFamily: false,
      },
      {
        averageStudentNumber: 1457,
        credit: 2.26,
        creditRanking: 9,
        creditRankingCoefficient: 2.0,
        familyId: 156,
        familyName: '全国工商',
        myFamily: false,
      },
      {
        averageStudentNumber: 1883,
        credit: 2.14,
        creditRanking: 10,
        creditRankingCoefficient: 2.0,
        familyId: 300,
        familyName: '狐逻经管',
        myFamily: false,
      },
      {
        averageStudentNumber: 1288,
        credit: 2.14,
        creditRanking: 11,
        creditRankingCoefficient: 1.0,
        familyId: 171,
        familyName: '汉语言专科',
        myFamily: false,
      },
      {
        averageStudentNumber: 1680,
        credit: 2.04,
        creditRanking: 12,
        creditRankingCoefficient: 1.0,
        familyId: 267,
        familyName: '计算机信管',
        myFamily: false,
      },
      {
        averageStudentNumber: 1728,
        credit: 2.04,
        creditRanking: 13,
        creditRankingCoefficient: 1.0,
        familyId: 245,
        familyName: '行管3',
        myFamily: false,
      },
      {
        averageStudentNumber: 2,
        credit: 2.02,
        creditRanking: 14,
        creditRankingCoefficient: 1.0,
        familyId: 314,
        familyName: '全国人力',
        myFamily: false,
      },
      {
        averageStudentNumber: 1497,
        credit: 1.97,
        creditRanking: 15,
        creditRankingCoefficient: 1.0,
        familyId: 298,
        familyName: '行管7',
        myFamily: false,
      },
      {
        averageStudentNumber: 2028,
        credit: 1.94,
        creditRanking: 16,
        creditRankingCoefficient: 1.0,
        familyId: 184,
        familyName: '行管1',
        myFamily: false,
      },
      {
        averageStudentNumber: 1633,
        credit: 1.94,
        creditRanking: 17,
        creditRankingCoefficient: 1.0,
        familyId: 243,
        familyName: '行管4',
        myFamily: false,
      },
      {
        averageStudentNumber: 1481,
        credit: 1.93,
        creditRanking: 18,
        creditRankingCoefficient: 1.0,
        familyId: 324,
        familyName: '连锁家族（芒格）',
        myFamily: false,
      },
      {
        averageStudentNumber: 1408,
        credit: 1.9,
        creditRanking: 19,
        creditRankingCoefficient: 1.0,
        familyId: 325,
        familyName: '商金家族（芒格）',
        myFamily: false,
      },
      {
        averageStudentNumber: 1369,
        credit: 1.89,
        creditRanking: 20,
        creditRankingCoefficient: 0.8,
        familyId: 155,
        familyName: '工程管理',
        myFamily: false,
      },
      {
        averageStudentNumber: 1884,
        credit: 1.87,
        creditRanking: 21,
        creditRankingCoefficient: 0.8,
        familyId: 312,
        familyName: '汉语言直本2',
        myFamily: false,
      },
      {
        averageStudentNumber: 1546,
        credit: 1.84,
        creditRanking: 22,
        creditRankingCoefficient: 0.8,
        familyId: 246,
        familyName: '行管5',
        myFamily: false,
      },
      {
        averageStudentNumber: 1924,
        credit: 1.84,
        creditRanking: 23,
        creditRankingCoefficient: 0.8,
        familyId: 252,
        familyName: '市场营销',
        myFamily: false,
      },
      {
        averageStudentNumber: 1918,
        credit: 1.84,
        creditRanking: 24,
        creditRankingCoefficient: 0.8,
        familyId: 208,
        familyName: '汉语言直本1',
        myFamily: false,
      },
      {
        averageStudentNumber: 1743,
        credit: 1.65,
        creditRanking: 25,
        creditRankingCoefficient: 0.8,
        familyId: 241,
        familyName: '江苏工商',
        myFamily: false,
      },
      {
        averageStudentNumber: 1550,
        credit: 1.62,
        creditRanking: 26,
        creditRankingCoefficient: 0.5,
        familyId: 103,
        familyName: '法律',
        myFamily: false,
      },
      {
        averageStudentNumber: 1474,
        credit: 1.49,
        creditRanking: 27,
        creditRankingCoefficient: 0.5,
        familyId: 313,
        familyName: '大学历家族',
        myFamily: false,
      },
      {
        averageStudentNumber: 1430,
        credit: 1.37,
        creditRanking: 28,
        creditRankingCoefficient: 0.5,
        familyId: 158,
        familyName: '英语',
        myFamily: false,
      },
      {
        averageStudentNumber: 1498,
        credit: 1.32,
        creditRanking: 29,
        creditRankingCoefficient: 0.5,
        familyId: 279,
        familyName: '行管6',
        myFamily: false,
      },
      {
        averageStudentNumber: 1756,
        credit: 0.67,
        creditRanking: 30,
        creditRankingCoefficient: 0.5,
        familyId: 225,
        familyName: '北京人力',
        myFamily: false,
      },
    ];
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
              {typeList &&
                typeList.map((item, index) => (
                  <Option key={item.collegeId}>{item.collegeName}</Option>
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
          />
        </div>
        {/* <div className={styles.tableContainer}>
          <BITable
            columns={this.columns()}
            dataSource={familyScoreList}
            defaultExpandAllRows={true}
            expandIcon={CustomExpandIcon}
            rowClassName={this.setRowClassName}
            pagination={false}
            scroll={{ x: 0, y: 408 }}
            rowKey={record => record.id}
            loading={this.props.loading}
          ></BITable> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Top;
