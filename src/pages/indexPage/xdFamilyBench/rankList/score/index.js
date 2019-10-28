import React from 'react';
import Wrap from './components/wrap'
import styles from './index.less';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import storage from '@/utils/storage';
import { thousandsFormat } from '@/utils/utils';
import { connect } from 'dva';


const columns = [
  {
    title: '排名',
    dataIndex: 'creditRanking',
    key: 'creditRanking',
    width: '25%',
    render: (text, record) => {
      let className = '';
      let rank = 1;
      if (record.creditRanking == 1) {
        rank = rank1
      } else if (record.creditRanking == 2) {
        rank = rank2
      } else if (record.creditRanking == 3) {
        rank = rank3
      }
      return (
        <div className={`${styles.rankColumn} ${styles[className]}`}>
          {record.creditRanking > 3 ? <span className={styles.rankSpan}>{record.creditRanking}</span> : <img className={styles.rank} src={rank} />}
        </div>
      )

    },
  },
  {
    title: '家族',
    dataIndex: 'familyName',
    key: 'familyName',
    width: '25%'
  },
  {
    title: '小组',
    dataIndex: 'groupName',
    key: 'groupName',
    width: '25%'
  },
  {
    title: '学分',
    dataIndex: 'credit',
    key: 'credit',
    width: '25%'
  },
];
const columns2 = [
  {
    title: '排名',
    dataIndex: 'key',
    key: 'name',
    width: '25%',
    render: (text, record) => {
      let className = '';
      let rank = 1;
      if (record.creditRanking == 1) {
        rank = rank1
      } else if (record.creditRanking == 2) {
        rank = rank2
      } else if (record.creditRanking == 3) {
        rank = rank3
      }
      return (
        <div className={`${styles.rankColumn} ${styles[className]}`}>
          {record.creditRanking > 3 ? <span className={styles.rankSpan}>{record.creditRanking}</span> : <img className={styles.rank} src={rank} />}
        </div>
      )

    },
  },
  {
    title: '学院',
    dataIndex: 'collegeName',
    key: 'collegeName',
    width: '25%'
  },
  {
    title: '家族',
    dataIndex: 'familyName',
    key: 'familyName',
    width: '25%'
  },
  {
    title: '学分',
    dataIndex: 'credit',
    key: 'credit',
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
    width: '16.67%',
    render: (text, record) => {
      return <div>{thousandsFormat(parseInt(text))}</div>
    }
  },
  {
    title: '续报',
    dataIndex: 'renewalKpi',
    key: 'renewalKpi',
    width: '16.67%',
    render: (text, record) => {
      return <div>{thousandsFormat(parseInt(text))}</div>
    }
  },
  {
    title: '成本套',
    dataIndex: 'examZbtKpi',
    key: 'examZbtKpi',
    width: '16.67%',
    render: (text, record) => {
      return <div>{thousandsFormat(parseInt(text))}</div>
    }
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
    width: '16.67%',
    render: (text, record) => {
      return <div>{thousandsFormat(parseInt(text))}</div>
    }
  },
  {
    title: '续报',
    dataIndex: 'renewalKpi',
    key: 'renewalKpi',
    width: '16.67%',
    render: (text, record) => {
      return <div>{thousandsFormat(parseInt(text))}</div>
    }
  },
  {
    title: '成本套',
    dataIndex: 'examZbtKpi',
    key: 'examZbtKpi',
    width: '16.67%',
    render: (text, record) => {
      return <div>{thousandsFormat(parseInt(text))}</div>
    }
  },
];

@connect(({ xdWorkModal}) => ({
  xdWorkModal,
}))
class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: storage.getItem('admin_user').userId,
      keye: 1,
      scoreData: [],
      incomeData: [],
      incomeCompanyData: [],
      companyScoreData: []
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
    this.collegeRankList();
    this.companyRankList();
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
  collegeRankList() {
    this.props.dispatch({
      type: 'xdWorkModal/collegeRankList',
      payload: {},
      callback: (scoreData) => this.setState({ scoreData }),
    });
  }
  companyRankList() {
    this.props.dispatch({
      type: 'xdWorkModal/companyRankList',
      payload: {},
      callback: (companyScoreData) => this.setState({ companyScoreData }),
    });
  }
  render() {
    const { incomeData, incomeCompanyData, scoreData, companyScoreData, userId } = this.state;
    return (
      <div className={styles.scoreWrap}>
        <div className={styles.tableWrap}>
          <div className={styles.table}><Wrap userId={userId} columns={columns} dataSource={scoreData} title='本学院学分排名'></Wrap></div>
          <div className={styles.table}><Wrap rowId='scroll2' userId={userId} columns={columns2} dataSource={companyScoreData} title='集团学分排名' className='bg2'></Wrap></div>
        </div>
        <div className={styles.tableWrap}>
          <div className={styles.table}><Wrap userId={userId} columns={columns3} dataSource={incomeData} title='本学院创收排名' className='bg3'></Wrap></div>
          <div className={styles.table}><Wrap rowId='scroll4' userId={userId} columns={columns4} dataSource={incomeCompanyData} title='集团创收排名' className='bg4'></Wrap></div>
        </div>
      </div>
    );
  }
}

export default Score;
