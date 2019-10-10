import React from 'react';
import moment from 'moment';
import Wrap from './components/wrap'
import styles from './index.less';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import { connect } from 'dva';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    rank: 1,
    age: 32,
    rankChange: 1,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦斌',
    rank: 1,
    age: 32,
    rankChange: 1,
    address: '西湖区湖底公园1号',
  },
  {
    key: '3',
    name: '胡彦斌',
    rank: 1,
    age: 32,
    rankChange: 1,
    address: '西湖区湖底公园1号',
  },
  {
    key: '4',
    name: '胡彦斌',
    rank: 1,
    age: 32,
    rankChange: 1,
    address: '西湖区湖底公园1号',
  },
  {
    key: '5',
    name: '胡彦斌',
    rank: 1,
    age: 32,
    rankChange: 1,
    address: '西湖区湖底公园1号',
  },
  {
    key: '6',
    name: '胡彦斌',
    rank: 1,
    age: 32,
    rankChange: 1,
    address: '西湖区湖底公园1号',
  },
  {
    key: '7',
    name: '胡彦斌',
    rank: 1,
    age: 32,
    rankChange: 1,
    address: '西湖区湖底公园1号',
  },
  {
    key: '8',
    name: '胡彦斌',
    rank: 1,
    age: 32,
    rankChange: 1,
    address: '西湖区湖底公园1号',
  },
];
const columns = [
  {
    title: '排名',
    dataIndex: 'key',
    key: 'name',
    width: '25%'
  },
  {
    title: '家族',
    dataIndex: 'age',
    key: 'age',
    width: '25%'
  },
  {
    title: '小组',
    dataIndex: 'address',
    key: 'address',
    width: '25%'
  },
  {
    title: '学分',
    dataIndex: 'address',
    key: 'address',
    width: '25%'
  },
];
const columns2 = [
  {
    title: '排名',
    dataIndex: 'key',
    key: 'name',
    width: '25%'
  },
  {
    title: '学院',
    dataIndex: 'age',
    key: 'age',
    width: '25%'
  },
  {
    title: '家族',
    dataIndex: 'address',
    key: 'address',
    width: '25%'
  },
  {
    title: '学分',
    dataIndex: 'address',
    key: 'address',
    width: '25%'
  },
];
const columns3 = [
  {
    title: '总绩效排名',
    dataIndex: 'ranking',
    key: 'ranking',
    width: '16.67%',
    render: (text, record) => {
      let className = '';
      let rank = 1;
      if (record.ranking == 1) {
        rank = rank1
      } else if (record.ranking == 2) {
        rank = rank2
      } else if (record.ranking == 3) {
        rank = rank3
      }
      return (
        <div className={`${styles.rankColumn} ${styles[className]}`}>
          {record.ranking > 3 ? <span className={styles.rankSpan}>{record.ranking}</span> : <img className={styles.rank} src={rank} />}
        </div>
      )

    },
  },
  {
    title: '家族',
    dataIndex: 'familyName',
    key: 'familyName',
    width: '16.67%'
  },
  {
    title: '小组',
    dataIndex: 'groupName',
    key: 'groupName',
    width: '16.67%'
  },
  {
    title: '好推',
    dataIndex: 'goodpushKpi',
    key: 'goodpushKpi',
    width: '16.67%'
  },
  {
    title: '续报',
    dataIndex: 'renewalKpi',
    key: 'renewalKpi',
    width: '16.67%'
  },
  {
    title: '成本套',
    dataIndex: 'examZbtKpi',
    key: 'examZbtKpi',
    width: '16.67%'
  },
];
const columns4 = [
  {
    title: '总绩效排名',
    dataIndex: 'ranking',
    key: 'ranking',
    width: '16.67%',
    render: (text, record) => {
      let className = '';
      let rank = 1;
      if (record.ranking == 1) {
        rank = rank1
      } else if (record.ranking == 2) {
        rank = rank2
      } else if (record.ranking == 3) {
        rank = rank3
      }
      return (
        <div className={`${styles.rankColumn} ${styles[className]}`}>
          {record.ranking > 3 ? <span className={styles.rankSpan}>{record.ranking}</span> : <img className={styles.rank} src={rank} />}
        </div>
      )

    },
  },
  {
    title: '学院',
    dataIndex: 'collegeName',
    key: 'collegeName',
    width: '16.67%'
  },
  {
    title: '家族',
    dataIndex: 'familyName',
    key: 'familyName',
    width: '16.67%'
  },
  {
    title: '好推',
    dataIndex: 'goodpushKpi',
    key: 'goodpushKpi',
    width: '16.67%'
  },
  {
    title: '续报',
    dataIndex: 'renewalKpi',
    key: 'renewalKpi',
    width: '16.67%'
  },
  {
    title: '成本套',
    dataIndex: 'examZbtKpi',
    key: 'examZbtKpi',
    width: '16.67%'
  },
];

@connect(({ xdWorkModal }) => ({
  xdWorkModal
}))
class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keye: 1,
      incomeData: [],
      incomeCompanyData: [],
    }
  }
  onTabChange = (val) => {
    this.setState({
      keye: val
    })
  };
  componentDidMount() {
    this.incomeCollegeRankList();
    this.incomeCompanyRankList();
  }
  incomeCollegeRankList() {
    this.props.dispatch({
      type: 'xdWorkModal/incomeCollegeRankList',
      payload: {},
      callback: (incomeData) => this.setState({ incomeData }),
    });
  }
  incomeCompanyRankList() {
    this.props.dispatch({
      type: 'xdWorkModal/incomeCompanyRankList',
      payload: {},
      callback: (incomeCompanyData) => this.setState({ incomeCompanyData }),
    });
  }


  render() {
    const { incomeData, incomeCompanyData } = this.state;
    return (
      <div className={styles.scoreWrap}>
        <div className={styles.tableWrap}>
          <div className={styles.table}><Wrap columns={columns} dataSource={dataSource} title='本学院学分排名'></Wrap></div>
          <div className={styles.table}><Wrap columns={columns2} dataSource={dataSource} title='集团学分排名' className='bg2'></Wrap></div>
        </div>
        <div className={styles.tableWrap}>
          <div className={styles.table}><Wrap columns={columns3} dataSource={incomeData} title='本学院创收排名' className='bg3'></Wrap></div>
          <div className={styles.table}><Wrap columns={columns4} dataSource={incomeCompanyData} title='集团创收排名' className='bg4'></Wrap></div>
        </div>

      </div>

    );
  }
}

export default Score;
