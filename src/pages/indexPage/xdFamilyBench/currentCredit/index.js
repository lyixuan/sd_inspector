import React from 'react';
import { connect } from 'dva';
import ColorBlock from '../../components/colorBlock';
import TopTabs from '../../components/topTabs';
import TableList from './components/list';
import Container from '@/components/BIContainer';
import styles from './index.less';

@connect(({ xdFamilyModal,loading }) => ({
  xdFamilyModal,
  loading: loading.effects['xdFamilyModal/getCountCurrentQuality'],

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
      type: 'xdFamilyModal/scoreStatistics',
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
      title1: '家族排名系数',
      num: scoreData.creditRankingCoefficient || 0,
      rank: scoreData.msgColor,
      rankTip: scoreData.msg,
      tip: '本绩效周期内用户所在家族在集团所有家族中的排名系数'
    }, {
      title1: '人均绩效在服学员',
      num: scoreData.averageStudentNumber || 0,
      tip: '本绩效周期内用户所在家族的人均绩效在服学员数'
    }]
    return (
      <div className={styles.currentCredit}>
        <div style={{ padding: '16px 24px 5px' }}><ColorBlock dataSet={arr} title='title1' num='num' /></div>
        <Container
          toolTip="本绩效周期内本家族所有小组的学分排名"
          title='本期学分'
        >
          <TableList tabKey="1" />
        </Container>
      </div>
    );
  }
}

export default CurrentCredit;
