import React from 'react';
import moment from 'moment';
import { Progress, Tooltip } from 'antd';
import BIRadio from '@/ant_components/BIRadio';
import BITable from '@/ant_components/BITable'
import styles from './index.less';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';
import normal from '@/assets/xdFamily/rankNormal.png';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import SmallProgress from '@/pages/indexPage/components/smallProgress'
import { connect } from 'dva';

const rankType = ['本学院排行', '集团排行'];

@connect(({ xdWorkModal }) => ({
  xdWorkModal
}))
class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankType: 1,
      dataSource: [],
    }
  }
  columns() {
    const width = this.state.rankType == 1 ? '11%' : '10%';
    const columns = [
      {
        title: '排名',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          let src = null;
          let className = '';
          let rank = 1;
          if (record.rankingFlag > 0) {
            src = up
          } else if (record.rankingFlag < 0) {
            src = down
          } else {
            className = 'normal'
            src = normal
          }
          if (record.creditRanking == 1) {
            rank = rank1
          } else if (record.rank == 2) {
            rank = rank2
          } else if (record.rank == 3) {
            rank = rank3
          }
          return (
            <div className={`${styles.rankColumn} ${styles[className]}`}>
              {record.creditRanking > 3 ? <span className={styles.rankSpan}>{record.creditRanking}</span> : <img className={styles.rank} src={rank} />}
              {text}<img className={styles.changes} src={src} />
            </div>
          )

        },
        width: width
      },
      {
        title: '家族',
        dataIndex: 'familyName',
        key: 'familyName',
        width: width
      },
      {
        title: '家族长',
        dataIndex: 'cpName',
        key: 'cpName',
        width: width
      },
      {
        title: '总绩效',
        dataIndex: 'totalAchievement',
        key: 'totalAchievement',
        render: (text, record) => {
          return <div>
            <div>{text}</div>
            <SmallProgress isColor="green" percent="40%"></SmallProgress>
          </div>
        },
        width: width
      },
      {
        title: '学分绩效',
        dataIndex: 'achievement',
        key: 'achievement',
        render: (text, record) => {
          return <div>
            <div>{text}</div>
            <SmallProgress isColor="green" percent="20%"></SmallProgress>
          </div>
        },
        width: width
      },
      {
        title: '创收绩效',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
        render: (text, record) => {
          return <div>
            <div>{text}</div>
            <SmallProgress isColor="green" percent="20%"></SmallProgress>
          </div>
        },
        width: width
      },
      {
        title: '好推绩效',
        dataIndex: 'goodpushKpi',
        key: 'goodpushKpi',
        width: width
      },
      {
        title: '续报绩效',
        dataIndex: 'renewalKpi',
        key: 'renewalKpi',
        width: width
      },
      {
        title: '成本套绩效',
        dataIndex: 'examZbtKpi',
        key: 'examZbtKpi',
        width: '12%'
      },
    ];
    if (this.state.rankType == 1) {

    } else {
      columns.splice(1, 0, {
        title: '学院',
        dataIndex: 'collegeName',
        key: 'collegeName',
      })
    }
    return columns || []
  }

  componentDidMount() {
    this.achievementList();
  }
  achievementList() {
    const groupType = this.state.rankType == 1 ? 'college' : '';
    this.props.dispatch({
      type: 'xdWorkModal/achievementList',
      payload: { params: { groupType } },
      callback: (dataSource) => this.setState({ dataSource }),
    });
  }
  handleRankChange = (e) => {
    // console.log(160, e.target.value)
    this.setState({
      rankType: e.target.value
    }, () => {
      this.achievementList();
    });
  }


  render() {
    return (
      <div className={styles.performanceRank}>
        <BIRadio onChange={this.handleRankChange} value={this.state.rankType} style={{ marginBottom: 16 }}>
          {rankType.map((item, index) => <BIRadio.Radio.Button value={index + 1} key={index}><div>{item}</div></BIRadio.Radio.Button>)}
        </BIRadio>
        <div className={styles.tableContainer}>
          <BITable
            columns={this.columns()}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{ x: 0, y: 200 }}
          >
          </BITable>
        </div>
      </div>
    );
  }
}

export default Performance;
