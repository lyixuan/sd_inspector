import React from 'react';
import moment from 'moment';
import Wrap from './components/wrap'
import styles from './index.less';
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
    dataIndex: 'key',
    key: 'name',
    width: '16.67%'
  },
  {
    title: '家族',
    dataIndex: 'age',
    key: 'age',
    width: '16.67%'
  },
  {
    title: '小组',
    dataIndex: 'address',
    key: 'address',
    width: '16.67%'
  },
  {
    title: '好推',
    dataIndex: 'address',
    key: 'address',
    width: '16.67%'
  },
  {
    title: '创收',
    dataIndex: 'address',
    key: 'address',
    width: '16.67%'
  },
  {
    title: '成本套',
    dataIndex: 'address',
    key: 'address',
    width: '16.67%'
  },
];
const columns4 = [
  {
    title: '总绩效排名',
    dataIndex: 'key',
    key: 'name',
    width: '16.67%'
  },
  {
    title: '学院',
    dataIndex: 'age',
    key: 'age',
    width: '16.67%'
  },
  {
    title: '家族',
    dataIndex: 'address',
    key: 'address',
    width: '16.67%'
  },
  {
    title: '好推',
    dataIndex: 'address',
    key: 'address',
    width: '16.67%'
  },
  {
    title: '创收',
    dataIndex: 'address',
    key: 'address',
    width: '16.67%'
  },
  {
    title: '成本套',
    dataIndex: 'address',
    key: 'address',
    width: '16.67%'
  },
];

@connect(() => ({

}))
class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keye: 1
    }
  }
  onTabChange = (val) => {
    this.setState({
      keye: val
    })
  };
  componentDidMount() {

  }


  render() {
    return (
      <div className={styles.scoreWrap}>
        <div className={styles.tableWrap}>
          <div className={styles.table}><Wrap columns={columns} dataSource={dataSource} title='本学院学分排名'></Wrap></div>
          <div className={styles.table}><Wrap columns={columns2} dataSource={dataSource} title='集团学分排名' className='bg2'></Wrap></div>
        </div>
        <div className={styles.tableWrap}>
          <div className={styles.table}><Wrap columns={columns3} dataSource={dataSource} title='本学院创收排名' className='bg3'></Wrap></div>
          <div className={styles.table}><Wrap columns={columns4} dataSource={dataSource} title='集团创收排名' className='bg4'></Wrap></div>
        </div>

      </div>

    );
  }
}

export default Score;
