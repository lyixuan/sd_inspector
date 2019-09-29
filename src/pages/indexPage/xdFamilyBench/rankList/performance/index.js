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
import { connect } from 'dva';

const rankType = ['本学院排行', '集团排行'];
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
    key: '1',
    name: '胡彦斌',
    rank: 2,
    age: 32,
    rankChange: 1,
    address: '西湖区湖底公园1号',
  },
  {
    key: '1',
    name: '胡彦斌',
    rank: 3,
    age: 32,
    rankChange: 2,
    address: '西湖区湖底公园1号',
  },
  {
    key: '1',
    name: '胡彦斌',
    rank: 4,
    age: 32,
    rankChange: 0,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '排名',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => {
      let src = null;
      let className = '';
      let rank = 1;
      if (record.rankChange == 1) {
        src = up
      } else if (record.rankChange == 2) {
        src = down
      } else {
        className = 'normal'
        src = normal
      }
      if (record.rank == 1) {
        rank = rank1
      } else if (record.rank == 2) {
        rank = rank2
      } else if (record.rank == 3) {
        rank = rank3
      }
      return (
        <div className={`${styles.rankColumn} ${styles[className]}`}>
          {record.rank > 3 ? <span className={styles.rankSpan}>{record.rank}</span> : <img className={styles.rank} src={rank} />}
          {text}<img className={styles.changes} src={src} />
        </div>
      )

    }
  },
  {
    title: '家族',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '家族长',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '总绩效',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '学分绩效',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '创收绩效',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '好推绩效',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '续报绩效',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '成本套绩效',
    dataIndex: 'address',
    key: 'address',
  },
];


@connect(() => ({

}))
class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankType: 1
    }
  }
  handleRankChange = (e) => {
    this.setState({
      rankType: e.target.value
    }, () => console.log(21));
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className={styles.performanceRank}>
        <BIRadio onChange={this.handleRankChange} value={this.state.rankType} style={{ marginBottom: 16 }}>
          {rankType.map((item, index) => <BIRadio.Radio.Button value={index + 1} key={index}><div>{item}</div></BIRadio.Radio.Button>)}
        </BIRadio>
        <div className={styles.tableContainer}>
          <BITable
            columns={columns}
            dataSource={dataSource}
          >
          </BITable>
        </div>
      </div>
    );
  }
}

export default Performance;
