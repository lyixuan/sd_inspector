import React from 'react';
import { connect } from 'dva';
import ColorBlock from '../../components/colorBlock';
import TopTabs from '../../components/topTabs';
import TableList from './components/list';
import styles from './index.less';

@connect(({ xdWorkModal }) => ({
  xdWorkModal
}))
class CurrentCredit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scoreData: {}
    }
  }
  componentDidMount() {
    this.getScoreStatistics();
  }
  getScoreStatistics() {
    this.props.dispatch({
      type: 'xdWorkModal/scoreStatistics',
      payload: {},
      callback: (scoreData) => this.setState({ scoreData }),
    });
  }

  render() {
    const { scoreData } = this.state
    const arr = [{
      title1: '集团均分',
      num: scoreData.companyCredit || 0,
      tip: '本绩效周期内集团学分均分'
    }, {
      title1: '家族均分',
      num: scoreData.familyCredit || 0,
      tip: '本绩效周期内用户所在家族的学分均分'
    }, {
      title1: '家族排名',
      num: scoreData.creditRanking || 0,
      tip: '本绩效周期内用户所在家族的学分在集团所有家族中的排名'
    }, {
      title1: '家族系数排名',
      num: scoreData.creditRankingCoefficient || 0,
      rank: scoreData.msgColor,
      rankTip: scoreData.msg,
      tip: '本绩效周期内用户所在家族在集团所有家族中的排名系数'
    }, {
      title1: '人均绩效在服学员',
      num: scoreData.averageStudentNumber || 0,
      tip: '本绩效周期内用户所在家族的人均在服学员数'
    }]
    const tabParams = [{
      name: '本期学分',
      children: <TableList tabKey="1" />
    }]
    return (
      <div className={styles.currentCredit}>
        <ColorBlock dataSet={arr} title='title1' num='num' />
        <TopTabs tabParams={tabParams} style={{ marginTop: '-20px' }} />
      </div>
    );
  }
}

export default CurrentCredit;
