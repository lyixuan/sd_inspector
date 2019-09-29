import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Container from '../../components/container'
import TopTabs from '../../components/topTabs'
import FamilyScore from './familyScore'
import GroupScore from './groupScore'
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class FamilyAndGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1',
      tabParams:[{
        name:'家族学分对比',
        key:'1',
        children: <FamilyScore/>,
        isShowBtn:false
      },{
        name:'小组学分对比',
        key:'2',
        children:  <GroupScore/>,
        isShowBtn:true
      }]
    }
  }
  componentDidMount() {

  }
  onTabChange = (val) => {
    this.setState({
      keye: val
    })
  };
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

export default FamilyAndGroup;
