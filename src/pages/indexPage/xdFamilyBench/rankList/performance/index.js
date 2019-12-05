import React from 'react';
import moment from 'moment';
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
import { thousandsFormat } from '@/utils/utils';
import { connect } from 'dva';
import BILoading from '@/components/BILoading'

const rankType = ['本学院排行', '集团排行'];
const dataTrace = ['{"widgetName":"本学院排行","traceName":"家族长工作台/本学院排行"}', '{"widgetName":"集团排行","traceName":"家族长工作台/集团排行"}'];
@connect(({ xdFamilyModal, loading }) => ({
  xdFamilyModal,
  loading: loading.effects['xdFamilyModal/achievementList'],
}))
class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankType: 1,
      dataSource: [],
      userMsg: '',
      userFlag: false,
      userLocation: ''
    }
  }
  columns() {
    const width = this.state.rankType == 1 ? '12.5%' : '11%';
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
          } else if (record.creditRanking == 2) {
            rank = rank2
          } else if (record.creditRanking == 3) {
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
      // {
      //   title: '家族长',
      //   dataIndex: 'cpName',
      //   key: 'cpName',
      //   width: width
      // },
      {
        title: '总绩效',
        dataIndex: 'totalAchievement',
        key: 'totalAchievement',
        render: (text, record) => {
          const percent = text / this.state.totalAchievementMax * 100
          return <div>
            <div>{thousandsFormat(parseInt(text))}</div>
            <SmallProgress isColor="green" percent={`${percent}%`}></SmallProgress>
          </div>
        },
        width: width
      },
      {
        title: '学分绩效',
        dataIndex: 'achievement',
        key: 'achievement',
        render: (text, record) => {
          const percent = text / this.state.achievementMax * 100
          return <div>
            <div>{thousandsFormat(parseInt(text))}</div>
            <SmallProgress isColor="green" percent={`${percent}%`}></SmallProgress>
          </div>
        },
        width: width
      },
      {
        title: '创收绩效',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
        render: (text, record) => {
          const percent = text / this.state.incomeKpiMax * 100
          return <div>
            <div>{thousandsFormat(parseInt(text))}</div>
            <SmallProgress isColor="green" percent={`${percent}%`}></SmallProgress>
          </div>
        },
        width: width
      },
      {
        title: '好推绩效',
        dataIndex: 'goodpushKpi',
        key: 'goodpushKpi',
        width: width,
        render: (text, record) => {
          return <div>{thousandsFormat(parseInt(text))}</div>
        }
      },
      {
        title: '续报绩效',
        dataIndex: 'renewalKpi',
        key: 'renewalKpi',
        width: width,
        render: (text, record) => {
          return <div>{thousandsFormat(parseInt(text))}</div>
        }
      },
      {
        title: '成本套绩效',
        dataIndex: 'examZbtKpi',
        key: 'examZbtKpi',
        width: '12%',
        render: (text, record) => {
          return <div>{thousandsFormat(parseInt(text))}</div>
        }
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

  componentDidMount() {
    this.achievementList();
    document.querySelector("#scroller .ant-table-body").onscroll = (e) => {
      this.getScrollFn(e.target.scrollTop)
    }
  }
  getScrollFn = (scrollTop = 0) => {
    const { userLocation, userFlag } = this.state;
    if (scrollTop > userLocation && scrollTop < userLocation + 400) {
      if (userFlag === true) {
        this.setState({
          userFlag: false
        })
      }
    } else if (userFlag === false) {
      this.setState({
        userFlag: true
      })
    }
  }
  getRowClassName = (record, index) => {
    if (record.myFamily) {
      this.state.userMsg = record;
      this.state.userLocation = 40 * (index + 1) - 430;
      return styles.pkUser;
    };
  }

  achievementList() {
    const groupType = this.state.rankType == 1 ? 'college' : '';
    this.props.dispatch({
      type: 'xdFamilyModal/achievementList',
      payload: { params: { groupType } },
      callback: (dataSource) => {
        this.setState({
          dataSource,
          totalAchievementMax: Math.max.apply(Math, dataSource.map(item => item.totalAchievement)),
          achievementMax: Math.max.apply(Math, dataSource.map(item => item.achievement)),
          incomeKpiMax: Math.max.apply(Math, dataSource.map(item => item.incomeKpi))
        })
      },
    });
  }

  handleRankChange = (e) => {
    this.setState({
      rankType: e.target.value,
      userFlag: false
    }, () => {
      this.achievementList();
    });
  }


  render() {
    const { userMsg, userFlag } = this.state;
    return (
      <div className={styles.performanceRank}>
        <BIRadio onChange={this.handleRankChange} value={this.state.rankType} style={{ marginBottom: 16 }}>
          {rankType.map((item, index) => <BIRadio.Radio.Button value={index + 1} key={index}><div data-trace={dataTrace[index]}>{item}</div></BIRadio.Radio.Button>)}
        </BIRadio>
        {userFlag && userMsg && <div className={styles.suspenTable}>
          <BITable
            showHeader={false}
            columns={this.columns()}
            dataSource={[userMsg]}
            pagination={false}
            rowKey={(record, index) => index}
            rowClassName={this.getRowClassName}
            scroll={{ x: 0, y: 200 }}
            smalled
          />
        </div>}
        <div id="scroller" className={`${userFlag && userMsg ? styles.tbodyMarTop : ''}`} >
        <BILoading isLoading={this.props.loading} >
          <BITable
              columns={this.columns()}
              dataSource={this.state.dataSource}
              pagination={false}
              scroll={{ x: 0, y: 400 }}
              rowKey={(record, index) => index}
              rowClassName={this.getRowClassName}
              smalled
            />
          </BILoading> 
        </div>
      </div >
    );
  }
}

export default Performance;