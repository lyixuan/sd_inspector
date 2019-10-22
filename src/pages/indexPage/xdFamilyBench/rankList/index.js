import React from 'react';
import Container from '../../components/container';
import TopTabs from '../../components/topTabs'
import Performance from './performance'
import Score from './score'
import styles from './index.less';
import { connect } from 'dva';

@connect(() => ({

}))
class RankList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keye: '2',
      tabParams: [{
        name: <span>本期绩效总排行榜</span>,
        key: '1',
        children: <Performance />
      }, {
        name: '本期学分&创收排行榜',
        key: '2',
        children: <Score />
      }]
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
      <Container
        style={{ width: '100%', marginBottom: '16px' }}
        title=""
        propStyle={{ padding: '0px' }}
        head="none"
      >
        <div className={styles.familyBench}>
          <TopTabs tabParams={this.state.tabParams} />
        </div>
      </Container>
    );
  }
}

export default RankList;
