import React from 'react';
import { connect } from 'dva';
import BIRadio from '@/ant_components/BIRadio';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import styles from './style.less';

const rankType = ['学院', '家族', '小组'];
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];
@connect(({ admissionTicket, loading }) => ({
  admissionTicket

}))
class TicketRankList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankType: 1,
    }
  }
  handleRankChange = (e) => {
    this.setState({
      rankType: e.target.value
    }, () => {
      // this.achievementList();
    });
  }
  columns() {
    const columns = [
      {
        title: '排名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '学院',
        dataIndex: 'address',
        key: 'address',
        render: (text, record) => {
          console.log(57, text, record)

        }
      },
      {
        title: '在服学员人数',
        dataIndex: 'familyName',
        key: 'familyName',
      },
      {
        title: '填写人数',
        dataIndex: 'familyName',
        key: 'familyName',
      },
      {
        title: '填写率',
        dataIndex: 'familyName',
        key: 'familyName',
      },
      {
        title: '尚小德渠道填写人数',
        dataIndex: 'familyName',
        key: 'familyName',
      },
      {
        title: '填写占比',
        dataIndex: 'familyName',
        key: 'familyName',
      },
      {
        title: '验证准确数量',
        dataIndex: 'familyName',
        key: 'familyName',
      },
      {
        title: '准确率',
        dataIndex: 'familyName',
        key: 'familyName',
      },
    ];
    if (this.state.rankType == 2) {
      columns.splice(1, 0, {
        title: '学院',
        dataIndex: 'collegeName',
        key: 'collegeName',
      })
    }
    return columns || []
  }

  render() {
    return (
      <div className={styles.ticketList}>
        <BIRadio onChange={this.handleRankChange} value={this.state.rankType} style={{ marginBottom: 16 }}>
          {rankType.map((item, index) => <BIRadio.Radio.Button value={index + 1} key={index}><div>{item}</div></BIRadio.Radio.Button>)}
        </BIRadio>
        <div className={styles.tableWrap}>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={dataSource}
            pagination={false}
            scroll={{ x: 0, y: 700 }}
            rowKey={(record, index) => index}
            rowClassName={this.getRowClassName}
            smalled
          />
        </div>
      </div>
    );
  }
}

export default TicketRankList;
