import React from 'react';
import { connect } from 'dva';
import MsgBlock from '../../components/msgBlock';
import TopTabs from '../../components/topTabs';
import TableList from './components/list';
import credit1 from '@/assets/xdFamily/credit1.png';
import credit2 from '@/assets/xdFamily/credit2.png';
import credit3 from '@/assets/xdFamily/credit3.png';
import credit4 from '@/assets/xdFamily/credit4.png';
import credit5 from '@/assets/xdFamily/credit5.png';
import styles from './index.less';

@connect(({ xdFamilyModal,loading }) => ({
  xdFamilyModal,
  loading: loading.effects['xdFamilyModal/getCountCurrentQuality'],
}))
class CurrentCredit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scoreData: {},
      tabParams: [{
        name: '本期学分',
        children: <TableList tabKey="1" />
      }],
      dataSet: []
    }
  }
  componentDidMount() {
    this.getScoreStatistics();
  }
  getScoreStatistics() {
    this.props.dispatch({
      type: 'xdFamilyModal/scoreStatistics',
      payload: {},
      callback: (scoreData) => this.setState({dataSet: [{
        img: credit1,
        title1: '集团均分',
        num: scoreData.companyCredit || 0,
        tip: '本绩效周期内集团学分均分',
      }, {
        img: credit2,
        title1: '家族均分',
        num: scoreData.familyCredit || 0,
        tip: '本绩效周期内用户所在家族的学分均分'
      }, {
        img: credit3,
        title1: '家族排名',
        num: scoreData.creditRanking || 0,
        tip: '本绩效周期内用户所在家族的学分在集团所有家族中的排名'
      }, {
        img: credit4,
        title1: '家族排名系数',
        num: scoreData.creditRankingCoefficient || 0,
        rank: scoreData.msgColor,
        rankTip: scoreData.msg,
        tip: '本绩效周期内用户所在家族在集团所有家族中的排名系数'
      }, {
        img: credit5,
        title1: '人均绩效在服学员',
        num: scoreData.averageStudentNumber || 0,
        tip: '本绩效周期内用户所在家族的人均在服学员数'
      }]})
    });
  }
  render() {
    return (
      <div className={styles.currentCredit}>
        <MsgBlock dataSet={this.state.dataSet} title='title1' num='num' />
        <TopTabs tabParams={this.state.tabParams} />
      </div>
    );
  }
}

export default CurrentCredit;
