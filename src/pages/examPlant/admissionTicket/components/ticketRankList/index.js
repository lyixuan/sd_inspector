import React from 'react';
import { connect } from 'dva';
import BIRadio from '@/ant_components/BIRadio';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import pop from '@/assets/examPlan/pop.png';
import close from '@/assets/examPlan/close.png';
import styles from './style.less';

const rankType = ['学院', '家族', '小组'];
const dataSource = [
  {
    sort: 1,
    collegeName: '学院名称',
    familyName: '家族',
    zaifu: '10000',
    tianxie: '3000',
    column4: '填写率',
    column5: '2000',
    column6: '填写占比',
    column7: '填写占比',
    column8: '验证准确数量',
    column9: '准确率',
  }
];
@connect(({ admissionTicket, loading }) => ({
  admissionTicket
}))
class TicketRankList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankType: 1,
      visible: true
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
        dataIndex: 'sort',
        key: 'sort',
      },
      {
        title: '在服学员人数',
        dataIndex: 'zaifu',
        key: 'zaifu',
        render: (text, record) => {
          const percent = '70%'
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '填写人数',
        dataIndex: 'tianxie',
        key: 'tianxie',
        render: (text, record) => {
          const percent = '40%'
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '填写率',
        dataIndex: 'familyName',
        key: 'familyName',
      },
      {
        title: '尚小德渠道填写人数',
        dataIndex: 'column5',
        key: 'column5',
        className: styles.sunlandBg,
        render: (text, record) => {
          const percent = '40%'
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text} isColor='blue' percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '填写占比',
        dataIndex: 'familyName',
        key: 'familyName',
        className: styles.sunlandBg
      },
      {
        title: '验证准确数量',
        dataIndex: 'familyName',
        key: 'familyName',
        className: styles.sunlandBg
      },
      {
        title: '准确率',
        dataIndex: 'familyName',
        key: 'familyName',
        className: styles.sunlandBg
      },
    ];
    if (this.state.rankType == 1) {
      columns.splice(1, 0, {
        title: '学院',
        dataIndex: 'collegeName',
        key: 'collegeName',
      })
    }
    if (this.state.rankType == 2) {
      columns.splice(1, 0, {
        title: '家族',
        dataIndex: 'collegeName',
        key: 'collegeName',
      })
    }
    if (this.state.rankType == 3) {
      columns.splice(1, 0, {
        title: '小组',
        dataIndex: 'collegeName',
        key: 'collegeName',
      })
    }
    return columns || []
  }
  onClose = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { visible } = this.state;
    return (
      <div className={styles.ticketList}>
        <BIRadio onChange={this.handleRankChange} value={this.state.rankType} style={{ marginBottom: 16 }}>
          {rankType.map((item, index) => <BIRadio.Radio.Button value={index + 1} key={index}><div data-trace={`{ "widgetName": "准考证填写-${item}", "traceName": "报考大盘/准考证填写排行" }`}>{item}</div></BIRadio.Radio.Button>)}
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
        {
          visible ? <div className={styles.floatPop}>
            <img src={pop} className={styles.img1}></img>
            <img src={close} className={styles.img2} onClick={this.onClose}></img>
          </div> : null
        }
      </div>
    );
  }
}

export default TicketRankList;
