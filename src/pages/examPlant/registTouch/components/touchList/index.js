import React from 'react';
import { connect } from 'dva';
import BIRadio from '@/ant_components/BIRadio';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import pop from '@/assets/examPlan/pop.png';
import { thousandsFormat } from '@/utils/utils';
import close from '@/assets/examPlan/close.png';
import styles from './style.less';

const rankType = ['学院', '家族', '小组'];
@connect(({ registTouch, loading }) => ({
  registTouch,
  reachNumRankList: registTouch.reachNumRankList,
  loading: loading.effects['registTouch/reachNumRankList']
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
      if (this.props.getList) {
        this.props.getList(e.target.value);
      }
    });
  }
  columns() {
    const columns = [
      {
        title: '排名',
        dataIndex: 'sort',
        key: 'sort',
        render: (text, record) => {
          let className = '';
          let rank = 1;
          if (text == 1) {
            rank = rank1;
          } else if (text == 2) {
            rank = rank2;
          } else if (text == 3) {
            rank = rank3;
          }
          return (
            <div style={{ width: '30px', textAlign: 'center' }}>
              {text > 3 ? (
                <span>{text}</span>
              ) : (
                  <img className={styles.rank} src={rank} style={{ width: '18px' }} />
                )}
            </div>
          );
        },
      },
      {
        title: '在服学员人数',
        dataIndex: 'stuNumber',
        key: 'stuNumber',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.reachNumRankList.map(item => item.stuNumber))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text ? thousandsFormat(text) : 0} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '尚小德渠道触达人数',
        dataIndex: 'reachNum',
        key: 'reachNum',
        className: styles.sunlandBg,
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.reachNumRankList.map(item => item.reachNum))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress isColor='blue' text={text ? thousandsFormat(text) : 0} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '触达率',
        dataIndex: 'reachNumPercent',
        key: 'reachNumPercent',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.reachNumRankList.map(item => item.reachNumPercent))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress isColor='blue' text={`${(text * 100).toFixed(2)}%`} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
    ];
    if (this.state.rankType == 1) {
      columns.splice(1, 0, {
        title: '学院',
        dataIndex: 'orgName',
        key: 'orgName',
      })
    }
    if (this.state.rankType == 2) {
      columns.splice(1, 0, {
        title: '家族',
        dataIndex: 'orgName',
        key: 'orgName',
      })
    }
    if (this.state.rankType == 3) {
      columns.splice(1, 0, {
        title: '小组',
        dataIndex: 'orgName',
        key: 'orgName',
      })
    }
    return columns || []
  }
  onClose = () => {
    this.setState({
      visible: false
    })
  }
  getRowClassName = (record, index) => {
    if (record.hightLightFlag) {
      this.state.userMsg = record;
      return styles.pkMine;
    };
  }

  render() {
    return (
      <div className={styles.ticketList}>
        <BIRadio onChange={this.handleRankChange} value={this.state.rankType} style={{ marginBottom: 16 }}>
          {rankType.map((item, index) =>
            <BIRadio.Radio.Button value={index + 1} key={index}>
              <div data-trace={`{ "widgetName": "报考触达-${item}", "traceName": "报考大盘/报考触达" }`}>{item}</div>
            </BIRadio.Radio.Button>
          )}
        </BIRadio>
        <div className={styles.tableWrap}>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={this.props.reachNumRankList}
            pagination={false}
            loading={this.props.loading}
            scroll={{ x: 0, y: 600 }}
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
